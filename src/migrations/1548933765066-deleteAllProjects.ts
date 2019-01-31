import {MigrationInterface, QueryRunner} from "typeorm";

export class changeInterestType1548933765066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DELETE FROM "project";`)
      await queryRunner.query(`DELETE FROM "user";`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
