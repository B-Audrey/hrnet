export interface EmployeeModel {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    startDate: string,
    street: string,
    city: string,
    state: string,
    zipCode: number,
    department: string,
    createdAt: string,
}

export interface EmployeeStateModel {
    employees: EmployeeModel[]
}
