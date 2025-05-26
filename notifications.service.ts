import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Notification } from '../models/notification';

@Injectable()
export class NotificationsService {
  public NotificationRepository: Repository<Notification>;
  constructor(poolConexion: DataSource) {
    this.NotificationRepository = poolConexion.getRepository(Notification);
  }

  // Métodos privados
  public async listNotifications(): Promise<Notification[]> {
    return this.NotificationRepository.find({
      relations: ['typeNotification'],
      select: {
        typeNotification: {
          name: true,
        },
      },
    });
  }

  public async getNotificationsByUUID(
    uuid: string,
  ): Promise<Notification | null> {
    return this.NotificationRepository.findOne({
      where: { uuid: uuid },
      relations: ['typeNotification'],
      select: {
        typeNotification: {
          name: true,
        },
      },
    });
  }

  public async createNotification(
    objNotification: Notification,
  ): Promise<Notification | HttpException> {
    return this.NotificationRepository.save(objNotification)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Notification: ${error}`, 500);
      });
  }

  public async updateNotification(
    uuid: string,
    objNotification: Notification,
  ): Promise<
    { response: UpdateResult; Notification: Notification } | HttpException
  > {
    return this.NotificationRepository.update(uuid, objNotification)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, Notification: objNotification }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating Notification: ${error}`, 500);
      });
  }

  public async deleteNotification(uuid: string): Promise<DeleteResult> {
    return this.NotificationRepository.delete(uuid);
  }
}
