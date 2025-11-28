import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.employee.deleteMany();

  // Create employees
  const employee1 = await prisma.employee.create({
    data: {
      name: 'John Smith',
      email: 'john.smith@company.com',
      position: 'Software Developer',
      department: 'Engineering'
    }
  });

  const employee2 = await prisma.employee.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      position: 'Product Manager',
      department: 'Product'
    }
  });

  const employee3 = await prisma.employee.create({
    data: {
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      position: 'UX Designer',
      department: 'Design'
    }
  });

  const employee4 = await prisma.employee.create({
    data: {
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      position: 'QA Engineer',
      department: 'Engineering'
    }
  });

  // Create tasks
  await prisma.task.create({
    data: {
      title: 'Implement user authentication',
      description: 'Add login and registration functionality with JWT tokens',
      status: 'in-progress',
      priority: 'high',
      assigned_to: employee1.id,
      due_date: new Date('2024-02-15')
    }
  });

  await prisma.task.create({
    data: {
      title: 'Design dashboard mockups',
      description: 'Create wireframes and mockups for the main dashboard',
      status: 'pending',
      priority: 'medium',
      assigned_to: employee3.id,
      due_date: new Date('2024-02-20')
    }
  });

  await prisma.task.create({
    data: {
      title: 'API documentation',
      description: 'Document all backend endpoints with examples',
      status: 'completed',
      priority: 'low',
      assigned_to: employee1.id,
      due_date: new Date('2024-02-10')
    }
  });

  await prisma.task.create({
    data: {
      title: 'User testing session',
      description: 'Conduct usability tests with 5 participants',
      status: 'pending',
      priority: 'high',
      assigned_to: employee2.id,
      due_date: new Date('2024-02-25')
    }
  });

  await prisma.task.create({
    data: {
      title: 'Database optimization',
      description: 'Optimize queries and add indexes for better performance',
      status: 'in-progress',
      priority: 'medium',
      assigned_to: employee1.id,
      due_date: new Date('2024-02-28')
    }
  });

  await prisma.task.create({
    data: {
      title: 'Mobile responsive design',
      description: 'Ensure all pages work well on mobile devices',
      status: 'pending',
      priority: 'medium',
      assigned_to: employee3.id,
      due_date: new Date('2024-03-01')
    }
  });

  console.log('Seeding completed!');
  const employeeCount = await prisma.employee.count();
  const taskCount = await prisma.task.count();
  console.log(`Created ${employeeCount} employees`);
  console.log(`Created ${taskCount} tasks`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });