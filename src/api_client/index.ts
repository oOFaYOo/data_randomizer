class ApiClient {

    async getData() {
        const response = await fetch('/api/data', {method: 'get'});
        return {
            status: response.status,
            data: await response.json()
        }
    }
}

export default new ApiClient();