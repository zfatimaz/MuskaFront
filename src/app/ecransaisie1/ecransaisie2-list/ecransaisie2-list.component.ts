import { Component, OnInit, Sanitizer } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {EcransaisieService} from '../../shared/ecransaisie.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { Ecransaisie1Component } from '../ecransaisie1.component';
import { Ecransaisie2Component } from '../ecransaisie2/ecransaisie2.component';
import { Adherant } from '../adherant';
import {AdherantService} from '../adherant.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import 'jspdf-autotable';
import {InputTextModule} from 'primeng/inputtext';
import * as XLSX from 'xlsx';
//import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule,ModalManager} from 'ngb-modal';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MisajAdherantComponent } from '../misaj-adherant/misaj-adherant.component';
import { DatePipe } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {PrintService} from '../../shared/print.service';
import {Report} from '../report';
import {StringResult} from '../StringResult';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

//import autoTable, { autoTable, RowInput } from 'jspdf-autotable';
//import 'jspdf-autotable';
//import 'jspdf-autotable'
//import 'jspdf-autotable'


@Component({
  selector: 'app-ecransaisie2-list',
  templateUrl: './ecransaisie2-list.component.html',
  styleUrls: ['./ecransaisie2-list.component.css']
})


export class Ecransaisie2ListComponent implements OnInit {

  public mask="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$";
//public mask=[/[a-z]/,/[a-z]/,/[a-z]/, '@',  /[a-z]/, '.', /[a-z]/ ];
//public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  UntrustedUrl: string;
  GenuineUrl: SafeUrl;
  //registerForm!: FormGroup
  //submitted=false;

  report:Report=new Report();
  reportName:StringResult=new StringResult();
  adherants:Adherant[];
  closeResult:string;
  editForm:FormGroup;
  dateinscription;
  someFormattedDate:string;
  private baseURL="http://localhost:8080/api/v1/Adherent";
  title = 'modal2';
  
  [x: string]: any;
  displayedColumns: string[] = ['Nom', 'Prenom','Fonction','Adresse','Telephone','Sexe','Adhesion','PriseEffet','DateFin','Service','MontantSouscription'];
  listData:MatTableDataSource<any>
  //adherants:Adherant[];
  selectedAdherant: Adherant;
  selectedAdherants: Adherant[];
  array = [];
  displayEdit = false;
  id:number;
  adherant:Adherant[];
  loading: boolean = true;
  constructor(private route:ActivatedRoute,private dialog:MatDialog,private adherantService:AdherantService,public service:EcransaisieService,private router:Router,private modalService: NgbModal,private modalService1: NgbModal,public datepipe: DatePipe,private fb:FormBuilder,private httpClient:HttpClient,
    private sanitizer:DomSanitizer) { 
    //this.UntrustedUrl="C:/reports/{{reportName.name}}";
    //this.GenuineUrl=this.sanitizer.bypassSecurityTrustUrl(this.UntrustedUrl);
    //this.GenuineUrl=this.sanitizer.bypassSecurityTrustUrl(this.GenuineUrl);
  }
  jsPDF: any;
  exportColumns: any[];
  cols: any[];
  
  formatsDateTest: string[] = [
    'dd/MM/yyyy'
    ];
  ngOnInit(): void {
    //let todaydate = new Date();
    //let day = todaydate.getDate();
    //let month = todaydate.getMonth() + 1;
    //let year = todaydate.getFullYear();
    //let datestring = day + "/" + month + "/" + year;
    //document.getElementById('datinscript').setAttribute('value', datestring);
    this.getAdherants();
    
    /*this.id=this.route.snapshot.params['id'];
    this.adherantService.getAdherantById(this.id).subscribe(data=>{
    },error=>console.log(error))
*/
    //this.getAdherants();
    //this.registerForm=this.fb.group({
      //nom:['',Validators.required]
    //})
    /*
    this.editForm = this.fb.group({
      id:[''],
      nom: [''],
      prenom: [''],
      datnaiss: [''],
      datinscript:[''],
      lieunaiss: [''],
      sexe: [''],
      nompere: [''],
      nommere: [''],
      residence: [''],
      sectvill: [''],
      profession: [''],
      sitmatri: [''],
      telephone: [''],
      email: [''],
      numreseau: [''],
      bp: [''],
      persprev: [''],
      numpersprev: [''],
      emailpersprev: ['']
    } );*/
    
  }
  getChange(event) {
    /*let convertdaef=new Date();
    let dd = convertdaef.getDate();
    let mm = convertdaef.getMonth();
    let y = convertdaef.getFullYear();
    
    let someFormattedDate = dd + '/' + mm + '/' + y;
    this.dateinscription=someFormattedDate;*/
    var todaydate = new Date();
    var day = todaydate.getDate();
    var month = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = day + "/" + month + "/" + year;
    window.onload = function(){
    //document.getElementById("datinscript").value = datestring;
    document.getElementById('datinscript').setAttribute('value', datestring);
    
    }  

  }

getAdherants(){
    this.httpClient.get<any>('http://localhost:8080/adherants').subscribe(
      response=>{
        console.log(response);
        this.adherants=response;
      }
    );
  }

  open(content) {
    this.modalService.open(content,{backdrop: 'static', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onSubmit(f: NgForm) {
    /*this.submitted=true
    if(this.registerForm.invalid){
      return
    }*/

    const url = 'http://localhost:8080/adherants/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

exportExcel() {
  import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.adherants);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "products");
        });
}

  //private getAdherants():void{
    //this.adherantService.getAdherantList().subscribe(data=>{
      //console.log(data);
      //this.adherants=data;
    //});
  //}

  

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}
  
  onCreate(){
    const dialogConfig=new MatDialogConfig();
    //dialogConfig
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    dialogConfig.height="100%";
    this.dialog.open(Ecransaisie2Component,dialogConfig);
  }
  onModify(){
    const dialogConfigg=new MatDialogConfig();
    dialogConfigg.disableClose=true;
    dialogConfigg.autoFocus=true;
    dialogConfigg.data={

    }
    dialogConfigg.width="50%";
    this.dialog.open(MisajAdherantComponent,dialogConfigg);
  }

  openForm(targetModal){
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }
  openDetails(targetModal, adherants: Adherant) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('nom').setAttribute('value', adherants.nom);
    document.getElementById('prenom').setAttribute('value', adherants.prenom);
    document.getElementById('datnaiss').setAttribute('value',adherants.datnaiss);
    document.getElementById('datinscript').setAttribute('value',adherants.datinscript);
    document.getElementById('lieunaiss').setAttribute('value',adherants.lieunaiss);
    document.getElementById('nompere').setAttribute('value',adherants.nompere);
    document.getElementById('nommere').setAttribute('value',adherants.nommere);
    document.getElementById('sexe').setAttribute('value',adherants.sexe);
    document.getElementById('residence').setAttribute('value',adherants.residence);
    document.getElementById('sectvill').setAttribute('value',adherants.sectvill);
    document.getElementById('profession').setAttribute('value',adherants.profession);
    document.getElementById('sitmatri').setAttribute('value',adherants.sitmatri);
    document.getElementById('telephone').setAttribute('value',adherants.telephone);
    document.getElementById('email').setAttribute('value',adherants.email);
    document.getElementById('numreseau').setAttribute('value',adherants.numreseau);
    document.getElementById('bp').setAttribute('value',adherants.bp);
    document.getElementById('persprev').setAttribute('value',adherants.persprev);
    document.getElementById('numpersprev').setAttribute('value',adherants.numpersprev);
    document.getElementById('emailpersprev').setAttribute('value',adherants.emailpersprev);
    
 }
 /*onSubmit(){
  this.adherantService.updateAdherant(this.id,this.adherant).subscribe(data=>{
    this.goToadherantList();  
  },error=>console.log(error))
}*/


openEdit(targetModal, adherants: Adherant) {
  this.modalService1.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
  this.editForm.setValue( { 
    id:adherants.id,
    nom: adherants.nom,
    prenom: adherants.prenom,
    datnaiss: adherants.datnaiss,
    datinscript: adherants.datinscript,
    lieunaiss: adherants.lieunaiss,
    sexe:adherants.sexe,
    nompere:adherants.nompere,
    nommere:adherants.nommere,
    residence:adherants.residence,
    sectvill:adherants.sectvill,
    profession:adherants.profession,
    sitmatri:adherants.sitmatri,
    email:adherants.email,
    numreseau:adherants.numreseau,
    bp:adherants.bp,
    persprev:adherants.persprev,
    numpersprev:adherants.numpersprev,
    emailpersprev:adherants.emailpersprev,
    telephone:adherants.telephone
    
  });
  
}



onSave() {
  const editURL = 'http://localhost:8080/adherants/' + this.editForm.value.id + '/edit';
  console.log(this.editForm.value.id);
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

fetchPDF(): any {
  const path = 'E/report/recu.pdf';
  return path;
}
openPDF() {
  window.open(this.fetchPDF(), '_blank');
}

printInvoice(id:number) {
  const httpOptions = {
    responseType: 'arraybuffer' as 'json'
    // 'responseType'  : 'blob' as 'json'        //This also worked
  };
  
  return this.httpClient.get<any>('http://localhost:8080/adherants/print/' + id, httpOptions);
   }
printAdherant(adherants: Adherant){
  this.printInvoice(Number(this.editForm.value.id)).subscribe((response) => {

    const file = new Blob([response], { type: 'application/pdf' });
    const fileURL = window.URL.createObjectURL(file);
    console.log(fileURL);
    window.open(fileURL,'_blank');
  });
}


goToadherantList(){
  this.router.navigate(['/ecransaisie2-list']);
}
  onEdit(row){
    //this.displayEdit = !this.displayEdit ;
    this.service.populateForm(row);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    this.dialog.open(Ecransaisie2Component,dialogConfig);
  }
  updateAdherant(id:number){
    this.router.navigate(['update-adherant',id]);
  }
  
  
  /*public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };*/
  /*impriRecu(){
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.httpClient.get<any>('http://localhost:8080/adherants/report',httpOptions);
  }*/
  /*imprimerRecu(){
    
    
     
    

    this.impriRecu.subscribe((response)=> {
      //const file = new Blob([response], { type: 'application/pdf' });
      //const fileURL = URL.createObjectURL(file);
      //window.open(fileURL);

       let file =new Blob([response],{type:'application/pdf'});
       var fileURL=URL.createObjectURL(file);
       window.open(fileURL);
       this.toast.success('Edition faite avec Succès');
    });
  } */

  

  impriRecu(id:number) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
 
    };
    return this.httpClient.get<any>('http://localhost:8080/adherants/report/'+id,httpOptions);
    }
    imprimerRecu(){
      console.log(this.editForm.value.id);
    this.impriRecu(Number(this.editForm.value.id)).subscribe((response) => {
     
      //let file =new Blob([response],{type:'application/pdf'});
       //var fileURL=URL.createObjectURL(file);
       //window.open(fileURL);
       /*let file = new Blob([response.byteString], { type: 'application/pdf' });            
       var fileURL = URL.createObjectURL(file);
       window.open(fileURL);*/
       
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      console.log(fileURL);
      window.open(fileURL,'_blank');
    });
    
  }
  openPrint(adherants: Adherant) {
    this.editForm.setValue( { 
      id:adherants.id,
      nom: adherants.nom,
      prenom: adherants.prenom,
      datnaiss: adherants.datnaiss,
      datinscript: adherants.datinscript,
      lieunaiss: adherants.lieunaiss,
      sexe:adherants.sexe,
      nompere:adherants.nompere,
      nommere:adherants.nommere,
      residence:adherants.residence,
      sectvill:adherants.sectvill,
      profession:adherants.profession,
      sitmatri:adherants.sitmatri,
      email:adherants.email,
      numreseau:adherants.numreseau,
      bp:adherants.bp,
      persprev:adherants.persprev,
      numpersprev:adherants.numpersprev,
      emailpersprev:adherants.emailpersprev,
      telephone:adherants.telephone
    });
    
    console.log(this.editForm.value.id);
    this.impriRecu(this.editForm.value.id).subscribe((response) => {
     
      //let file =new Blob([response],{type:'application/pdf'});
       //var fileURL=URL.createObjectURL(file);
       //window.open(fileURL);
       /*let file = new Blob([response.byteString], { type: 'application/pdf' });            
       var fileURL = URL.createObjectURL(file);
       window.open(fileURL);*/
       
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      console.log(fileURL);
      window.open(fileURL,'_blank');
    });
  }

  clickEvent(){
    this.AdherantService.getPDF().subscribe((response)=>{
  
    let file = new Blob([response], { type: 'application/pdf' });            
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  })
}
printAdherants(){
  this.report.name='recu';
  this.adherantService.printAdherant(this.report).subscribe(
    result=>{
      this.reportName=result;
      
    }
  );
}
  
}


