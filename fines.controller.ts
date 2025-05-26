import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FinesService } from '../service/fines.service';
import { Fines } from '../models/fines';

@Controller('fines')
@ApiTags('fines')
export class FinesController {
    constructor(private readonly FinesService: FinesService) {}
    
      @Get('findAll')
      private findAllFiness(): any {
        return this.FinesService.listFiness();
      }
    
      @Get('findOne/:uuid')
      @ApiParam({
        name: 'uuid',
        description: 'UUID of the Fines',
        required: true,
        type: String,
      })
      private findOneFines(@Param('uuid') uuid: any): any {
        const uuidFines = uuid;
        if (uuidFines && uuidFines.length > 0) {
          return this.FinesService.getFinessByUUID(uuidFines);
        } else {
          return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
      }
    
      @Post('add')
      @ApiBody({
        description: 'Object Fines',
        type: Fines,
      })
      private addFines(@Req() request: any): any {
        const objFines: Fines = request.body;
        if (objFines) {
          return this.FinesService.createFines(objFines);
        } else {
          return new HttpException(
            'Object of Fines invalid',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    
      @Put('update/:uuid')
      @ApiParam({
        name: 'uuid',
        description: 'UUID of the Fines',
        required: true,
        type: String,
      })
      @ApiBody({
        description: 'Object Fines',
        type: Fines,
      })
      private updateFines(@Param('uuid') uuid: any, @Req() request: any): any {
        const uuidFines = uuid;
        const objFines: Fines = request.body;
        if (uuidFines && uuidFines.length > 0) {
          if (objFines) {
            return this.FinesService.updateFines(uuidFines, objFines);
          } else {
            return new HttpException(
              'Object of Fines invalid',
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
        description: 'UUID of the Fines',
        required: true,
        type: String,
      })
      private deleteFines(@Param('uuid') uuid: any): any {
        const uuidFines = uuid;
        if (uuidFines && uuidFines.length > 0) {
          return this.FinesService.deleteFines(uuidFines);
        } else {
          return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
      }
}
