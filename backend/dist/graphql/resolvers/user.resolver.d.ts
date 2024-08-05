import { UserModel } from "../models/user.model";
import { UserEntity } from "src/database/entities/user.entity";
import { CreateUserInput } from "../inputs/createUser";
import { UserService } from 'src/modules/user/user.service';
import { UserSettingService } from "src/modules/user/userSetting.service";
import { UserRepository } from '../../database/repositories/user.repository';
export declare class UserResolver {
    private userService;
    private userSettingService;
    private userRepository;
    constructor(userService: UserService, userSettingService: UserSettingService, userRepository: UserRepository);
    getUserById(id: number): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    getUserSettings(user: UserModel): Promise<import("../../database/entities/userSetting.entity").UserSettingEntity>;
    createUser(createUserData: CreateUserInput): Promise<UserEntity>;
}
