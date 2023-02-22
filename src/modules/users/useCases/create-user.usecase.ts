import { User } from "../domain/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { hash } from "bcryptjs";

interface CreateUserParams {
    username: string;
    email: string;
    password: string;
    name: string;
}

class CreateUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(params: CreateUserParams): Promise<void> {
        const { username, password, email, name } = params;

        const user = await this.userRepository.getByUsername(username);

        if (user) {
            throw new Error("Username already in use");
        }

        const hashedPassword = await hash(password, 10);

        await this.userRepository.create({username, password: hashedPassword, email, name});
    }
}

export { CreateUserUseCase };