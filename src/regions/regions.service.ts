import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Regions } from 'output/entities/Regions';
import { Like, Repository } from 'typeorm';
import { RoomI } from './region.interface';
import { PaginationDto } from './pagionation.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions) private serviceReg: Repository<Regions>,
  ) {}

  public async findAll(
    location: string,
    city: string,
    options: PaginationDto,
  ): Promise<RoomI> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.serviceReg.count();
    const regions = await this.serviceReg.find({
      select: {
        regionId: true,
        regionName: true,
        photo: true,
        countries: {
          countryId: true,
          countryName: true,
          locations: {
            city: true,
          },
        },
      },
      relations: {
        countries: {
          locations: true,
        },
      },
      take: options.limit,
      skip: skippedItems,
      where: {
        countries: {
          locations: {
            city: Like(`%${location}%`),
          },
          countryName: Like(`%${city}%`),
        },
      },
    });
    console.log();
    return {
      totalCount,
      page: options.page,
      limit: options.limit,
      data: regions,
    };
  }
  public async findOne(search: string) {
    try {
      console.log();

      return await this.serviceReg
        .createQueryBuilder('regions')
        .where('region_name = :search', {
          search: search,
        })
        .getMany();
    } catch (error) {
      return error;
    }
  }
  public async Insert(name: string) {
    try {
      const region = await this.serviceReg.save({
        regionName: name,
      });
      return region;
    } catch (error) {
      return error.message;
    }
  }

  public async update(id: number, name: string) {
    try {
      const region = await this.serviceReg.update(
        { regionId: id, regionName: name },
        {
          regionName: name,
        },
      );
      return region;
    } catch (error) {
      return error.message;
    }
  }
  public async Delete(id: number) {
    return await this.serviceReg.delete(id);
  }
  public async Upload(file, name: string) {
    try {
      const region = await this.serviceReg.save({
        regionName: name,
        photo: file.originalname,
      });
      return region;
    } catch (error) {
      return error.message;
    }
  }
}
