import { HttpException, Injectable } from '@nestjs/common';
import { TypeNotification } from '../models/type-notification';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TypeNotificationsService {
  public TypeNotificationRepository: Repository<TypeNotification>;
  constructor(poolConexion: DataSource) {
    this.TypeNotificationRepository =
      poolConexion.getRepository(TypeNotification);
  }

  // Métodos privados
  public async listTypeNotifications(): Promise<TypeNotification[]> {
    return this.TypeNotificationRepository.find();
  }

  public async getTypeNotificationsByUUID(
    uuid: string,
  ): Promise<TypeNotification | null> {
    return this.TypeNotificationRepository.findOne({ where: { uuid: uuid } });
  }

  public async createTypeNotification(
    objTypeNotification: TypeNotification,
  ): Promise<TypeNotification | HttpException> {
    return this.TypeNotificationRepository.save(objTypeNotification)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(
          `Error creating type notification: ${error}`,
          500,
        );
      });
  }

  public async updateTypeNotification(
    uuid: string,
    objTypeNotification: TypeNotification,
  ): Promise<
    | { response: UpdateResult; TypeNotification: TypeNotification }
    | HttpException
  > {
    return this.TypeNotificationRepository.update(uuid, objTypeNotification)
      .then((response) => {
        return new HttpException(
          JSON.stringify({
            response: response,
            TypeNotification: objTypeNotification,
          }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(
          `Error updating type notification: ${error}`,
          500,
        );
      });
  }

  public async deleteTypeNotification(uuid: string): Promise<DeleteResult> {
    return this.TypeNotificationRepository.delete(uuid);
  }
}
