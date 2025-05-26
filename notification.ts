import { User } from 'src/user/models/user';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeNotification } from './type-notification';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @ApiProperty({
    description: 'Description of the notification',
    type: String,
    example: 'Notification description',
  })
  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @ApiProperty({
    description: 'Date of creation of the notification',
    type: Date,
    example: '2023-10-01',
  })
  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @ApiProperty({
    description: 'Date of last update of the notification',
    type: Date,
    example: '2023-10-01',
  })
  @Column({ name: 'updated_at', type: 'date', nullable: false })
  public updatedAt: Date;

  @ApiProperty({
    description: 'Date when the notification was sent',
    type: Date,
    example: '2023-10-01',
  })
  @Column({ name: 'send_date', type: 'date', nullable: false })
  public sendDate: Date;

  @ApiProperty({
    description: 'Date when the notification was seen',
    type: Date,
    example: '2023-10-01',
  })
  @Column({ name: 'seen_date', type: 'date', nullable: false })
  public seenDate: Date;

  @ApiProperty({
    description: 'Status of the notification',
    type: Boolean,
    example: true,
  })
  @Column({ name: 'status', type: 'bool', nullable: false })
  public status: boolean;


  @ApiProperty({
    description: 'UUID of the type of notification',
    type: String,
    example: 'TypeNotification UUID',
  })
  @Column({ name: 'id_type_notification', type: 'varchar', nullable: false })
  public idTypeNotification: string;

  @ApiProperty({
    description: 'UUID of the user associated with the notification',
    type: String,
    example: 'User UUID',
  })
  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  public idUser: string;

  @ManyToOne(() => User, (objUser: User) => objUser.userNotifications, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'uuid' }])
  public notificationUser?: User;

  @ManyToOne(
    () => TypeNotification,
    (objTypeNotification: TypeNotification) =>
      objTypeNotification.notificationByType,
    {
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'id_type_notification', referencedColumnName: 'uuid' }])
  public typeNotification?: TypeNotification;

  constructor(
    description: string,
    createdAt: Date,
    updatedAt: Date,
    sendDate: Date,
    seenDate: Date,
    status: boolean,
    idTypeNotification: string,
    idUser: string,
  ) {
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sendDate = sendDate;
    this.seenDate = seenDate;
    this.status = status;
    this.idTypeNotification = idTypeNotification;
    this.idUser = idUser;
  }
}
