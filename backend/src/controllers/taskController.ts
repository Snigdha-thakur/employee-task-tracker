import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status, employeeId } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    if (employeeId) where.assigned_to = parseInt(employeeId as string);

    const tasks = await prisma.task.findMany({
      where,
      include: {
        employee: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        employee: true
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const getTasksByEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const tasks = await prisma.task.findMany({
      where: {
        assigned_to: parseInt(employeeId)
      },
      include: {
        employee: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks by employee:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, assigned_to, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'pending',
        priority: priority || 'medium',
        assigned_to: assigned_to ? parseInt(assigned_to) : null,
        due_date: due_date ? new Date(due_date) : null
      },
      include: {
        employee: true
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assigned_to, due_date } = req.body;

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assigned_to && { assigned_to: parseInt(assigned_to) }),
        ...(due_date && { due_date: new Date(due_date) }),
        updated_at: new Date()
      },
      include: {
        employee: true
      }
    });

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(400).json({ error: 'Failed to delete task' });
  }
};