import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'type_document' })
export class TypeDocument {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @ApiProperty({
    description: 'Name of the type document',
    name: 'name',
    required: true,
  })
  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  public name: string;

  @OneToMany(() => User, (objUser: User) => objUser.idTypeDocument)
  public usersTypeDocument?: User[];

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}
