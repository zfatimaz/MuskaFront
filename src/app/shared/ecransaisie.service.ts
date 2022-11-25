import { Injectable } from '@angular/core';
import {FormGroup,FormControl} from "@angular/forms";
import * as _ from 'lodash';
import { Ecransaisie2Component } from '../ecransaisie1/ecransaisie2/ecransaisie2.component';


@Injectable({
  providedIn: 'root'
})
export class EcransaisieService {
  

  constructor() { }
    form: FormGroup =new FormGroup({
    $key:new FormControl(null),
    Nom:new FormControl(''),
    Prenom:new FormControl(''),
    Fonction:new FormControl(''),
    Adresse:new FormControl(''),
    Telephone:new FormControl(''),
    Sexe:new FormControl('1'),
    Adhesion:new FormControl(''),
    PriseEffet:new FormControl(''),
    DateFin:new FormControl(''),
    ServiceSouscrit:new FormControl(''),
    MontantSouscription:new FormControl('')

  }); 

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      Nom:'',
      Prenom:'',
      Fonction:'',
      Adresse:'',
      Telephone:'',
      Adhesion:'',
      PriseEffet:'',
      DateFin:'',
      ServiceSouscrit:'',
      MontantSouscription:'',
      Sexe:''
    });
  }
  populateForm(aderant){
    this.form.setValue(_.omit(aderant,'Nom'));
    //this.form.patchValue(Ecransaisie2Component);
    //this.form.patchValue({
      //$key:null,
      //Nom: 'adherant.nom_adherant',
      //Prenom: 'adherant.prenom_adherant'
    //});
  }
  
}

