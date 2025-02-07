import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738941369269 implements MigrationInterface {
    name = 'Migration1738941369269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`FirstName\` varchar(255) NOT NULL, \`LastName\` varchar(255) NOT NULL, \`Age\` int NOT NULL, \`DateOfBirth\` date NOT NULL, \`Email\` varchar(255) NOT NULL, \`Address\` varchar(255) NOT NULL, \`CreateAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`UpdatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`IsActive\` tinyint NOT NULL, \`Password\` varchar(255) NOT NULL, \`TetsPassword\` varchar(255) NOT NULL, \`TesPassword\` varchar(255) NOT NULL, \`TesPasswodasdasdasdasrd\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
