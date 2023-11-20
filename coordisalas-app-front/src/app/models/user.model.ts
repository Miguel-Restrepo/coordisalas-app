import { RolEnum } from '../enums';

export class User {
  document: string = '';;
  name?: string;
  last_name?: string;
  role?: RolEnum;
}
