import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ArticleThumpsUp1632666463423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('articles', new TableColumn({
            name: 'thumbs_up',
            type: 'int',
            unsigned: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('articles', 'thumbs_up');
    }

}
