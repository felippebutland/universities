import express, {Request, Response} from "express";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../domain/user.entity";
import { Collection, ObjectId } from "mongodb";
import { connect, createRepository } from "../../../shared/connection-mongodb";
import { UpdateUserParams } from "../useCases/update-user.usecase";

const router = express.Router();

createRepository().then(async (useCases) => {
    const db = await connect();
    const userCollection: Collection<User> = db.collection<User>('users');
    new UserRepository(userCollection);

    const {
        createUserUseCase,
        getUserByIdUseCase,
        updateUserUseCase,
        deleteUserUseCase,
        authenticationUseCase
    } = useCases;

    router.post('/users', async (req: Request, res: Response) => {
        const { name, email, password, username } = req.body;
        const user = await createUserUseCase.execute({name, email, password, username } as User);
        res.json(user);
    });

    router.get('/users/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await getUserByIdUseCase.execute(new ObjectId(id));

        if(!user) return res.status(204).json()

        res.json(user);
    });

    router.put('/users/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email, password } = req.body;
        await updateUserUseCase.execute({ id, name, email, password } as UpdateUserParams);

        res.status(204).json();
    });

    router.delete('/users/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleted = await deleteUserUseCase.execute(new ObjectId(id));
        res.json(deleted);
    });

    router.post('/login', async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const token = await authenticationUseCase.execute(email, password);
        res.json({ token });
    });
});

export default router;
