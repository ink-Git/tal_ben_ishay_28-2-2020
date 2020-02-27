class ApiService {

    constructor() { }

    post(path: string, params?: any) {
        return this.sendRequest(path, 'POST', null, params)
    }

    get(path: string, params?: any) {
        return this.sendRequest(path, 'GET', null, params);
    }

    sendRequest(path: string, method: string, headers?: any, params?: any): Promise<any> {
        return fetch(path, {
            method: method,
            body: JSON.stringify(params)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .catch(err => {
                return Promise.reject(err);
            })
    }

    private getHeaders() {
        return {
            'X-Requested-With': 'Fetch',
            Accept: 'application/json',
        }
    }
}

export const apiService = new ApiService()