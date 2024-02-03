import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupAdlibsCategoriesResponses1706726975301 implements MigrationInterface {
    name = 'SetupAdlibsCategoriesResponses1706726975301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying(50) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "title" character varying(200) NOT NULL, "prompt" character varying(100) NOT NULL, "text" character varying NOT NULL, "isHidden" boolean NOT NULL DEFAULT false, "isPg" boolean NOT NULL DEFAULT false, "isFeatured" boolean NOT NULL DEFAULT false, "temperature" numeric(10,2) NOT NULL DEFAULT '0.7', "topP" numeric(10,2) NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_18ce95da5b60674008c6ddd70a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib_response" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "adlibId" integer, CONSTRAINT "PK_4561bf145faaa69003979da0062" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib_response_question" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, "order" integer NOT NULL, "adlibResponseId" integer, CONSTRAINT "PK_bfc4bb7eae0f1e8f5087dbb8936" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib_categories_category" ("adlibId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_615f7e0f7266fcb48ecc1687585" PRIMARY KEY ("adlibId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_14697d914e2651a6a5725db0d6" ON "adlib_categories_category" ("adlibId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4470930bd2d280816475edc91b" ON "adlib_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "adlib_response" ADD CONSTRAINT "FK_85840b342c4b4ffb3bc4abf0497" FOREIGN KEY ("adlibId") REFERENCES "adlib"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adlib_response_question" ADD CONSTRAINT "FK_1bc6c3e97c736e6b427cd487f76" FOREIGN KEY ("adlibResponseId") REFERENCES "adlib_response"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" ADD CONSTRAINT "FK_14697d914e2651a6a5725db0d6b" FOREIGN KEY ("adlibId") REFERENCES "adlib"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" ADD CONSTRAINT "FK_4470930bd2d280816475edc91b1" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" DROP CONSTRAINT "FK_4470930bd2d280816475edc91b1"`);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" DROP CONSTRAINT "FK_14697d914e2651a6a5725db0d6b"`);
        await queryRunner.query(`ALTER TABLE "adlib_response_question" DROP CONSTRAINT "FK_1bc6c3e97c736e6b427cd487f76"`);
        await queryRunner.query(`ALTER TABLE "adlib_response" DROP CONSTRAINT "FK_85840b342c4b4ffb3bc4abf0497"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4470930bd2d280816475edc91b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14697d914e2651a6a5725db0d6"`);
        await queryRunner.query(`DROP TABLE "adlib_categories_category"`);
        await queryRunner.query(`DROP TABLE "adlib_response_question"`);
        await queryRunner.query(`DROP TABLE "adlib_response"`);
        await queryRunner.query(`DROP TABLE "adlib"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
