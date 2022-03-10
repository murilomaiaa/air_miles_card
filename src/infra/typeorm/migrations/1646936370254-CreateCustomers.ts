import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomers1646936370254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'plan_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', isNullable: true },
          { name: 'updated_by', type: 'uuid', isNullable: true },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
          { name: 'deleted_by', type: 'uuid', isNullable: true },
        ],
        foreignKeys: [
          {
            name: 'CustomersPlan',
            columnNames: ['plan_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plans',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
