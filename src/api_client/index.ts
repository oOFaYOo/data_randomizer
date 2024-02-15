import {regionType} from "../generator/type";
import {ITable} from "../components/Table/type";

class ApiClient {

    async getData(seed: string, region: regionType, page: number, errors: number): Promise<{status: number, data: ITable[]}> {
        const response = await fetch(`/api/data?seed=${seed}&region=${region}&page=${page}&errors=${errors}`, {method: 'get'});
        return {
            status: response.status,
            data: await response.json()
        }
    }
}

export default new ApiClient();