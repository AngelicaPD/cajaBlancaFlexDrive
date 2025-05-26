import { User } from './../../user/models/user';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'message' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'send_date', type: 'date', nullable: false })
  @ApiProperty({
    description: 'Date when the message was sent',
    name: 'sendDate',
    required: true,
    example: '2023-10-01',
  })
  public sendDate: Date;

  @Column({ name: 'status', type: 'bool', nullable: false })
  @ApiProperty({
    description: 'Status of the message',
    name: 'status',
    required: true,
    example: true,
  })
  public status: boolean;

  @Column({ name: 'id_chat', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idChat',
    description: 'Chat to which the message belongs',
    required: true,
    example: '754c4059-dfe9-40ac-aeae-333c6deb5bec',
  })
  public idChat: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Image adjunct',
    name: 'image',
    required: false,
    example: 'https://example.com/image.jpg',
  })
  public image: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  @ApiProperty({
    description: 'Description of the message',
    name: 'description',
    required: true,
    example: 'Hello, how are you? \nWe want to know if you are interested in our services. In case of being so, please contact us. \nWe will be happy to assist you. Thank you. Best regards. \nThe team of XYZ. \n\n... \n\n\nPD: We are waiting for your response. Have a great day. Best regards. The team of XYZ.',
  })
  public description: string;

  @Column({ name: 'id_sender', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idSender',
    description: 'Sender of the message',
    required: true,
    example: 'd791745d-9083-4b33-96e9-85c7bde2cfc6',
  })
  public idSender: string;

  @Column({ name: 'id_receiver', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idReceiver',
    description: 'Receiver of the message',
    required: true,
    example: '14115906-ba21-4098-9011-25ae209a9867'
  })
  public idReceiver: string;        //Scalability: It requires to be changed to an array of users, since a message can be sent to several users.

  @ManyToOne(() => User, (objUser: User) => objUser.userMessageSender, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_sender', referencedColumnName: 'uuid' }])
  public senderUser?: User;

  @ManyToOne(() => User, (objUser: User) => objUser.userMessageReceiver, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_receiver', referencedColumnName: 'uuid' }])
  public receiverUser?: User;

  @ManyToOne(() => Chat, (objChat: Chat) => objChat.chatMessage, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_chat', referencedColumnName: 'uuid' }])
  public messageChat?: Chat;

  constructor(
    uuid: string,
    sendDate: Date,
    status: boolean,
    idChat: string,
    image: string,
    description: string,
    idSender: string,
    idReceiver: string,
  ) {
    this.uuid = uuid;
    this.sendDate = sendDate;
    this.status = status;
    this.idChat = idChat;
    this.image = image;
    this.description = description;
    this.idSender = idSender;
    this.idReceiver = idReceiver;
  }
}
