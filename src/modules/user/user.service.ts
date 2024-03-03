import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { User } from "src/entities/User";
import { Repository } from "typeorm";

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  /**
   *
   * @param id
   * @returns
   */
  async findUserAndPassword(id: string) {
    const user: User = await this.userRepository.findOne({
      where: { id },
      select: ["version", "password", "id"],
    });

    return user;
  }
}
