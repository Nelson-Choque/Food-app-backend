import { MigrationInterface, QueryRunner } from "typeorm";

export class First71696432299134 implements MigrationInterface {
    name = 'First71696432299134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` ADD \`brand\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` DROP COLUMN \`brand\``);
    }

}
