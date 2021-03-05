import { Ship, ShipsResponse} from '@models/ships.model';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';

export class SetShipResponse {
  static readonly type = '[Ships] Set ship response';
  constructor(public shipsResponse: ShipsResponse){}
}

export class SetShipListConfig {
  static readonly type = '[Ships] Set ship list config';
  constructor(public shipListConfig: PaginatePipeArgs){}
}

export class SetShipListPage {
  static readonly type = '[Ships] Set ship list page';
  constructor(public page: number){}
}
