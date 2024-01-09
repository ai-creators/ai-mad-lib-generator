import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupEntities1704764388463 implements MigrationInterface {
    name = 'SetupEntities1704764388463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib_response_question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying NOT NULL, "answer" character varying NOT NULL, "adlibResponseId" uuid, CONSTRAINT "PK_bfc4bb7eae0f1e8f5087dbb8936" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "oldAdlibResponseId" character varying, "isPrivate" boolean NOT NULL DEFAULT false, "isHidden" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "adlibId" uuid, "createdById" uuid, CONSTRAINT "UQ_f4c155b1f54b0714b759631581a" UNIQUE ("oldAdlibResponseId"), CONSTRAINT "PK_4561bf145faaa69003979da0062" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "adlibId" uuid, "commentId" uuid, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(280) NOT NULL, "adlibId" uuid, "parentCommentId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("accountId" uuid NOT NULL, "adlibId" uuid NOT NULL, "hasBookmarked" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2880b5c047a6d0d44919f24186b" PRIMARY KEY ("accountId", "adlibId"))`);
        await queryRunner.query(`CREATE TABLE "adlib" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "oldAdlibId" character varying, "prompt" character varying(100) NOT NULL, "title" character varying(200) NOT NULL, "body" character varying NOT NULL, "isHidden" boolean NOT NULL DEFAULT false, "isPg" boolean NOT NULL DEFAULT false, "temperature" integer, "topP" integer, "isFeatured" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdById" uuid, "commentsId" uuid, CONSTRAINT "UQ_3e42d0190d0f23ba817c22a8f38" UNIQUE ("oldAdlibId"), CONSTRAINT "PK_18ce95da5b60674008c6ddd70a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub" character varying NOT NULL, "username" character varying(100) NOT NULL, "usePg" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, CONSTRAINT "UQ_123774b1b0d0b2a15bd07e2d2d9" UNIQUE ("content"), CONSTRAINT "PK_55cadf83cf65e64f5e5441a0491" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adlib_categories_category" ("adlibId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_615f7e0f7266fcb48ecc1687585" PRIMARY KEY ("adlibId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_14697d914e2651a6a5725db0d6" ON "adlib_categories_category" ("adlibId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4470930bd2d280816475edc91b" ON "adlib_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "adlib_response_question" ADD CONSTRAINT "FK_1bc6c3e97c736e6b427cd487f76" FOREIGN KEY ("adlibResponseId") REFERENCES "adlib_response"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adlib_response" ADD CONSTRAINT "FK_85840b342c4b4ffb3bc4abf0497" FOREIGN KEY ("adlibId") REFERENCES "adlib"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adlib_response" ADD CONSTRAINT "FK_8466bccfafb350757af656dd8e3" FOREIGN KEY ("createdById") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_2633ac8f3f7aed80c2b7e9bb473" FOREIGN KEY ("adlibId") REFERENCES "adlib"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_4584f851fc6471f517d9dad8966" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8c5f15f54e57068b0f11b75536e" FOREIGN KEY ("adlibId") REFERENCES "adlib"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_11c2e75428a5186e3b192f22dd6" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_80923a84bb3d35d67e8e584e394" FOREIGN KEY ("adlibId") REFERENCES "adlib"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adlib" ADD CONSTRAINT "FK_e13052cbcdf9562385fd0d99ea4" FOREIGN KEY ("createdById") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adlib" ADD CONSTRAINT "FK_982d8522a27ad6dabee190e4e39" FOREIGN KEY ("commentsId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" ADD CONSTRAINT "FK_14697d914e2651a6a5725db0d6b" FOREIGN KEY ("adlibId") REFERENCES "adlib"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" ADD CONSTRAINT "FK_4470930bd2d280816475edc91b1" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" DROP CONSTRAINT "FK_4470930bd2d280816475edc91b1"`);
        await queryRunner.query(`ALTER TABLE "adlib_categories_category" DROP CONSTRAINT "FK_14697d914e2651a6a5725db0d6b"`);
        await queryRunner.query(`ALTER TABLE "adlib" DROP CONSTRAINT "FK_982d8522a27ad6dabee190e4e39"`);
        await queryRunner.query(`ALTER TABLE "adlib" DROP CONSTRAINT "FK_e13052cbcdf9562385fd0d99ea4"`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_80923a84bb3d35d67e8e584e394"`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_11c2e75428a5186e3b192f22dd6"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8c5f15f54e57068b0f11b75536e"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_4584f851fc6471f517d9dad8966"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_2633ac8f3f7aed80c2b7e9bb473"`);
        await queryRunner.query(`ALTER TABLE "adlib_response" DROP CONSTRAINT "FK_8466bccfafb350757af656dd8e3"`);
        await queryRunner.query(`ALTER TABLE "adlib_response" DROP CONSTRAINT "FK_85840b342c4b4ffb3bc4abf0497"`);
        await queryRunner.query(`ALTER TABLE "adlib_response_question" DROP CONSTRAINT "FK_1bc6c3e97c736e6b427cd487f76"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4470930bd2d280816475edc91b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14697d914e2651a6a5725db0d6"`);
        await queryRunner.query(`DROP TABLE "adlib_categories_category"`);
        await queryRunner.query(`DROP TABLE "reaction_type"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "adlib"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TABLE "adlib_response"`);
        await queryRunner.query(`DROP TABLE "adlib_response_question"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
