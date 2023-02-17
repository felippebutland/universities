import { UniversityDTO } from "../domain/university.entity";
import { UniversityRepository } from "../repository/university.repository";
export class CreateUniversityUseCase {
    constructor(private universityRepository: UniversityRepository) {}

    async execute(data: UniversityDTO): Promise<void> {
        const universityAlreadyExists = await this.universityRepository.findByCountryStateAndName(
            data.country,
            data.state_province,
            data.name
        );
        if (universityAlreadyExists) {
            throw new Error("University already exists");
        }

        await this.universityRepository.create(data);
    }
}