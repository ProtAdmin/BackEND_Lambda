import { Controller, Get } from '@nestjs/common';

@Controller('employees')
export class EmployeesController {
  @Get()
  getAllEmployees() {
    return [
      { id: 1, name: '山田 太郎', position: 'エンジニア' },
      { id: 2, name: '佐藤 花子', position: 'デザイナー' },
    ];
  }
}
