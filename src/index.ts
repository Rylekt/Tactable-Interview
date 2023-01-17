
/**
 * Riley Stewart-Tonkin
 */

import { inject, injectable } from 'inversify';

interface IApiManager {
    fetchData(): Promise<any>;
}


@injectable()
class TodoClient {
    async getTodos(): Promise<any> {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

@injectable()
class ApiManager implements IApiManager {
    constructor(@inject(TodoClient) private client: TodoClient) {}

    async fetchData(): Promise<any> {
        return await this.client.getTodos();
    }
}

import { Container } from 'inversify';

const container = new Container();
container.bind<TodoClient>(TodoClient).to(TodoClient);
container.bind<IApiManager>("IApiManager").to(ApiManager);

const apiManager = container.get<IApiManager>("IApiManager");
const data = await apiManager.fetchData();
console.log(data);
