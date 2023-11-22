import { StateRoomEnum } from '../enums';

export class Room {
  name: string = '';
  stateRoom?: StateRoomEnum;
  videoBeam?: boolean;
  tv?: boolean;
  available_seats?: number;
  functional_computers?: number;
  total_computers?: number;
  description?: string;
}
