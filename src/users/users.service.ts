import { Injectable } from '@nestjs/common';
import { UserRoles } from "../user-roles.enum";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  roles: UserRoles[];
};

@Injectable()
export class UsersService {

  users: User[] = [
    {
      id: 1,
      name: 'Suraj',
      username: 'surajchaudhari',
      password: 'suraj123',
      roles:[UserRoles.ADMIN],
    },
    {
        id: 2,
        name: 'afzal',
        username: 'afzalkhan',
        password: 'afzal123',
        roles:[UserRoles.ADMIN],
      },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

 async findOne(username:string):Promise<User | undefined> {
    return await this.users.find((U)=>U.username===username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
