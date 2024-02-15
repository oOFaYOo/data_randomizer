
export interface ITableRow {
    id:string,
    name: string;
    surname: string;
    middleName: string;
    state: string;
    city: string;
    street: string;
    house:string;
    apartment:string;
    phone:string;
}

export type TableType = ITableRow[]