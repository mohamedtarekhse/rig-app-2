import { Queue, Worker } from 'bullmq';
import { Redis } from 'ioredis';
const connection = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
});
export const notificationQueue = new Queue('notification-dispatch', { connection });
export const expiryQueue = new Queue('certificate-expiry-scan', { connection });
const notificationWorker = new Worker('notification-dispatch', async (job) => {
    console.log('[worker] notification job received', job.name, job.data);
    return { processed: true };
}, { connection });
const expiryWorker = new Worker('certificate-expiry-scan', async (job) => {
    console.log('[worker] expiry scan job received', job.name, job.data);
    return { processed: true };
}, { connection });
notificationWorker.on('completed', (job) => {
    console.log(`[worker] notification job completed: ${job.id}`);
});
expiryWorker.on('completed', (job) => {
    console.log(`[worker] expiry job completed: ${job.id}`);
});
console.log('Rigways worker is running.');
