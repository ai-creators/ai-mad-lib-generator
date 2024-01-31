import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupAdlibCategories1706674201800 implements MigrationInterface {
    name = 'SetupAdlibCategories1706674201800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "prompt" character varying NOT NULL, "text" character varying NOT NULL, "isHidden" boolean NOT NULL, "isPg" boolean NOT NULL, "isFeatured" boolean NOT NULL, "temperature" numeric(10,2) NOT NULL DEFAULT '0.7', "topP" numeric(10,2) NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_18ce95da5b60674008c6ddd70a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib_categories_category" ("adlibId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_615f7e0f7266fcb48ecc1687585" PRIMARY KEY ("adlibId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_14697d914e2651a6a5725db0d6" ON "adlib_categories_category" ("adlibId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4470930bd2d280816475edc91b" ON "adlib_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" ADD CONSTRAINT "FK_14697d914e2651a6a5725db0d6b" FOREIGN KEY ("adlibId") REFERENCES "adlib"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" ADD CONSTRAINT "FK_4470930bd2d280816475edc91b1" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" DROP CONSTRAINT "FK_4470930bd2d280816475edc91b1"`);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" DROP CONSTRAINT "FK_14697d914e2651a6a5725db0d6b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4470930bd2d280816475edc91b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14697d914e2651a6a5725db0d6"`);
        await queryRunner.query(`DROP TABLE "adlib_categories_category"`);
        await queryRunner.query(`DROP TABLE "adlib"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
