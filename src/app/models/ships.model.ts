import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
export interface Ship {
  name: String,
  model: String,
  manufacturer: String,
  cost_in_credits: String,
  length: String,
  max_atmosphering_speed: String,
  crew: String,
  passengers: String,
  cargo_capacity: String,
  consumables: String,
  hyperdrive_rating: String,
  MGLT: String,
  starship_class: String,
  pilots: Array<any>,
  films: Array<any>,
  created: String,
  edited: String,
  url: String
}

export interface ShipsResponse {
  count: any,
	next: String,
	previous: String
	results: Array<Ship>
}

export class ShipStatus {
  constructor(
  public shipsList: Array<Ship>,
  public shipResponse: ShipsResponse,
  public shipListConfig: PaginatePipeArgs){}
}
