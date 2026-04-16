import argon2 from 'argon2';
import prismaPackage from '@prisma/client';

const { PrismaClient, UserRole } = prismaPackage;

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await argon2.hash('admin123');

  const client = await prisma.client.upsert({
    where: { clientCode: 'C001' },
    update: {},
    create: {
      clientCode: 'C001',
      name: 'Acme Corporation',
      industry: 'Oil & Gas',
      contact: 'James Wheeler',
      email: 'j.wheeler@acme.com',
      city: 'Dammam',
      status: 'active',
    },
  });

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      fullName: 'Rigways Administrator',
      email: 'admin@rigways.online',
      role: UserRole.admin,
      passwordHash: adminPassword,
      clientId: client.id,
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
