import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
export declare class UserRepository extends Repository<UserEntity> {
    findUserById(id: number): Promise<UserEntity>;
    findAllUsers(): Promise<UserEntity[]>;
}
