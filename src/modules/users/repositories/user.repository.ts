import { Collection, ObjectId } from 'mongodb';
import { User } from '../domain/user.entity'

export class UserRepository {
    private collection: Collection<User>;

    constructor(collection: Collection<User>) {
        this.collection = collection;
    }

    async create(user: User): Promise<void> {
        await this.collection.insertOne(user);
    }

    async update(updates: Partial<User>): Promise<void> {
        await this.collection.findOneAndUpdate(
            { _id: updates._id },
            { $set: updates }
        );
    }

    async delete(id: ObjectId): Promise<void> {
        await this.collection.deleteOne({ _id: id });
    }

    async getById(id: ObjectId): Promise<User | null> {
        return this.collection.findOne({ _id: id });
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.collection.findOne({ email });
    }

    async getByUsername(email: string): Promise<User | null> {
        return this.collection.findOne({ email });
    }
}