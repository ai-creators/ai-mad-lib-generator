import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOldId1706929982553 implements MigrationInterface {
    name = 'AddOldId1706929982553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adlib" RENAME COLUMN "oldAdlibId" TO "oldId"`);
        await queryRunner.query(`ALTER TABLE "adlib" RENAME CONSTRAINT "UQ_3e42d0190d0f23ba817c22a8f38" TO "UQ_af7e1d914f941cb5613020bcee4"`);
        await queryRunner.query(`ALTER TABLE "adlib" ALTER COLUMN "temperature" SET DEFAULT '0.7'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adlib" ALTER COLUMN "temperature" SET DEFAULT 0.7`);
        await queryRunner.query(`ALTER TABLE "adlib" RENAME CONSTRAINT "UQ_af7e1d914f941cb5613020bcee4" TO "UQ_3e42d0190d0f23ba817c22a8f38"`);
        await queryRunner.query(`ALTER TABLE "adlib" RENAME COLUMN "oldId" TO "oldAdlibId"`);
    }

}
