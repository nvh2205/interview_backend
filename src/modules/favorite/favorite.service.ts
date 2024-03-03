import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { Favorite } from "src/entities/Favorites";
import { Repository } from "typeorm";

@Injectable()
export class FavoriteService extends BaseService<Favorite> {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {
    super(favoriteRepository);
  }

  /**
   * Get all artist or album or track
   * @param infoSelect
   * @returns
   */
  async getAllData(infoSelect: string) {
    const queryBuilder = this.favoriteRepository.createQueryBuilder("favorite");
    const listDataSelect = queryBuilder
      .leftJoinAndSelect(`favorite.${infoSelect}`, `${infoSelect}`)
      .where(`${infoSelect}.id IS NOT NULL`)
      .select(`${infoSelect}`);

    return listDataSelect.getRawMany();
  }
}
