import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { User } from '../models/user';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Get('findAll')
    private findAllUser(): any {
        return this.UserService.listUsers();
    }

    @Get('findOne/:uuid')
    @ApiParam({
        name: 'uuid',
        description: "UUID of the User",
        required: true,
        type: String,
    })
    private findOneUser(@Param('uuid') uuid: any): any {
        const uuidUser = uuid;
        if (uuidUser && uuidUser.length > 0) {
            return this.UserService.getUsersByUUID(uuidUser);
        } else {
            return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Post('add')
    @ApiBody({
        description: "Object User",
        type: User,
    })
    private addUser(@Req() request: any): any {
        const objUser: User = request.body;
        if (objUser) {
            return this.UserService.createUser(objUser);
        } else {
            return new HttpException(
                'name of User invalid',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put('update/:uuid')
    @ApiParam({
        name: 'uuid',
        description: "UUID of the User",
        required: true,
        type: String,
    })
    @ApiBody({
        description: "Object User",
        type: User,
    })
    private updateUser(@Param('uuid') uuid: any, @Req() request: any): any {
        const uuidUser = uuid;
        const objUser: User = request.body;
        if (uuidUser && uuidUser.length > 0) {
            if (objUser) {
                return this.UserService.updateUser(uuidUser, objUser);
            } else {
                return new HttpException(
                    'name of User invalid',
                    HttpStatus.BAD_REQUEST,
                );
            }
        } else {
            return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Delete('delete/:uuid')
    @ApiParam({
        name: 'uuid',
        description: "UUID of the User",
        required: true,
        type: String,
    })
    private deleteUser(@Param('uuid') uuid: any): any {
        const uuidUser = uuid;
        if (uuidUser && uuidUser.length > 0) {
            return this.UserService.deleteUser(uuidUser);
        } else {
            return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
