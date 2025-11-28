import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalTasks = await prisma.task.count();
    const completedTasks = await prisma.task.count({
      where: { status: 'completed' }
    });
    const pendingTasks = await prisma.task.count({
      where: { status: 'pending' }
    });
    const inProgressTasks = await prisma.task.count({
      where: { status: 'in-progress' }
    });

    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    const stats = {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      completionRate
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};