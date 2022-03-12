import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCards1646936370254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'number', type: 'varchar(16)' },
          { name: 'holder_name', type: 'varchar' },
          { name: 'holder_email', type: 'varchar' },
          { name: 'expiration_month', type: 'varchar(2)' },
          { name: 'expiration_year', type: 'varchar(2)' },
          { name: 'cvv', type: 'varchar(3)' },
          { name: 'credit_card_company_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', isNullable: true },
          { name: 'updated_by', type: 'uuid', isNullable: true },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
          { name: 'deleted_by', type: 'uuid', isNullable: true },
        ],
        foreignKeys: [
          {
            name: 'CardsCreditCardCompany',
            columnNames: ['credit_card_company_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'credit_card_companies',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
