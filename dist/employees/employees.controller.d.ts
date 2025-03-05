import { Request } from 'express';
interface Employee {
    name: string;
    position: string;
}
export declare class EmployeesController {
    private employees;
    getAllEmployees(): Employee[];
    createEmployee(req: Request, body: any): {
        message: string;
        employee?: undefined;
    } | {
        message: string;
        employee: any;
    };
}
export {};
