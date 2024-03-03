import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableFavs1709456677335 implements MigrationInterface {
    name = 'AddTableFavs1709456677335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_artists_artists" ("favoritesId" uuid NOT NULL, "artistsId" uuid NOT NULL, CONSTRAINT "PK_66223ae7b354407f1992d1569e5" PRIMARY KEY ("favoritesId", "artistsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_80db6cf8e0b60a21a82563d6b4" ON "favorites_artists_artists" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_660eecabb197df0e6b0835554f" ON "favorites_artists_artists" ("artistsId") `);
        await queryRunner.query(`CREATE TABLE "favorites_albums_albums" ("favoritesId" uuid NOT NULL, "albumsId" uuid NOT NULL, CONSTRAINT "PK_64a7bf3ac232299b01062463fc0" PRIMARY KEY ("favoritesId", "albumsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_caee2f2437cd634201109549c2" ON "favorites_albums_albums" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f68d4e307c3df157487b5f5c9" ON "favorites_albums_albums" ("albumsId") `);
        await queryRunner.query(`CREATE TABLE "favorites_tracks_tracks" ("favoritesId" uuid NOT NULL, "tracksId" uuid NOT NULL, CONSTRAINT "PK_8d984849d63bb2b029da8200f92" PRIMARY KEY ("favoritesId", "tracksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4abf0eeedd3a9467aaf46fd5a2" ON "favorites_tracks_tracks" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_243daa462592d5e517559441b8" ON "favorites_tracks_tracks" ("tracksId") `);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artists" ADD CONSTRAINT "FK_80db6cf8e0b60a21a82563d6b48" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artists" ADD CONSTRAINT "FK_660eecabb197df0e6b0835554f6" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_albums" ADD CONSTRAINT "FK_caee2f2437cd634201109549c20" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_albums" ADD CONSTRAINT "FK_4f68d4e307c3df157487b5f5c94" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_tracks" ADD CONSTRAINT "FK_4abf0eeedd3a9467aaf46fd5a2e" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_tracks" ADD CONSTRAINT "FK_243daa462592d5e517559441b82" FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_tracks_tracks" DROP CONSTRAINT "FK_243daa462592d5e517559441b82"`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_tracks" DROP CONSTRAINT "FK_4abf0eeedd3a9467aaf46fd5a2e"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_albums" DROP CONSTRAINT "FK_4f68d4e307c3df157487b5f5c94"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_albums" DROP CONSTRAINT "FK_caee2f2437cd634201109549c20"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artists" DROP CONSTRAINT "FK_660eecabb197df0e6b0835554f6"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artists" DROP CONSTRAINT "FK_80db6cf8e0b60a21a82563d6b48"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_243daa462592d5e517559441b8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4abf0eeedd3a9467aaf46fd5a2"`);
        await queryRunner.query(`DROP TABLE "favorites_tracks_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f68d4e307c3df157487b5f5c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_caee2f2437cd634201109549c2"`);
        await queryRunner.query(`DROP TABLE "favorites_albums_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_660eecabb197df0e6b0835554f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80db6cf8e0b60a21a82563d6b4"`);
        await queryRunner.query(`DROP TABLE "favorites_artists_artists"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
