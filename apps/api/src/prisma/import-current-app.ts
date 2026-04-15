import mysql from 'mysql2/promise';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const legacyUrl = process.env.LEGACY_DATABASE_URL;
  if (!legacyUrl) {
    throw new Error('LEGACY_DATABASE_URL is required to import data from the current rebuild.');
  }

  const connection = await mysql.createConnection(legacyUrl);

  try {
    const [legacyClients] = await connection.query<any[]>('SELECT * FROM clients ORDER BY id ASC');
    const [legacyUsers] = await connection.query<any[]>('SELECT * FROM users ORDER BY id ASC');

    for (const row of legacyClients) {
      await prisma.client.upsert({
        where: { clientCode: row.client_id },
        update: {
          name: row.name,
          industry: row.industry,
          contact: row.contact,
          email: row.email,
          phone: row.phone,
          country: row.country,
          city: row.city,
          status: row.status,
        },
        create: {
          clientCode: row.client_id,
          name: row.name,
          industry: row.industry,
          contact: row.contact,
          email: row.email,
          phone: row.phone,
          country: row.country,
          city: row.city,
          status: row.status,
        },
      });
    }

    for (const row of legacyUsers) {
      const client = row.customer_id
        ? await prisma.client.findUnique({ where: { clientCode: row.customer_id } })
        : null;

      await prisma.user.upsert({
        where: { username: row.username },
        update: {
          fullName: row.name,
          role: row.role,
          passwordHash: row.password_hash,
          clientId: client?.id ?? null,
          isActive: !!row.is_active,
          email: `${row.username}@rigways.local`,
        },
        create: {
          username: row.username,
          fullName: row.name,
          role: row.role,
          passwordHash: row.password_hash,
          clientId: client?.id ?? null,
          isActive: !!row.is_active,
          email: `${row.username}@rigways.local`,
        },
      });
    }
  } finally {
    await connection.end();
    await prisma.$disconnect();
  }
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
