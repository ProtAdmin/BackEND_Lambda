import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('employees')
export class EmployeesController {
  private employees = [
    { id: 1, name: '山田 太郎', position: 'エンジニア' },
    { id: 2, name: '佐藤 花子', position: 'デザイナー' },
  ];

  @Get()
  getAllEmployees() {
    return this.employees;
  }

  @Post()
  createEmployee(@Body() body: any) {
    console.log('Received Body:', body); // デバッグ用ログ

    // もし body が Buffer の場合、JSON に変換
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;

    this.employees.push(parsedBody);

    return {
      message: 'Employee created',
      employee: parsedBody,
    };
  }
}
