"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
let EmployeesController = class EmployeesController {
    constructor() {
        this.employees = [
            { name: '山田 太郎', position: 'エンジニア' },
            { name: '佐藤 花子', position: 'デザイナー' },
        ];
    }
    getAllEmployees() {
        return this.employees;
    }
    createEmployee(req, body) {
        console.log('Received Body:', body);
        if (Buffer.isBuffer(body)) {
            try {
                body = JSON.parse(body.toString('utf8'));
            }
            catch (error) {
                console.error('JSON parse error:', error);
                return { message: 'Invalid JSON format' };
            }
        }
        const newEmployee = { ...body };
        this.employees.push(newEmployee);
        return {
            message: 'Employee created',
            employee: newEmployee,
        };
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "getAllEmployees", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "createEmployee", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, common_1.Controller)('employees')
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map