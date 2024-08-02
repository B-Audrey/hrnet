export interface EmployeeModel {
    "id": number,
    "firstName": string,
    "lastName": string,
    "dateOfBirth": string,
    "startDate": string,
    "street": string,
    "city": string,
    "state": string,
    "zipCode": number,
    "department": string,
}

export interface EmployeeStateModel {
    employees: EmployeeModel[]
}
