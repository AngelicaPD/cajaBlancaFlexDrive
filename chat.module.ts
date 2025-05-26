import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message.service';
import { MessageController } from './controllers/message.controller';

@Module({
  controllers: [ChatController, MessageController],
  providers: [ChatService, MessageService]
})
export class ChatModule {}
