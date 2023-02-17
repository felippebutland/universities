import { UniversityDTO } from "../domain/university.entity";
import { UniversityRepository } from "../repository/university.repository";

export class GetUniversityByIdUseCase {
    constructor(private universityRepository: UniversityRepository) {}

    async execute(id: string): Promise<UniversityDTO> {
        const university = await this.universityRepository.findById(id);
        if (!university) {
            throw new Error("University not found");

        }
        return university;
    }
}