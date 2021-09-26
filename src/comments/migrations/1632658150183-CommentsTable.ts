import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CommentsTable1632658150183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'article_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['article_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'articles',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('comments');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('article_id') !== -1,
    );
    await queryRunner.dropForeignKey('comments', foreignKey);
    await queryRunner.dropTable('comments');
  }
}
