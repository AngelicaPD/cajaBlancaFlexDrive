import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { TypeDocumentService } from '../service/type-document.service';
import { TypeDocument } from '../models/type-document';

@Controller('type-document')
@ApiTags('type-document')
export class TypeDocumentController {
    constructor(private readonly TypeDocumentService: TypeDocumentService) {}
        
          @Get('findAll')
          private findAllTypeDocuments(): any {
            return this.TypeDocumentService.listTypeDocuments();
          }
        
          @Get('findOne/:uuid')
          @ApiParam({
            name: 'uuid',
            description: 'UUID of the type document',
            required: true,
            type: String,
          })
          private findOneTypeDocument(@Param('uuid') uuid: any): any {
            const uuidTypeDocument = uuid;
            if (uuidTypeDocument && uuidTypeDocument.length > 0) {
              return this.TypeDocumentService.getTypeDocumentsByUUID(uuidTypeDocument);
            } else {
              return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
            }
          }
        
          @Post('add')
          @ApiBody({
            description: 'Object type document',
            type: TypeDocument,
          })
          private addTypeDocument(@Req() request: any): any {
            const objTypeDocument: TypeDocument = request.body;
            if (objTypeDocument && objTypeDocument.name && objTypeDocument.name.length > 0) {
              return this.TypeDocumentService.createTypeDocument(objTypeDocument);
            } else {
              return new HttpException(
                'name of type document invalid',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        
          @Put('update/:uuid')
          @ApiParam({
            name: 'uuid',
            description: 'UUID of the type document',
            required: true,
            type: String,
          })
          @ApiBody({
            description: 'Object type document',
            type: TypeDocument,
          })
          private updateTypeDocument(@Param('uuid') uuid: any, @Req() request: any): any {
            const uuidTypeDocument = uuid;
            const objTypeDocument: TypeDocument = request.body;
            if (uuidTypeDocument && uuidTypeDocument.length > 0) {
              if (objTypeDocument && objTypeDocument.name && objTypeDocument.name.length > 0) {
                return this.TypeDocumentService.updateTypeDocument(uuidTypeDocument, objTypeDocument);
              } else {
                return new HttpException(
                  'name of type document invalid',
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
            description: 'UUID of the type document',
            required: true,
            type: String,
          })
          private deleteTypeDocument(@Param('uuid') uuid: any): any {
            const uuidTypeDocument = uuid;
            if (uuidTypeDocument && uuidTypeDocument.length > 0) {
              return this.TypeDocumentService.deleteTypeDocument(uuidTypeDocument);
            } else {
              return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
            }
          }
}
