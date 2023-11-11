import { StateRequestEnum } from '../enums';

export class RequestRoom {
  id?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  roomId?: string;
  status?: StateRequestEnum;
  userId?: string;
}
