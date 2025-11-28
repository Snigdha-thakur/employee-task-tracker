import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        tasks: {
          orderBy: {
            created_at: 'desc'
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
      include: {
        tasks: {
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, position, department } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        position,
        department
      }
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(400).json({ error: 'Failed to create employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, position, department } = req.body;

    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(position && { position }),
        ...(department && { department })
      }
    });

    res.json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(400).json({ error: 'Failed to update employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // First, update any tasks assigned to this employee to set assigned_to to null
    await prisma.task.updateMany({
      where: { assigned_to: parseInt(id) },
      data: { assigned_to: null }
    });

    // Then delete the employee
    await prisma.employee.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(400).json({ error: 'Failed to delete employee' });
  }
};