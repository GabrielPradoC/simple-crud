import { jest,  } from '@jest/globals';
import { IStorageEngine } from '../../src/common/models';
import { Person } from '../../src/entities';



const createFnMock = jest.fn().mockImplementation((arg: any) => arg);
const updateFnMock = jest.fn().mockImplementation((_id: any, arg: any) => arg);
const deleteFnMock = jest.fn();
const listFnMock = jest.fn();

export const LocalStorageEngine = {
    getPersonList: () => [
            {
                name: 'Daniel',
                age: 52
            },
            {
                name: 'Yago',
                age: 37
            },
            {
                name: 'Andrea',
                age: 78
            }
    ].map(item => new Person(item.age, item.name)),
    create: createFnMock as IStorageEngine['create'],
    update: updateFnMock as IStorageEngine['update'],
    delete: deleteFnMock as IStorageEngine['delete'],
    list: listFnMock as IStorageEngine['list']

}