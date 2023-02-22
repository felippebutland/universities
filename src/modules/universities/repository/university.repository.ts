import {UniversityDTO, UpdateUniversityDTO} from "../domain/university.entity";
import {paginate, PaginationResult} from "../../../shared/utils/pagination.util";
import {ObjectId} from "mongodb";
import {Collection} from "mongodb";


class UniversityRepository {
    private collection: Collection<UniversityDTO>;

    constructor(collection: Collection<UniversityDTO>) {
        this.collection = collection;
    }

    async create(university: UniversityDTO): Promise<void> {
        await this.collection.insertOne(university);
    }

    // async insertMany(universities: UniversityDTO): Promise<void> {
    //     console.log(universities)
    //     await this.collection.insertMany(universities);
    // }

    async findAll(
        country?: string,
        page?: number,
        limit?: number,
    ): Promise<{
        pagination: PaginationResult<{
            country: string;
            webPages: any;
            name: string;
            stateProvince: any;
            domains: string[];
            _id: ObjectId;
            alphaTwoCode: any;
        }>;
        results: {
            country: string;
            webPages: any;
            name: string;
            stateProvince: any;
            domains: string[];
            _id: ObjectId;
            alphaTwoCode: any;
        }[];
    }> {
        if(!page || !limit) {
            page = 1;
            limit = 100;
        }
        const filter: any = {};
        if (country) {
            filter.country = country;
        }

        const documents = await this.collection
            .find(filter)
            .skip(page)
            .limit(limit)
            .toArray();

        const results = documents.map((document) => ({
            _id: document._id,
            name: document.name,
            country: document.country,
            stateProvince: document.state_province,
            webPages: document.web_pages,
            domains: document.domains,
            alphaTwoCode: document.alpha_two_codes,
        }));

        const pagination = paginate(results, page, limit );

        return {
            results,
            pagination,
        };
    }
    async findById(id: ObjectId): Promise<UniversityDTO | null> {
        const document = await this.collection.findOne({ _id: id });
        if (!document) {
            return null;
        }
        return document as UniversityDTO;
    }

    async update(university: UpdateUniversityDTO): Promise<void> {
         await this.collection.findOneAndUpdate({_id: university._id}, {$set: university})
    }

    async delete(id: ObjectId): Promise<void> {
        await this.collection.deleteOne({ _id: id });
    }

    async deleteAll(): Promise<void> {
        await this.collection.deleteMany({});
    }

    async findByCountryStateAndName(country?: string, stateProvince?: string, name?: string): Promise<UniversityDTO | null> {
        const document = await this.collection.findOne({ country, stateProvince, name });
        if (!document) {
            return null;
        }
        return document as UniversityDTO;
    }
}

export { UniversityRepository };