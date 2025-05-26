import { Controller, Get, HttpException, HttpStatus, Param, Post, Req, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { PreferencesService } from '../service/preferences.service';
import { Preferences } from '../models/preferences';

@Controller('preferences')
@ApiTags('preferences')
export class PreferencesController {
    constructor(private readonly PreferencesService: PreferencesService) { }

    @Get('findAll')
    private findAllPreferences(): any {
        return this.PreferencesService.listPreferences();
    }

    @Get('findOne/:uuid')
    @ApiParam({
        name: 'uuid',
        description: "UUID of the user's preferences",
        required: true,
        type: String,
    })
    private findOnePreferences(@Param('uuid') uuid: any): any {
        const uuidPreferences = uuid;
        if (uuidPreferences && uuidPreferences.length > 0) {
            return this.PreferencesService.getPreferencesByUUID(uuidPreferences);
        } else {
            return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
    }
    
    @Get('findByUser/:uuidUser')
    @ApiParam({
        name: 'uuidUser',
        description: "UUID of the user",
        required: true,
        type: String,
    })
    private findOnePreferencesByUser(@Param('uuidUser') uuidUser: any): any {
        const uuidPreferences = uuidUser;
        if (uuidPreferences && uuidPreferences.length > 0) {
            return this.PreferencesService.getPreferencesByUserUUID(uuidPreferences);
        } else {
            return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Post('add')
    @ApiBody({
        description: "Object user's preferences",
        type: Preferences,
    })
    private addPreferences(@Req() request: any): any {
        const objPreferences: Preferences = request.body;
        if (objPreferences) {
            return this.PreferencesService.createPreferences(objPreferences);
        } else {
            return new HttpException(
                'name of preferences invalid',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put('update/:uuid')
    @ApiParam({
        name: 'uuid',
        description: "UUID of the user's preferences",
        required: true,
        type: String,
    })
    @ApiBody({
        description: "Object user's preferences",
        type: Preferences,
    })
    private updatePreferences(@Param('uuid') uuid: any, @Req() request: any): any {
        const uuidPreferences = uuid;
        const objPreferences: Preferences = request.body;
        if (uuidPreferences && uuidPreferences.length > 0) {
            if (objPreferences) {
                return this.PreferencesService.updatePreferences(uuidPreferences, objPreferences);
            } else {
                return new HttpException(
                    'name of preferences invalid',
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
        description: "UUID of the user's preferences",
        required: true,
        type: String,
    })
    private deletePreferences(@Param('uuid') uuid: any): any {
        const uuidPreferences = uuid;
        if (uuidPreferences && uuidPreferences.length > 0) {
            return this.PreferencesService.deletePreferences(uuidPreferences);
        } else {
            return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
