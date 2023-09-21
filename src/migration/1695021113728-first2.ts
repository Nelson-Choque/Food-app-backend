import { MigrationInterface, QueryRunner } from "typeorm";

export class First21695021113728 implements MigrationInterface {
    name = 'First21695021113728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`store_categories_category\` (\`storeId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_3111faca1a4cfd9d80f65df5c1\` (\`storeId\`), INDEX \`IDX_32e0b98b271fd7cb741361e713\` (\`categoryId\`), PRIMARY KEY (\`storeId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`store_categories_category\` ADD CONSTRAINT \`FK_3111faca1a4cfd9d80f65df5c1d\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`store_categories_category\` ADD CONSTRAINT \`FK_32e0b98b271fd7cb741361e7132\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_categories_category\` DROP FOREIGN KEY \`FK_32e0b98b271fd7cb741361e7132\``);
        await queryRunner.query(`ALTER TABLE \`store_categories_category\` DROP FOREIGN KEY \`FK_3111faca1a4cfd9d80f65df5c1d\``);
        await queryRunner.query(`DROP INDEX \`IDX_32e0b98b271fd7cb741361e713\` ON \`store_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_3111faca1a4cfd9d80f65df5c1\` ON \`store_categories_category\``);
        await queryRunner.query(`DROP TABLE \`store_categories_category\``);
    }

}
