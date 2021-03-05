import { Component, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShipsState } from '../../store/ships.state';
import { SetShipResponse } from '@modules/principal/store/ships.actions';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  @Select(ShipsState) shipState$: Observable<ShipsState>;

  public dataList: any = [];
  private pagesRquested: Array<any> = [];

  constructor(
    private store: Store,
    private shipsService: ShipsService
  ){}

  ngOnInit(): void {
    this.shipState$.subscribe((shipState: ShipsState) =>{
      //Si es la primera carga no dispondremos de datos en el listado de naves
      if(shipState && shipState.shipsList.length === 0){
        this.getShipsForPage(1);
      }
      //Comprobamos si debemos lanzar una nueva petición para recuperar más datos (se evalua la página en la que estamos y los datos que mostramos, si ya no quedan páginas que ver y
      // hay disponibles más páginas lanzamos la petición)
      if( shipState && shipState.shipListConfig && shipState.shipResponse &&
        (parseInt(shipState.shipListConfig.currentPage.toString()) * parseInt(shipState.shipListConfig.itemsPerPage.toString())) >= parseInt(shipState.shipListConfig.totalItems.toString()) && shipState.shipResponse.next){
        this.getShipsForPage(parseInt(shipState.shipResponse.next.substring(shipState.shipResponse.next.indexOf('?page=')+6, shipState.shipResponse.next.length)));
      }
    });
  }

  getShipsForPage = (page: number): void => {
    if(this.pagesRquested.indexOf(page)>=0) return;
    this.pagesRquested.push(page);
    this.shipsService.getShips(page).subscribe((shipsResponse) => {
      this.store.dispatch(new SetShipResponse(shipsResponse));
    })
  }
}
