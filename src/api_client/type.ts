import {ITable} from "../components/Table/type";
import {regionType} from "../components/TopPanel/type";

export interface IApiClient {
    getData: (seed: string, region: regionType, page: number, errors: number) => Promise<{ status: number, data: ITable[] }>
    getCsvDataUrl: (seed: string, region: regionType, page: number, errors: number) => string
}