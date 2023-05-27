import { IPerson } from "../common/models";

/**
 * Person
 * 
 * Classe base que representa uma pessoa
 */
export class Person implements IPerson {
    public age:number;
    public name: string;

    constructor(age: number, name: string){
        this.age = age;
        this.name = name;
    }

    /**
     * setAge
     * 
     * Atualiza a idade da pessoa
     * 
     * @param newAge - Nova idade 
     */
    public setAge(newAge: number): void {
        this.age = newAge;
    }

    /**
     * setName
     * 
     * Atualiza o nome da pessoa
     * 
     * @param newName - Novo nome
     */
    public setName(newName: string): void {
        this.name = newName;
    }

    /**
     * getAge
     * 
     * Retorna a idade da pessoa
     * 
     * @returns Idade da pessoa
     */
    public getAge(): number {
        return this.age;
    }

    /**
     * getName
     * 
     * Retorna o nome da pessoa
     * 
     * @returns Nome da pessoa
     */
    public getName(): string {
        return this.name;
    }
}
