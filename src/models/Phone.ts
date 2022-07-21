import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Servidor } from './Servidor';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 14 })
  phone_Number: string;

  @ManyToOne(() => Servidor, servidor => servidor.phones)
  servidor: Servidor;

  /*
      A geração do uuID automático não será por meio do SGBD, e sim aqui pelo código
      Utilizando a bilioteca: yarn add uuid
      Tipos da biblioteca uuid: yarn add @types/uuid -D
  */
  constructor() {
    // Se esse ID não existir, gerar um id
    if (!this.id) {
      this.id = uuid();
    }
  }
}
