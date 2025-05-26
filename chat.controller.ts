import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../service/chat.service';
import { Chat } from '../models/chat';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Get('findAll')
  private findAllChats(): any {
    return this.ChatService.listChats();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Chat',
    required: true,
    type: String,
  })
  private findOneChat(@Param('uuid') uuid: any): any {
    const uuidChat = uuid;
    if (uuidChat && uuidChat.length > 0) {
      return this.ChatService.getChatsByUUID(uuidChat);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
  
  @Get('findByUserUUID/:uuidUser')
  @ApiParam({
    name: 'uuidUser',
    description: 'UUID of the User',
    required: true,
    type: String,
  })
  private findByUserUUID(@Param('uuidUser') UserUUID: any): any {
    const uuidUser = UserUUID;
    console.log('uuidUser', uuidUser);
    
    if (uuidUser && uuidUser.length > 0) {
      return this.ChatService.getChatsByuserUUID(uuidUser);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object Chat',
    type: Chat,
  })
  private addChat(@Req() request: any): any {
    const objChat: Chat = request.body;
    if (objChat) {
      return this.ChatService.createChat(objChat);
    } else {
      return new HttpException(
        'Object of Chat invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Chat',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object Chat',
    type: Chat,
  })
  private updateChat(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidChat = uuid;
    const objChat: Chat = request.body;
    if (uuidChat && uuidChat.length > 0) {
      if (objChat) {
        return this.ChatService.updateChat(uuidChat, objChat);
      } else {
        return new HttpException(
          'Object of Chat invalid',
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
    description: 'UUID of the Chat',
    required: true,
    type: String,
  })
  private deleteChat(@Param('uuid') uuid: any): any {
    const uuidChat = uuid;
    if (uuidChat && uuidChat.length > 0) {
      return this.ChatService.deleteChat(uuidChat);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
