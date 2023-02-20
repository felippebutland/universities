import { User } from "../domain/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import config from "../../../shared/config/express.config";
import dotenv from "dotenv";
import {DomainNotFoundError} from "../../../shared/errors";

dotenv.config();


class AuthenticationUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(username: string, password: string): Promise<string | void> {
        const jwtsecret = process.env.JWT_SECRET;

        const user = await this.userRepository.getByUsername(username);
        if (!user) {
            throw new DomainNotFoundError("Invalid credentials");
        }

        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            throw new DomainNotFoundError("Invalid credentials");
        }

        if(user && user._id && jwtsecret) {
            return sign(user._id, jwtsecret.toString(), {
                expiresIn: 86400
            });
        }
    }
}

export { AuthenticationUseCase };