import { TGenericObject } from "../types/TGenericObject";

export interface IStorageEngine<T extends TGenericObject = {}> {
    create: (obj: T) => T;
    update: (id: number, obj: T) => T;
    delete: (id: number) => any;
    list: (params?: T[keyof T extends Function ? never : keyof T]) => T[];
}
