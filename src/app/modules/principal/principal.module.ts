import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponentsRoutingModule } from './principal-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
// Components
import { ShipsComponent } from './components/ships/ships.component';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { ShipsDetailsComponent } from './components/ships/ships-details/ships-details.component';
import { PrincipalComponent } from './principal.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    ShipsComponent,
    ShipsDetailsComponent,
    PageOneComponent,
    PageTwoComponent
  ],
  imports: [
    CommonModule,
    PrincipalComponentsRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  exports: [
    ShipsComponent,
    ShipsDetailsComponent,
    PageOneComponent,
    PageTwoComponent
  ],
})
export class PrincipalModule { }
