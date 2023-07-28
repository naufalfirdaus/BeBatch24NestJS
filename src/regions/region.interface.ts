import { Regions } from 'output/entities/Regions';

export class RoomI {
  data: Regions[];
  page: number;
  limit: number;
  totalCount: number;
}
