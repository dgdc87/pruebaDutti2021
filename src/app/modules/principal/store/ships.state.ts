import { Injectable } from '@angular/core';
import { State, Action, Selector } from '@ngxs/store';
import { ShipStatus, ShipsResponse } from '@models/ships.model';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import {
  SetShipListConfig,
  SetShipListPage,
  SetShipResponse
} from './ships.actions';


@State<Array<any>>({
  name: 'shipsList',
  defaults: []
})
@Injectable()
export class ShipsState extends ShipStatus{
  @Selector()
  static getState(state: ShipStatus): ShipStatus{
    return state || new ShipStatus([], null, null);
  }

  @Action(SetShipResponse)
  setShipResponse({getState, setState }, { shipsResponse }: SetShipResponse){
    const state: ShipStatus = getState() || new ShipStatus([], null, null);
    //El servicio nos devuelve el total de elementos => se lo pasamos a la configuración del listado que se muestra en pantalla
    const shipListConfig : PaginatePipeArgs = {
      itemsPerPage: state.shipListConfig.itemsPerPage,
      currentPage: state.shipListConfig.currentPage,
      totalItems: state.shipsList.length + shipsResponse.results.length
    };
    //Obtengo y muestro las naves de la respuesta
    setState(new ShipStatus([...state.shipsList, ...shipsResponse.results], shipsResponse, shipListConfig));
  }

  @Action(SetShipListConfig)
  setShipListConfig({getState, setState }, { shipListConfig }: SetShipListConfig){
    const state: ShipStatus = getState() || new ShipStatus([], null, null);
    //Se guarda en el estado la configuración de la lista
    setState(new ShipStatus(state.shipsList, state.shipResponse, shipListConfig));
  }


  //Se actualiza en el store la página que se está visualizando.
  @Action(SetShipListPage)
  setShipListPage({getState, setState }, { page } : SetShipListPage){
    const state: ShipStatus = getState() || new ShipStatus([], null, null);
    const shipListConfig: PaginatePipeArgs = {
      itemsPerPage: state.shipListConfig.itemsPerPage,
      currentPage: page,
      totalItems: state.shipsList.length
    };
    setState(new ShipStatus(state.shipsList, state.shipResponse, shipListConfig));
  }


  private auxGetActualPage = (shipsResponse: ShipsResponse) : number => {
    if(shipsResponse.next) return parseInt(shipsResponse.next.substring(shipsResponse.next.indexOf('?page='), shipsResponse.next.length-1))-1;
    if(shipsResponse.previous) return parseInt(shipsResponse.previous.substring(shipsResponse.previous.indexOf('?page='), shipsResponse.previous.length-1))+1;
    return 1;
  }
}
