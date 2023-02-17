import { UniversityRepository } from "../repository/university.repository";
import {UpdateUniversityDTO} from "../domain/university.entity";

export class UpdateUniversityUseCase {
    constructor(private universityRepository: UniversityRepository){}

    async execute(data: UpdateUniversityDTO): Promise<void> {
        const university = await this.universityRepository.findById(data._id);

        if (!university) {
            throw new Error("University not found");
        }

        await this.universityRepository.update(data);
    }
}