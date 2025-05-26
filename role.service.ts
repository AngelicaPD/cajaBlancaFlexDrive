import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Role } from '../models/role';

@Injectable()
export class RoleService {
    public RoleRepository: Repository<Role>;
      constructor(poolConexion: DataSource) {
        this.RoleRepository = poolConexion.getRepository(Role);
      }
    
      // Métodos privados
      public async listRoles(): Promise<Role[]> {
        return this.RoleRepository.find();
      }
    
      public async getRolesByUUID(uuid: string): Promise<Role | null> {
        return this.RoleRepository.findOne({ where: { uuid: uuid } });
      }
    
      public async createRole(
        objRole: Role,
      ): Promise<Role | HttpException> {
        return this.RoleRepository
          .save(objRole)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return new HttpException(`Error creating role: ${error}`, 500);
          });
      }
    
      public async updateRole(
        uuid: string,
        objRole: Role,
      ): Promise<{ response: UpdateResult; Role: Role } | HttpException> {
        return this.RoleRepository
          .update(uuid, objRole)
          .then((response) => {
            return new HttpException(
              JSON.stringify({ response: response, Role: objRole }),
              200,
            );
          })
          .catch((error) => {
            return new HttpException(`Error updating role: ${error}`, 500);
          });
      }
    
      public async deleteRole(uuid: string): Promise<DeleteResult> {
        return this.RoleRepository.delete(uuid);
      }
}
