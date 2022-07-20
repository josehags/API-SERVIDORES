import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePhone1658326843536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // Tabela é um objeto
        name: 'phones', // Nova tabela chamada Servidores
        columns: [
          // Array dos atributos dessa tabela
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true, // ID é a chave primária
          },
          {
            name: 'Number',
            type: 'varchar',
            isNullable: false, // Não pode ser nulo (Padrão se deixar sem)
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()', // Banco de dados captura data e tempo do momento
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()', // Banco de dados captura data e tempo do momento
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('phones');
  }
}
