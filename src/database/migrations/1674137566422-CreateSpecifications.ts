import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecifications1674137566422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varChar",
          },
          {
            name: "description",
            type: "varChar",
          },
          {
            name: "created_At",
            type: "timestamp()",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("specifications");
  }
}
