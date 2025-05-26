import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export interface configurations {
  notifications: boolean;
  theme: boolean;
  mails: boolean;
  language: string;
  deleteChats: boolean;
}

export interface paramters {    //Each parameter is an array, because the user can select multiple options
  class:string[];
  color:string[];
  mileage:number[];         // PROPOSAL: mileage: { min: number; max: number };
  accessories:string[];     // checkbox per each accessory
  capacity: number[];       // PROPOSAL: capacity: { min: number; max: number };
  year: string[];
  price: number[];
  brand: string[];
  model: string[];
  rating: number[];         // PROPOSAL: rating: { min: number; max: number };
  insurance: boolean;       // PROPOSAL: (yes, no);
  fuelType: string[];       // PROPOSAL: (petrol, diesel, electric, hybrid);

  /* SCALABILITY PROPOSALS:
  MÉTODOS DE PAGO ACEPTADOS (STRING ARRAY)
  */
}

@Entity({ schema: 'public', name: 'preferences' })
export class Preferences {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idUser',
    description: "User's ID",
    required: true,
    example: 'CREATE AN USER AND USE ITS UUID',
  })
  public idUser: string;

  @Column({ name: 'configurations', type: 'jsonb', nullable: false })
  @ApiProperty({
    type: Object,
    description: 'User configurations',
    example: {
      notifications: true,
      theme: true,
      mails: true,
      language: 'ES',
      deleteChats: false,
    },
  })
  public configurations: configurations;

  @Column({ name: 'parameters', type: 'jsonb', nullable: false })
  @ApiProperty({
    type: Object,
    description: 'User parameters',
    example: {
      class: ['SUV', 'Sedan'],
      color: ['Red'],
      mileage: [0, 100000],
      accessories: ['Bluetooth'],
      capacity: [2, 5],
      year: ['2020', '2021'],
      price: [10000, 50000],
      brand: ['Toyota', 'Honda'],
      model: ['Corolla', 'Civic'],
    },
  })
  public paramters: paramters;

  @OneToOne(() => User, (objUser) => objUser.uuid)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'uuid' })
  public User: User;

  constructor(uuid: string, idUser:string, configuration: configurations, paramters:paramters){
    this.uuid = uuid;
    this.idUser = idUser;
    this.configurations = configuration;
    this.paramters = paramters
  } 
}
