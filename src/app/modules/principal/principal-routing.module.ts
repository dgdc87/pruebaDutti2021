import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../../guards/authentication.guard';

//Components
import { ShipsComponent } from './components/ships/ships.component';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PrincipalComponent } from './principal.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent, canActivate: [AuthenticationGuard],
  children: [
    { path: 'ships', component: ShipsComponent, canActivate: [AuthenticationGuard] },
    { path: 'pageOne', component: PageOneComponent, canActivate: [AuthenticationGuard] },
    { path: 'pageTwo', component: PageTwoComponent, canActivate: [AuthenticationGuard] },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalComponentsRoutingModule { }
