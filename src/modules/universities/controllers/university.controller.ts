import express, {Request, Response} from "express";
import { ObjectId} from "mongodb";
import {UniversityDTO, UpdateUniversityDTO} from "../domain/university.entity";
import {createRepository, connect} from "../../../shared/connection-mongodb";
import {UniversityRepository} from "../repository/university.repository";
import { Collection } from "mongodb";
import {authMiddleware} from "../../../shared/middleware/authentication.middleware";

const router = express.Router();

createRepository().then(async () => {
    const db = await connect();
    const universityCollection: Collection<UniversityDTO> = await db.collection<UniversityDTO>('universities');
    const {
        createUniversityUseCase,
        getUniversitiesUseCase,
        updateUniversityUseCase,
        deleteUniversityUseCase,
    } = await createRepository();

    new UniversityRepository(universityCollection);

    router.get("/", async (req: Request<{}, {}, {}, { country?: string; page?: string; limit?: string }>, res: Response) => {
        const {country, page, limit} = req.query;
        const universities = await getUniversitiesUseCase.execute({
            country,
            page: parseInt(page || "1"),
            limit: parseInt(limit || "20")
        });
        res.json(universities);
    });

    router.post("/", authMiddleware, async (req: Request<{}, {}, UniversityDTO>, res: Response) => {
        const university = await createUniversityUseCase.execute(req.body);
        res.json(university);
    });

    router.put("/:id", authMiddleware, async (req: Request<{ id: string }, {}, UpdateUniversityDTO>, res: Response) => {
        const {id} = req.params;
        const university = await updateUniversityUseCase.execute({
            ...req.body,
            _id: new ObjectId(id)
        });
        res.json(university);
    });

    router.delete("/:id", authMiddleware, async (req: Request<{ id: string }, {}, {}>, res: Response) => {
        const {id} = req.params;
        const university = await deleteUniversityUseCase.execute(new ObjectId(id));
        res.json(university);
    });
});

export default router;