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
import { NotificationsService } from '../service/notifications.service';
import { Notification } from '../models/notification';

@ApiTags('notification')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly NotificationService: NotificationsService) {}

  @Get('findAll')
  private findAllNotifications(): any {
    return this.NotificationService.listNotifications();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Notification',
    required: true,
    type: String,
  })
  private findOneNotification(@Param('uuid') uuid: any): any {
    const uuidNotification = uuid;
    if (uuidNotification && uuidNotification.length > 0) {
      return this.NotificationService.getNotificationsByUUID(uuidNotification);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object Notification',
    type: Notification,
  })
  private addNotification(@Req() request: any): any {
    const objNotification: Notification = request.body;
    if (objNotification) {
      return this.NotificationService.createNotification(objNotification);
    } else {
      return new HttpException(
        'Object of Notification invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Notification',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object Notification',
    type: Notification,
  })
  private updateNotification(
    @Param('uuid') uuid: any,
    @Req() request: any,
  ): any {
    const uuidNotification = uuid;
    const objNotification: Notification = request.body;
    if (uuidNotification && uuidNotification.length > 0) {
      if (objNotification) {
        return this.NotificationService.updateNotification(
          uuidNotification,
          objNotification,
        );
      } else {
        return new HttpException(
          'Object of Notification invalid',
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
    description: 'UUID of the Notification',
    required: true,
    type: String,
  })
  private deleteNotification(@Param('uuid') uuid: any): any {
    const uuidNotification = uuid;
    if (uuidNotification && uuidNotification.length > 0) {
      return this.NotificationService.deleteNotification(uuidNotification);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
