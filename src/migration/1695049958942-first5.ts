import { MigrationInterface, QueryRunner } from "typeorm";

export class First51695049958942 implements MigrationInterface {
    name = 'First51695049958942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` DROP FOREIGN KEY \`FK_f08c602e9e888ed83fb8be5c3d2\``);
        await queryRunner.query(`ALTER TABLE \`food\` CHANGE \`categoryId\` \`storeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`food\` ADD CONSTRAINT \`FK_91ac6dac134b0197d491de422d0\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` DROP FOREIGN KEY \`FK_91ac6dac134b0197d491de422d0\``);
        await queryRunner.query(`ALTER TABLE \`food\` CHANGE \`storeId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`food\` ADD CONSTRAINT \`FK_f08c602e9e888ed83fb8be5c3d2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
