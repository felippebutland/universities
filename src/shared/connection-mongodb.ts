import { MongoClient, Db, Collection } from 'mongodb';
import { UniversityDTO } from '../modules/universities/domain/university.entity' ;
import { UniversityRepository } from '../modules/universities/repository/university.repository';
import { CreateUniversityUseCase } from "../modules/universities/useCases/create-university.usecase";
import { GetUniversitiesUseCase } from "../modules/universities/useCases/get-universities.usecase";
import { UpdateUniversityUseCase } from "../modules/universities/useCases/update-university.usecase";
import { DeleteUniversityUseCase } from "../modules/universities/useCases/delete-university.usecase";
import { CreateUserUseCase } from "../modules/users/useCases/create-user.usecase";
import { GetUserByIdUseCase } from "../modules/users/useCases/get-user-by-id.usecase";
import { UpdateUserUseCase } from "../modules/users/useCases/update-user.usecase";
import { DeleteUserUseCase } from "../modules/users/useCases/delete-user.usecase";
import { AuthenticationUseCase } from "../modules/users/useCases/authentication.usecase";
import {User} from "../modules/users/domain/user.entity";
import {UserRepository} from "../modules/users/repositories/user.repository";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const url = 'mongodb://root:example@localhost:27017/?authSource=admin';

const connect = async (): Promise<Db> => {
    const client = await MongoClient.connect(url);
    return client.db();
};

const createCollection = async (): Promise<Collection<UniversityDTO>> => {
    const db = await connect();
    return db.collection('universities');
};

async function createRepository() {
    const db = await connect();
    const universities: Collection<UniversityDTO> = await db.collection<UniversityDTO>('universities');
    const users: Collection<User> = await db.collection<User>('users');

    const universityRepository = new UniversityRepository(universities);
    const usersRepository = new UserRepository(users);

    const createUserUseCase = new CreateUserUseCase(usersRepository);
    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
    const updateUserUseCase = new UpdateUserUseCase(usersRepository);
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
    const authenticationUseCase = new AuthenticationUseCase(usersRepository);

    const createUniversityUseCase = new CreateUniversityUseCase(universityRepository);
    const getUniversitiesUseCase = new GetUniversitiesUseCase(universityRepository);
    const updateUniversityUseCase = new UpdateUniversityUseCase(universityRepository);
    const deleteUniversityUseCase = new DeleteUniversityUseCase(universityRepository);

    return {
        createUniversityUseCase,
        getUniversitiesUseCase,
        updateUniversityUseCase,
        deleteUniversityUseCase,
        authenticationUseCase,
        deleteUserUseCase,
        updateUserUseCase,
        getUserByIdUseCase,
        createUserUseCase
    };
}

export { connect, createRepository, createCollection };