import { IStorageEngine } from "../common/models";
import { TGenericObject } from "../common/models/types/TGenericObject";

/**
 * LocalStorageEngine
 * 
 * Classe para abstração das operações do localStorage 
 */
export class LocalStorageEngine<T extends TGenericObject = {}> implements IStorageEngine<T> {
    constructor(
        protected key: string
    ){}

    /**
     * getData
     * 
     * Retorna os dados armazenados no localStorage em uma determinada key
     * 
     * @returns Array com os objetos
     */
    private getData(): T[] {
        const jsonData: string = localStorage.getItem(this.key) ?? '[]';
        const parsedData = JSON.parse(jsonData);

        return parsedData;
    }

    /**
     * save
     * 
     * Salva o array de objetos no localStorage
     * 
     * @param data - Array de objetos
     */
    private save(data: T[]): void {
        const jsonData = JSON.stringify(data);

        localStorage.removeItem(this.key);
        localStorage.setItem(this.key, jsonData);
    }
    
    /**
     * create
     * 
     * Armazena um novo objeto no localStorage
     * 
     * @param newObject - Objeto para ser armazenado 
     * @returns Objeto criado
     */
    public create(newObject: T): T {
        const oldData = this.getData();

        oldData.push(newObject);
        this.save(oldData);

        return newObject;
    }

    /**
     * update
     * 
     * Atualiza um objeto no localStorage
     * 
     * @param id - Id do objeto
     * @param updatedObject - Objeto atualizado
     * @returns Objeto atualizado
     */
    public update(id: number, updatedObject: T): T {
        const oldData = this.getData();

        if (!oldData[id]) {
            throw new Error('Item does not exist');
        }

        Object.assign(oldData[id], updatedObject)
        this.save(oldData);

        return oldData[id];
    }

    /**
     * delete
     * 
     * Remove um objeto do localStorage
     * 
     * @param id - Id do objeto
     */
    public delete(id: number): void {
        const oldData = this.getData();
        const filteredData = oldData.filter((_, index) => index !== id);
        
        this.save(filteredData);
    }

    /**
     * list
     * 
     * Retorna a lista de todos os objetos salvos no localStorage
     * 
     * @returns 
     */
    public list(): T[] {
        return this.list()
    }
}