import express, {Request, Response} from "express";
import {connect, createRepository} from "../../../shared/connection-mongodb";
import {externalConnectionUsecase} from "../useCases/external-connection.usecase";
import {Collection} from "mongodb";
import {UniversityDTO} from "../../universities/domain/university.entity";
import {UniversityRepository} from "../../universities/repository/university.repository";

const router = express.Router();

createRepository().then(async () => {
    const db = await connect();
    const universityCollection: Collection<UniversityDTO> = await db.collection<UniversityDTO>('universities');
    const {
        externalConnection,
    } = await createRepository();

    new UniversityRepository(universityCollection);
    router.get("/", async (req: Request, res: Response) => {
        const universities = await externalConnection.execute();
        res.json(universities);
    });

});

export default router;