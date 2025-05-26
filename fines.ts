import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'fines' })
export class Fines {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'no_fine', type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: 'Number of the fine',
    example: '232423123456',
    type: String,
  })
  public noFine: string;

  @Column({ name: 'status', type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Status of the fine',
    example: 'Pendiente',
    type: String,
    default: ''
  })
  public status: boolean;

  @Column({ name: 'fine_date', type: 'date', nullable: false })
  @ApiProperty({
    description: 'Date of the fine',
    example: '2023-10-01',
    type: Date,
  })
  public fineDate: Date;

  @Column({
    name: 'infraction_code',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @ApiProperty({
    description: 'Code of the infraction',
    example: 'INF123',
    type: String,
  })
  public infractionCode: string;

  @Column({ name: 'infraction_description', type: 'text', nullable: false })
  @ApiProperty({
    description: 'Description of the infraction',
    example: 'Speeding violation',
    type: String,
  })
  public infractionDescription: string;

  @Column({ name: 'entitie', type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: 'Entity that issued the fine',
    example: 'Traffic Department',
    type: String,
  })
  public entitie: string;

  @Column({
    name: 'no_resolution',
    type: 'varchar',
    length: 50,
    nullable: false,
  })

  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  @ApiProperty({
    description: 'UUID of the user associated with the fine',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  public idUser: string;

  @ManyToOne(() => User, (objUser: User) => objUser.userFines, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'uuid' }])
  public finesUser?: User;

  constructor(
    uuid: string,
    noFine: string,
    status: boolean,
    fineDate: Date,
    infractionCode: string,
    infractionDescription: string,
    entitie: string,
    noResolution: string,
    idUser: string,
  ) {
    this.uuid = uuid;
    this.noFine = noFine;
    this.status = status;
    this.fineDate = fineDate;
    this.infractionCode = infractionCode;
    this.infractionDescription = infractionDescription;
    this.entitie = entitie;
    this.idUser = idUser;
  }
}
