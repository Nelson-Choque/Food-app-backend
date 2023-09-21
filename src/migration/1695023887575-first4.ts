import { MigrationInterface, QueryRunner } from "typeorm";

export class First41695023887575 implements MigrationInterface {
    name = 'First41695023887575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`food\` ADD CONSTRAINT \`FK_f08c602e9e888ed83fb8be5c3d2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` DROP FOREIGN KEY \`FK_f08c602e9e888ed83fb8be5c3d2\``);
        await queryRunner.query(`ALTER TABLE \`food\` DROP COLUMN \`categoryId\``);
    }

}
