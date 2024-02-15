import {ITable} from "../components/Table/type";

export interface IUserData {
    id: string,
    name: string;
    surname: string;
    middleName: string;
    state: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    phoneCode: string;
    phoneMiddleCode: string;
    phonePart1: string;
    phonePart2: string;
    nameTemplate: string;
    addressTemplate: string;
    phoneTemplate: string;
}

export interface IGenerator {
    getRandomData(region: regionType, predictableRandom: () => number): IUserData;

    addRandomErrors(userData: any, errors: number, random: () => number, region: regionType): IUserData;

    prepareUserData(userData: IUserData): ITable;
}

export enum regionType {
    usa = 'usa',
    russia = 'russia',
    japan = 'japan'
}