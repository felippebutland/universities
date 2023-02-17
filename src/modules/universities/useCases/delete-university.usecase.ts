import { UniversityDTO } from "../domain/university.entity";
import { UniversityRepository } from "../repository/university.repository";
import {ObjectId} from "mongodb";

export class DeleteUniversityUseCase {
    constructor(private universityRepository: UniversityRepository) {}

    async execute(id: ObjectId): Promise<void> {
        const university = await this.universityRepository.findById(id);
        if (!university) {
            throw new Error("University not found");
        }

        await this.universityRepository.delete(university._id);
    }
}