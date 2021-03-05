import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShipsState } from '../../../store/ships.state';
import { SetShipListConfig, SetShipListPage } from '@modules/principal/store/ships.actions';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';

declare var $: any;


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnInit {

  shipList: Array<any> = [];
  @Select(ShipsState) shipState$: Observable<ShipsState>;

  config: PaginatePipeArgs;
  shipId: string = '';
  url: string = '';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starship_class: string = '';

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    };
    this.shipState$.subscribe( (shipState: ShipsState) =>{
      if(!shipState){
        this.store.dispatch( new SetShipListConfig(this.config));
      }else{
        this.shipList = shipState.shipsList;
      }

      if(!shipState || !shipState.shipListConfig){
        this.store.dispatch( new SetShipListConfig(this.config));
      }else{
        this.config = shipState.shipListConfig;
      }
    });
  }

  getStarshipId(url) {
    this.shipId = url.slice(url.length-2, -1)
    const urlImage = `https://starwars-visualguide.com/assets/img/starships/${this.shipId}.jpg`
    return urlImage;
  }

  pageChanged(event){
    this.store.dispatch( new SetShipListPage(event));
  }

  openDetails(details) {
    $("#exampleModal").modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class
  }

}
