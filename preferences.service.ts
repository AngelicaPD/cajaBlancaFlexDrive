import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Preferences } from '../models/preferences';

@Injectable()
export class PreferencesService {

    public PreferencesRepository: Repository<Preferences>;
    constructor(poolConexion: DataSource) {
        this.PreferencesRepository = poolConexion.getRepository(Preferences);
    }

    // Métodos privados
    public async listPreferences(): Promise<Preferences[]> {
        return this.PreferencesRepository.find();
    }

    public async getPreferencesByUUID(uuid: string): Promise<Preferences | null> {
        return this.PreferencesRepository.findOne({ where: { uuid: uuid } });
    }
    
    public async getPreferencesByUserUUID(uuidUser: string): Promise<Preferences | null> {
        return this.PreferencesRepository.findOne({ where: { idUser: uuidUser } });
    }

    public async createPreferences(
        objPreferences: Preferences,
    ): Promise<Preferences | HttpException> {
        return this.PreferencesRepository.save(objPreferences)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return new HttpException(`Error creating Preferences: ${error}`, 500);
            });
    }

    public async updatePreferences(
        uuid: string,
        objPreferences: Preferences,
    ): Promise<
        { response: UpdateResult; Preferences: Preferences } | HttpException
    > {
        return this.PreferencesRepository.update(uuid, objPreferences)
            .then((response) => {
                return new HttpException(
                    JSON.stringify({ response: response, Preferences: objPreferences }),
                    200,
                );
            })
            .catch((error) => {
                return new HttpException(`Error updating Preferences: ${error}`, 500);
            });
    }

    public async deletePreferences(uuid: string): Promise<DeleteResult> {
        return this.PreferencesRepository.delete(uuid);
    }

}
