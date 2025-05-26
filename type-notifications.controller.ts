import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { TypeNotificationsService } from '../service/type-notifications.service';
import { TypeNotification } from '../models/type-notification';

@Controller('type-notifications')
@ApiTags('type-notifications')
export class TypeNotificationsController {
    constructor(private readonly TypeNotificationService: TypeNotificationsService) {}
        
          @Get('findAll')
          private findAllTypeNotifications(): any {
            return this.TypeNotificationService.listTypeNotifications();
          }
        
          @Get('findOne/:uuid')
          @ApiParam({
            name: 'uuid',
            description: 'UUID of the type notification',
            required: true,
            type: String,
          })
          private findOneTypeNotification(@Param('uuid') uuid: any): any {
            const uuidTypeNotification = uuid;
            if (uuidTypeNotification && uuidTypeNotification.length > 0) {
              return this.TypeNotificationService.getTypeNotificationsByUUID(uuidTypeNotification);
            } else {
              return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
            }
          }
        
          @Post('add')
          @ApiBody({
            description: 'Object type notification',
            type: TypeNotification,
          })
          private addTypeNotification(@Req() request: any): any {
            const objTypeNotification: TypeNotification = request.body;
            if (objTypeNotification && objTypeNotification.name && objTypeNotification.name.length > 0) {
              return this.TypeNotificationService.createTypeNotification(objTypeNotification);
            } else {
              return new HttpException(
                'name of type notification invalid',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        
          @Put('update/:uuid')
          @ApiParam({
            name: 'uuid',
            description: 'UUID of the type notification',
            required: true,
            type: String,
          })
          @ApiBody({
            description: 'Object type notification',
            type: TypeNotification,
          })
          private updateTypeNotification(@Param('uuid') uuid: any, @Req() request: any): any {
            const uuidTypeNotification = uuid;
            const objTypeNotification: TypeNotification = request.body;
            if (uuidTypeNotification && uuidTypeNotification.length > 0) {
              if (objTypeNotification && objTypeNotification.name && objTypeNotification.name.length > 0) {
                return this.TypeNotificationService.updateTypeNotification(uuidTypeNotification, objTypeNotification);
              } else {
                return new HttpException(
                  'name of type notification invalid',
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
            description: 'UUID of the type notification',
            required: true,
            type: String,
          })
          private deleteTypeNotification(@Param('uuid') uuid: any): any {
            const uuidTypeNotification = uuid;
            if (uuidTypeNotification && uuidTypeNotification.length > 0) {
              return this.TypeNotificationService.deleteTypeNotification(uuidTypeNotification);
            } else {
              return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
            }
          }
}
