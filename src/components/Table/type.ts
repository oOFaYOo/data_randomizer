
export interface IUserData {
    id:string,
    name: string;
    surname: string;
    middleName: string;
    nameTemplate: string;
    state: string;
    city: string;
    street: string;
    house:string;
    apartment:string;
    addressTemplate: string;
    phoneCode: string;
    phoneMiddleCode: string;
    phonePart1: string;
    phonePart2: string;
    phonePart3: string;
    phoneTemplate:string;
}

export interface ITableRow {
    id:string,
    name: string;
    address: string;
    phone:string;
}

export type TableType = ITableRow[]