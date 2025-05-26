import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role';
import { TypeDocument } from './type-document';
import { Vehicle } from 'src/vehicle/models/vehicle';
import { Fines } from './fines';
import { Reports } from 'src/reports/models/reports';
import { Request } from 'src/requests/models/request';
import { Message } from 'src/chat/models/message';
import { Notification } from 'src/notifications/models/notification';
import { ApiProperty } from '@nestjs/swagger';

export interface userImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

@Entity({ schema: 'public', name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'no_document', type: 'varchar', length: 20, nullable: false })
  @ApiProperty({
    description: "User's legal ID",
    name: 'noDocument',
    required: true,
    example: '123456789',
  })
  public noDocument: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: false })
  @ApiProperty({
    description: "User's first name(s)",
    name: 'firstName',
    required: true,
    example: 'John',
  })
  public firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: false })
  @ApiProperty({
    description: "User's last name(s)",
    name: 'lastName',
    required: true,
    example: 'Doe',
  })
  public lastName: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  @ApiProperty({
    description: "User's phone number (starting with country code)",
    name: 'phone',
    required: true,
    example: '+57 1234567890',
  })
  public phone: string;

  @Column({ name: 'address', type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: "User's address house (for billing purposes)",
    name: 'address',
    required: true,
    example: '123 Cra. 456',
  })
  public address: string;

  @Column({ name: 'city', type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: "User's city (for billing purposes)",
    name: 'city',
    required: true,
    example: 'City1',
  })
  public city: string;

  @Column({ name: 'country', type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: "User's country",
    name: 'country',
    required: true,
    example: 'Country1',
  })
  public country: string;

  @Column({ name: 'created_at', type: 'date', nullable: false })
  @ApiProperty({
    description: "User's day of registration",
    name: 'createdAt',
    required: true,
    example: '2023-10-01',
  })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  @ApiProperty({
    description: "User's last update",
    name: 'updatedAt',
    required: true,
    example: '2023-10-05',
  })
  public updatedAt: Date;

  @Column({ name: 'birthday', type: 'date', nullable: false })
  @ApiProperty({
    description: "User's birthday (for legal purposes)",
    name: 'birthday',
    required: true,
    example: '1990-01-01',
  })
  public birthday: Date;

  @Column({ name: 'email', type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: "User's email (for communication purposes)",
    name: 'email',
    required: true,
    example: 'mrDoe@doe.doe',
  })
  public email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
    default: '$2b$10$9cTz2rBvVA8db4GjI8wQqOUX7ErYgnvrOSQrdcbTy4sOEIbiS3wiu',
  })
  @ApiProperty({
    description: 'password of the user',
    name: 'email',
    required: true,
    example: '12412412',
  })
  public password: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['active', 'inactive', 'under_review'],
    default: 'active',
    nullable: false,
  })
  @ApiProperty({
    description: "User's status",
    name: 'status',
    required: true,
    enum: ['active', 'inactive', 'under_review'],
    example: 'active',
  })
  public status: 'active' | 'inactive' | 'under_review';

  @Column({
    name: 'rating',
    type: 'numeric',
    nullable: false,
    default: 0,
  })
  @ApiProperty({
    description: "User's rating (getting a score from 0 to 5)",
    name: 'rating',
    required: true,
    example: 4.2,
  })
  public rating: number;

  @Column({ name: 'image', type: 'varchar', length: 255 })
  @ApiProperty({
    description: "User's image (for profile purposes)",
    name: 'image',
    required: true,
    example: 'https://example.com/image.jpg',
  })
  public image: string;

  @Column({ name: 'id_role', type: 'varchar', nullable: false })
  @ApiProperty({
    description: "User's role (for permissions purposes)",
    name: 'idRole',
    required: true,
    example: '5fb32b82-9f05-4ce8-8a75-cdb175d73073',
  })
  public idRole: string;

  @Column({
    name: 'id_type_document',
    type: 'varchar',
    nullable: false,
  })
  @ApiProperty({
    description: "User's type of document (for legal purposes)",
    name: 'idTypeDocument',
    required: true,
    example: 'b1c6d65c-cb1e-4896-acfe-cf786de49455',
  })
  public idTypeDocument: string;

  @ManyToOne(() => Role, (objRol: Role) => objRol.usersRole, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_role', referencedColumnName: 'uuid' }])
  public rolUser?: Role;

  @ManyToOne(
    () => TypeDocument,
    (objTypeDocument: TypeDocument) => objTypeDocument.usersTypeDocument,
    { onUpdate: 'CASCADE', onDelete: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'id_type_document', referencedColumnName: 'uuid' }])
  public typeDocumentUser?: TypeDocument;

  @OneToMany(() => Vehicle, (objVehicle: Vehicle) => objVehicle.idOwner)
  public userVehicles?: Vehicle[];

  @OneToMany(() => Fines, (objfine: Fines) => objfine.idUser)
  public userFines?: Fines[];

  @OneToMany(() => Reports, (objReport: Reports) => objReport.idUser)
  public userReports?: Reports[];

  @OneToMany(() => Reports, (objReport: Reports) => objReport.idAdmin)
  public adminReports?: Reports[];

  @OneToMany(() => Request, (objRequests: Request) => objRequests.idClient)
  public userRequests?: Request[];

  @OneToMany(() => Message, (objMessege: Message) => objMessege.idSender)
  public userMessageSender?: Message[];

  @OneToMany(() => Message, (objMessege: Message) => objMessege.idReceiver)
  public userMessageReceiver?: Message[];

  @OneToMany(
    () => Notification,
    (objNotification: Notification) => objNotification.idUser,
  )
  public userNotifications?: Notification[];

  constructor(
    noDocument: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    createdAt: Date,
    updatedAt: Date,
    email: string,
    status: 'active' | 'inactive' | 'under_review',
    rating: number,
    image: string,
    idRole: string,
    idTypeDocument: string,
    uuid?: string,
  ) {
    this.noDocument = noDocument;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.country = country;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.email = email;
    this.status = status;
    this.rating = rating;
    this.image = image;
    this.idRole = idRole;
    this.idTypeDocument = idTypeDocument;
    this.uuid = uuid || '';
  }
}
