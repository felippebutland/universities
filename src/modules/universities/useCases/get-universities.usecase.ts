import { UniversityRepository } from "../repository/university.repository";
import { PaginationResult} from "../../../shared/utils/pagination.util";
import {ObjectId} from "mongodb";
import {DomainNotFoundError} from "../../../shared/errors";

interface GetUniversitiesUseCaseReturn { pagination: PaginationResult<{ country: string; webPages: string; name: string; stateProvince: string; domains: string[]; _id: ObjectId; alphaTwoCode: string }>; results: { country: string; webPages: any; name: string; stateProvince: string; domains: string[]; _id: ObjectId; alphaTwoCode: string }[]}

export class GetUniversitiesUseCase {
    constructor(private universityRepository: UniversityRepository) {}

    async execute(data: { country?: string; limit?: number; page?: number }): Promise<GetUniversitiesUseCaseReturn> {
        const universities = await this.universityRepository.findAll(data.country, data.page, data.limit);
        if(!universities) {
            throw new DomainNotFoundError("No universities found");
        }
        return universities;
    }
}