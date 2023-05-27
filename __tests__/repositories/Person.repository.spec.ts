import { beforeEach, describe, it, jest } from '@jest/globals';
import { PersonRepository } from '../../src/repositories/Person.repository';
import { LocalStorageEngine } from '../../src/database/LocalStorageEngine';
import { Person } from '../../src/entities';

jest.mock('../../src/database/LocalStorageEngine')
    .requireActual('../../__mocks__/database/LocalStorageEngine');

describe('Person.repository', () => {
    let sut: PersonRepository;
    let db: LocalStorageEngine<Person>;

    beforeEach(() => {
        db = new LocalStorageEngine('person')
        sut = new PersonRepository(db as any)        
    });

    it('should create a new person', () => {
        jest.spyOn(db, 'create')
    })
});
