import { StateRequestEnum } from '../enums';

export class RequestRoom {
  id?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  start_date?: Date;
  end_date?: Date;
  room_id?: string;
  status?: StateRequestEnum;
  user_id?: string;
}
