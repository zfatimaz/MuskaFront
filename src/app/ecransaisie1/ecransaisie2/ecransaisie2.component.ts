import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {EcransaisieService} from '../../shared/ecransaisie.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogRef} from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Adherant } from '../adherant';
import { AdherantService } from '../adherant.service';
import { Router } from '@angular/router';
import { ModalManager, ModalModule } from 'ngb-modal';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ecransaisie2',
  templateUrl: './ecransaisie2.component.html',
  styleUrls: ['./ecransaisie2.component.css']
})
export class Ecransaisie2Component implements OnInit {
  adherants:Adherant[];
  closeResult:string;

  dateadhesion;
  dateeffet;
  date_effet;
  isDate = false;
  constructor(private modalService:NgbModal,private httpClient:HttpClient,public service:EcransaisieService,
              public dialogRef:MatDialogRef<Ecransaisie2Component>,private adherantService:AdherantService,private router:Router) { }

  ngOnInit(): void {
    this.getAdherants();
  }
  getAdherants(){
    this.httpClient.get<any>('http://localhost:8080/adherants').subscribe(
      response=>{
        console.log(response);
        this.adherants=response;
      }
    );
  }
  /*saveAdherant(){
    this.adherantService.createAdherant(this.adherant).subscribe(data=>{
      console.log(data);
      this.goToadherantList();
      this.OnClear();
      this.dialogRef.close();
    },
    error=>console.log(error));
    
  }*/
  goToadherantList(){
    //this.router.navigate(['/ecransaisie2-list']);
    //this.router.navigate(['/ecransaisie1']);
  }
  onClose(){
    this.dialogRef.close();
  }
  getChange(event) {
    let convertdateffet=new Date(event);
    let convertdaef=new Date(convertdateffet);
    convertdaef.setMonth(convertdaef.getMonth() + 4);
    
    let dd = convertdaef.getDate()-1;
    let mm = convertdaef.getMonth() + 1;
    let y = convertdaef.getFullYear();
    let someFormattedDate = dd + '/' + mm + '/' + y;
    this.dateeffet=someFormattedDate;
    
    ///this.isDate = true;
    //this.adherant.date_prise_effet=moment(someFormattedDate,'DD/MM/YYYY').toDate();
   //this.adherant.date_prise_effet=this.dateeffet;
   

  }
  myModel: any;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  
        //cette fonction permet de saisir uniquement des chiffres au niveau
        //champ montant de la souscription
      onlyNumberKey(event) {
          return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
      }
//&H20
      onlyCaracterKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : (event.charCode >= 65 && event.charCode <=90) || (event.charCode >=97 && event.charCode <=122);
    }
    onlyCaracterKeyFonction(event) {
      return (event.charCode == 8 || event.charCode == 0) ? null : (event.charCode >= 65 && event.charCode <=90) || (event.charCode >=97 && event.charCode <=122)||(event.charCode == 45)||(event.charCode == 32);
  }

    onlyCaracterKeyP(event) {
      return (event.charCode == 8) ? null : (event.charCode >= 65 && event.charCode <=90) || (event.charCode >=97 && event.charCode <=122) ||(event.charCode == 32);
  }

    onSubmit(){
      //console.log(this.adherant);
      //this.saveAdherant();
    }
    OnClear(){
      this.service.form.reset();
      this.service.initializeFormGroup();
    }
}
