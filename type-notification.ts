import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notification';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'type_notification' })
export class TypeNotification {

  @PrimaryGeneratedColumn('uuid')
  public uuid: string;
  
  @Column({ name: 'name', type: 'varchar', length: 50, unique: true })
  @ApiProperty({
    description: 'Name of the type of notification',
    name: 'name',
    required: true,
  })
  public name: string;

  @OneToMany(
    () => Notification,
    (objNotification: Notification) => objNotification.idTypeNotification,
  )
  public notificationByType?: Notification[];

  constructor(name: string) {
    this.name = name;
  }
}
