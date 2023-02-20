import { UserRepository } from "../repositories/user.repository";
import {ObjectId} from "mongodb";

class DeleteUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: ObjectId): Promise<void> {
        await this.userRepository.delete(id);
    }
}

export { DeleteUserUseCase };