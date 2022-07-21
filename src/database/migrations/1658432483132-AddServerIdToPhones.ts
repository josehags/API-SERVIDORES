import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddServerIdToPhones1658432483132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'phones',
      new TableColumn({
        name: 'servidor_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'phones',
      new TableForeignKey({
        name: 'PhonesServidor',
        columnNames: ['servidor_id'],
        referencedTableName: 'servidores',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('phones', 'PhonesServidor');
    await queryRunner.dropColumn('phones', 'servidor_id');
  }
}
