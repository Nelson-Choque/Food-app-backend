import { MigrationInterface, QueryRunner } from "typeorm";

export class First61695050126225 implements MigrationInterface {
    name = 'First61695050126225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`food_categorys\` (\`foodId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_35aac0d918ef6b6447b4f8883d\` (\`foodId\`), INDEX \`IDX_e54780f686be063ad4356a9f44\` (\`categoryId\`), PRIMARY KEY (\`foodId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`food_categorys\` ADD CONSTRAINT \`FK_35aac0d918ef6b6447b4f8883da\` FOREIGN KEY (\`foodId\`) REFERENCES \`food\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`food_categorys\` ADD CONSTRAINT \`FK_e54780f686be063ad4356a9f442\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food_categorys\` DROP FOREIGN KEY \`FK_e54780f686be063ad4356a9f442\``);
        await queryRunner.query(`ALTER TABLE \`food_categorys\` DROP FOREIGN KEY \`FK_35aac0d918ef6b6447b4f8883da\``);
        await queryRunner.query(`DROP INDEX \`IDX_e54780f686be063ad4356a9f44\` ON \`food_categorys\``);
        await queryRunner.query(`DROP INDEX \`IDX_35aac0d918ef6b6447b4f8883d\` ON \`food_categorys\``);
        await queryRunner.query(`DROP TABLE \`food_categorys\``);
    }

}
