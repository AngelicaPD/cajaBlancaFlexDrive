import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TypeDocument } from '../models/type-document';

@Injectable()
export class TypeDocumentService {
  public TypeDocumentRepository: Repository<TypeDocument>;
  constructor(poolConexion: DataSource) {
    this.TypeDocumentRepository = poolConexion.getRepository(TypeDocument);
  }

  // Métodos privados
  public async listTypeDocuments(): Promise<TypeDocument[]> {
    return this.TypeDocumentRepository.find();
  }

  public async getTypeDocumentsByUUID(
    uuid: string,
  ): Promise<TypeDocument | null> {
    return this.TypeDocumentRepository.findOne({ where: { uuid: uuid } });
  }

  public async createTypeDocument(
    objTypeDocument: TypeDocument,
  ): Promise<TypeDocument | HttpException> {
    return this.TypeDocumentRepository.save(objTypeDocument)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating type document: ${error}`, 500);
      });
  }

  public async updateTypeDocument(
    uuid: string,
    objTypeDocument: TypeDocument,
  ): Promise<
    { response: UpdateResult; TypeDocument: TypeDocument } | HttpException
  > {
    return this.TypeDocumentRepository.update(uuid, objTypeDocument)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, TypeDocument: objTypeDocument }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating type document: ${error}`, 500);
      });
  }

  public async deleteTypeDocument(uuid: string): Promise<DeleteResult> {
    return this.TypeDocumentRepository.delete(uuid);
  }
}
