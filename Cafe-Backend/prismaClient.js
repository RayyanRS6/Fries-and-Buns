const { PrismaClient } = require('./src/generated'); // adjust path if needed
const prisma = new PrismaClient();

module.exports = prisma;