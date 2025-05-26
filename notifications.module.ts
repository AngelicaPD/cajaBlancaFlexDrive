import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './service/notifications.service';
import { TypeNotificationsService } from './service/type-notifications.service';
import { TypeNotificationsController } from './controllers/type-notifications.controller';

@Module({
  controllers: [NotificationsController, TypeNotificationsController],
  providers: [NotificationsService, TypeNotificationsService]
})
export class NotificationsModule {}
