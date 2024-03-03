import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateNewUserDto } from "./dto/create-user.dto";
import { plainToClass } from "class-transformer";
import { User } from "src/entities/User";
import md5 from "md5";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { throwForbidden, throwNotFound } from "src/utils/throw-exception.util";
import { ErrorCodes } from "src/constants/error-code.const";

@Controller("user")
@ApiTags("User")
// @ApiBearerAuth()  -- authentication is not required
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  /**
   *Create new user
   * @param createNewUser
   * @returns
   */
  @Post("")
  @ApiOperation({ summary: "create new user" })
  async createNewUser(@Body() createNewUser: CreateNewUserDto) {
    try {
      const hashPassWord: string = md5(createNewUser.password);
      const dataNewUser: User = plainToClass(User, {
        ...createNewUser,
        password: hashPassWord,
      });

      const newUser: User = await this.userService.save(dataNewUser);
      const { password, ...newDataRespone } = newUser;

      return newDataRespone;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *Get all users
   * @returns
   */
  @Get()
  @ApiOperation({ summary: "get all users" })
  async getAllUser() {
    try {
      const listAllUsers: User[] = await this.userService.findAll();
      return listAllUsers;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *Get user
   * @param id
   * @returns
   */
  @Get(":id")
  @ApiOperation({ summary: "get user by id" })
  async getUserById(@Param("id", ParseUUIDPipe) id: string) {
    try {
      const user: User = await this.userService.findById(id);

      //   check user exist
      if (!user) {
        throwNotFound(
          "USER_NOT_FOUND",
          "Could not find user",
          ErrorCodes.USER_NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *Change password user
   * @param id
   * @param updatePassword
   * @returns
   */
  @Put(":id")
  @ApiOperation({ summary: "update user" })
  async changePasswordUser(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    try {
      // check user exist
      const checkUserExist: User = await this.userService.findUserAndPassword(
        id,
      );
      if (!checkUserExist) {
        throwNotFound(
          "USER_NOT_FOUND",
          "Could not find user",
          ErrorCodes.USER_NOT_FOUND,
        );
      }

      //   check if the old password is correct
      const oldPassWordHash: string = md5(updatePassword.oldPassword);
      if (oldPassWordHash != checkUserExist.password) {
        throwForbidden(
          "CHANGE_PASSWORD_FAILD",
          "ForbiddenException",
          ErrorCodes.INVALID_VALUE,
        );
      }

      const newPassWordHash: string = md5(updatePassword.newPassword);
      checkUserExist.password = newPassWordHash;

      await this.userService.update(id, checkUserExist);

      return this.throwSuccessProcess("Change password success");
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }

  /**
   *Delete user
   * @param id
   */
  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ summary: "delete user" })
  async deleteUser(@Param("id", ParseUUIDPipe) id: string) {
    try {
      // check user exist
      const checkUserExist: User = await this.userService.findById(id);
      if (!checkUserExist) {
        throwNotFound(
          "USER_NOT_FOUND",
          "Could not find user",
          ErrorCodes.USER_NOT_FOUND,
        );
      }

      await this.userService.delete(id);
    } catch (error) {
      this.throwErrorProcess(error);
    }
  }
}
