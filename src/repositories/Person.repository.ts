import { Person } from "../entities/Person.entity";
import { IPerson, IStorageEngine } from '../common/models';

/**
 * PersonRepository
 * 
 * Repositório com as operações básicas de crud para a classe Person 
 */
export class PersonRepository {

    protected repositoryKey: string = 'person';

    protected entities: Person[];

    constructor(
        protected storageEngine: IStorageEngine<Person>
    ){
        this.storageEngine = storageEngine;
        this.entities = storageEngine.list();
    }

    /**
     * create
     * 
     * Cria uma nova entidade pessoa
     * 
     * @param newPerson - Objeto com as propriedades da nova pessoa
     * @returns Nova pessoa
     */
    public create(newPerson: IPerson ): Person {
        const { age, name } = newPerson;
        const person = new Person(age, name);
        this.storageEngine.create(person);
        return person;
    }

    /**
     * update
     * 
     * Atualiza os atributos de uma pessoa
     * 
     * @param index - Id da pessoa
     * @param updatedPerson - Objeto atualizado
     * @returns Pessoa atualizada
     */
    public update(index: number, updatedPerson: Person): Person {
        const person: Person = this.storageEngine.update(index, updatedPerson);
        return person;
    }

    /**
     * delete
     * 
     * Remove uma pessoa 
     * 
     * @param index - Id da pessoa
     */
    public delete(index: number): void {
        this.storageEngine.delete(index);
    }

    /**
     * list
     * 
     * Retorna uma lista com todas as pessoas armazenadas
     * 
     * @returns Lista de pessoas
     */
    public list(): Person[] | undefined {
        return this.storageEngine.list();
    }
}
