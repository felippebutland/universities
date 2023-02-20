import {User} from "../domain/user.entity";
import {UserRepository} from "../repositories/user.repository";
import {hash} from "bcryptjs";
import {ObjectId} from "mongodb";
import {ConflictError, DomainNotFoundError} from "../../../shared/errors";

export interface UpdateUserParams {
    id: string;
    name?: string;
    username?: string;
    password?: string;
}

export class UpdateUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(params: UpdateUserParams): Promise<void> {
        const {id, username, password} = params;

        let objectToUpdate = {}

        const _id = new ObjectId(id);

        const user = await this.userRepository.getById(_id)

        if (!user) {
            throw new DomainNotFoundError("User not found");
        }

        if (username) {
            const existingUser = await this.userRepository.getByUsername(username);
            if (existingUser && existingUser._id !== _id) {
                throw new ConflictError("Username already in use");
            }
            objectToUpdate = {username};
        }

        if (password) {
            const hashedPassword = await hash(password, 10)
            objectToUpdate = {password: hashedPassword};


            await this.userRepository.update(objectToUpdate);
        }
    }
}