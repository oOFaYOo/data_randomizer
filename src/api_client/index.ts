import {regionType} from "../components/TopPanel/type";
import {IApiClient} from "./type";

class ApiClient implements IApiClient {

    async getData(seed: string, region: regionType, page: number, errors: number) {
        const response = await fetch(`/api/data?seed=${seed}&region=${region}&page=${page}&errors=${errors}`, {method: 'get'});
        return {
            status: response.status,
            data: await response.json()
        }
    }

    getCsvDataUrl(seed: string, region: regionType, page: number, errors: number) {
        return `/api/data/csv?seed=${seed}&region=${region}&page=${page}&errors=${errors}`;
    }
}

export default new ApiClient();