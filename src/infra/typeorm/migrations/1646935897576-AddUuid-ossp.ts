import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddUuidOssp1646935897576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(_: QueryRunner): Promise<void> {}
}
