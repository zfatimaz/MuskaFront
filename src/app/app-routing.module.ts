import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { Ecransaisie1Component } from './ecransaisie1/ecransaisie1.component';
import {Ecransaisie1Component} from './ecransaisie1/ecransaisie1.component';
import {MenuComponent} from './menu/menu.component';
import { Ecransaisie2ListComponent } from './ecransaisie1/ecransaisie2-list/ecransaisie2-list.component';

import { UpdateAdherantComponent } from './ecransaisie1/update-adherant/update-adherant.component';
import { ProduitsComponent } from './produits/produits.component';
import { CategoriesComponent } from './categories/categories.component';
import { SouscriptionppComponent } from './souscriptionpp/souscriptionpp.component';
import { EncaissementComponent } from './encaissement/encaissement.component';
import { DroitadhesionComponent } from './droitadhesion/droitadhesion.component';
import {UtilisateursComponent} from './utilisateurs/utilisateurs.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'ecransaisie1',component:Ecransaisie1Component},
  {path:'produits',component:ProduitsComponent},
  {path:'menu',component:MenuComponent},
  {path:'utilisateurs',component:UtilisateursComponent},
  {path:'ecransaisie2-list',component:Ecransaisie2ListComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'souscriptionpp',component:SouscriptionppComponent},
  {path:'encaissement',component:EncaissementComponent},
  {path:'droitadhesion',component:DroitadhesionComponent},
  {path:'update-adherant/:id',component:UpdateAdherantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
