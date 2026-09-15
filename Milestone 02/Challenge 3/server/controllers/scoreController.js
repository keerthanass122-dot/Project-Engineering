const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getScore = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { completed: true }
    });

    let score = 0;

    tasks.forEach((task) => {
      if (task.important) {
        score += 20;
      } else {
        score += 10;
      }
    });

    res.json({ value: score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch score' });
  }
};

module.exports = {
  getScore
};