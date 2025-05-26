import { HttpException, Injectable } from '@nestjs/common';
import { Fines } from '../models/fines';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FinesService {
    public FinesRepository: Repository<Fines>;
      constructor(poolConexion: DataSource) {
        this.FinesRepository = poolConexion.getRepository(Fines);
      }
    
      // Métodos privados
      public async listFiness(): Promise<Fines[]> {
        return this.FinesRepository.find();
      }
    
      public async getFinessByUUID(uuid: string): Promise<Fines | null> {
        return this.FinesRepository.findOne({ where: { uuid: uuid } });
      }
    
      public async createFines(objFines: Fines): Promise<Fines | HttpException> {
        return this.FinesRepository.save(objFines)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return new HttpException(`Error creating Fines: ${error}`, 500);
          });
      }
    
      public async updateFines(
        uuid: string,
        objFines: Fines,
      ): Promise<{ response: UpdateResult; Fines: Fines } | HttpException> {
        return this.FinesRepository.update(uuid, objFines)
          .then((response) => {
            return new HttpException(
              JSON.stringify({ response: response, Fines: objFines }),
              200,
            );
          })
          .catch((error) => {
            return new HttpException(`Error updating Fines: ${error}`, 500);
          });
      }
    
      public async deleteFines(uuid: string): Promise<DeleteResult> {
        return this.FinesRepository.delete(uuid);
      }
}
