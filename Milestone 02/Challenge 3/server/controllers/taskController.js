const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  const { title, important = false } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      error: 'Task title is required'
    });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        important: Boolean(important)
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed, important } = req.body;

  try {
    const data = {};

    if (typeof completed === 'boolean') {
      data.completed = completed;
    }

    if (typeof important === 'boolean') {
      data.important = important;
    }

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};