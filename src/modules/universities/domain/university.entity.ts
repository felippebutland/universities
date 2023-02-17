import {ObjectId} from "mongodb";

export interface UniversityDTO {
    _id: ObjectId;
    alpha_two_codes: string;
    country: string;
    domains: string[];
    name: string;
    state_province: string;
    web_pages: string[];
}

export interface UpdateUniversityDTO {
    _id: ObjectId;
    webPages?: string[];
    name?: string;
    domains?: string[];
}