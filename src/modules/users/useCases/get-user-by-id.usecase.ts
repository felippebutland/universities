import { User } from "../domain/user.entity";
import { UserRepository } from "../repositories/user.repository";
import {ObjectId} from "mongodb";
import {ConflictError} from "../../../shared/errors";

class GetUserByIdUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: ObjectId): Promise<User | null> {
        return  this.userRepository.getById(id);
    }
}

export { GetUserByIdUseCase };