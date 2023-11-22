import { StateRequestEnum } from '../enums';
import { Room } from './room.model';
import { User } from './user.model';

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
  users?: User;
  room?: Room;
  reason?: string;
  start_date_recurrent?: Date;
  end_date_recurrent?: Date;
  is_recurring_event?: boolean;
}
