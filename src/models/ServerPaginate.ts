import { IServer } from './IServer';

export interface ServerPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IServer[];
}
