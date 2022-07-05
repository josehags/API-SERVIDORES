import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServidores1656694737087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // Tabela é um objeto
        name: 'servidores', // Nova tabela chamada Servidores
        columns: [
          // Array dos atributos dessa tabela
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true, // ID é a chave primária
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'mother',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'phone',
            type: 'varchar ',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'cpf',
            type: 'varchar ',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'birthdate',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'healthRestrictions',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'administrativeRestrictions',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'isDeleted',
            type: 'boolean',
            default: false, // Utilizado para fazer exclusão logica do registro
          },
          {
            name: 'created_at', // quando foi criado
            type: 'timestamp',
            default: 'now()', // Banco de dados captura data e tempo do momento
          },
          {
            name: 'update_at', //quando foi modificado
            type: 'timestamp',
            default: 'now()', // Banco de dados captura data e tempo do momento
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('servidores');
  }
}
