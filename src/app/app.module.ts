import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ecransaisie1Component } from './ecransaisie1/ecransaisie1.component';
import { RouterModule } from '@angular/router'; 
import {EcransaisieService} from './shared/ecransaisie.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Ecransaisie2Component } from './ecransaisie1/ecransaisie2/ecransaisie2.component';
import { Ecransaisie2ListComponent } from './ecransaisie1/ecransaisie2-list/ecransaisie2-list.component';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { DateAdapter } from '@angular/material/core';
//import { DateFormat } from './date-format';
import { DatePipe } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule} from '@angular/common/http';
import {AdherantService} from './ecransaisie1/adherant.service';
import { UpdateAdherantComponent } from './ecransaisie1/update-adherant/update-adherant.component';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { MisajAdherantComponent } from './ecransaisie1/misaj-adherant/misaj-adherant.component';
import { ModalModule } from 'ngb-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InputMaskModule} from 'primeng/inputmask';
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { ProduitsComponent } from './produits/produits.component';
import { CategoriesComponent } from './categories/categories.component';
import { SouscriptionppComponent } from './souscriptionpp/souscriptionpp.component';
import { EncaissementComponent } from './encaissement/encaissement.component';
import { DroitadhesionComponent } from './droitadhesion/droitadhesion.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { IfRolesDirective } from './directives/if-roles.directive';
import { IfRoleDirective } from './directives/if-role.directive';
import { ProfessionsComponent } from './professions/professions.component';
//import { InputMaskModule } from '@ngneat/input-mask';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Ecransaisie1Component,
    Ecransaisie2Component,
    Ecransaisie2ListComponent,
    MenuComponent,
    UpdateAdherantComponent,
    ProduitsComponent,
    CategoriesComponent,
    SouscriptionppComponent,
    EncaissementComponent,
    DroitadhesionComponent,
    UtilisateursComponent,
    IfRolesDirective,
    IfRoleDirective,
    ProfessionsComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    TextMaskModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ModalModule,
    NgbModule,
    InputMaskModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    CalendarModule
    
    //NgxMaskModule.forRoot()
  ],
  exports:[
   
  ],
  providers: [EcransaisieService ,[DatePipe],[AdherantService],],
  bootstrap: [AppComponent],
  entryComponents:[Ecransaisie2Component]
})
export class AppModule { 
  constructor(private dateAdapter:DateAdapter<Date>,public datepipe: DatePipe) {
		dateAdapter.setLocale('en-in'); // DD/MM/YYYY
	}
}
