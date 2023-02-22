import {UniversityRepository} from "../../universities/repository/university.repository";
import axios from "axios";
import {UniversityDTO} from "../../universities/domain/university.entity";

export class externalConnectionUsecase {

    constructor( private universityRepository: UniversityRepository) {}

    async execute() {
        await this.universityRepository.deleteAll();

        const countries = [
            "argentina", "brazil", "chile", "colombia", "paraguay", "peru", "suriname", "uruguay"
        ]

        for(const country of countries) {
            let universities = await axios.get(`http://universities.hipolabs.com/search?country=${country}`)

            if(universities.data.length > 0) {

                universities.data.map((university: UniversityDTO) => {
                    university.updated_at = new Date()
                    this.universityRepository.create(university)
                })
            } else {
                await this.execute()
            }
        }

    }
}