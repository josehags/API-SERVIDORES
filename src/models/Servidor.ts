import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid'; // Importando o uuid v4 e renomeando pra uuid
import { Phone } from './Phone';

@Entity('servidores') // Do TypeORM, pois será uma entidade do banco de dados, utilizada no controller
export class Servidor {
  @PrimaryGeneratedColumn('uuid')
  id: string; // o readonly para não deixar quem tem informação do id mudar o valor, nesse caso o controller poderá só ler

  @Column() // Poderia passar o nome da coluna: @Column("name"), mas o atributo já está com mesmo nome
  name: string;

  @Column()
  mother: string;

  @Column()
  email: string;

  @Column({ length: 14 })
  cpf: string;

  @OneToMany(() => Phone, photo => photo.servidor)
  phones: Phone[];

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  birthdate: string;

  @Column()
  healthRestrictions: string;

  @Column()
  administrativeRestrictions: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn() // Para já capturar a data e fazer a formatação
  created_at: Date;

  @UpdateDateColumn() // Para já capturar a data e fazer a formatação
  update_at: Date;

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
