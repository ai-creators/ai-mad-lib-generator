import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccount1708364201643 implements MigrationInterface {
    name = 'AddAccount1708364201643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adlib" ALTER COLUMN "temperature" SET DEFAULT '0.7'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adlib" ALTER COLUMN "temperature" SET DEFAULT 0.7`);
    }

}
