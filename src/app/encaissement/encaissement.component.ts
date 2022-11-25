import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Adherant } from '../ecransaisie1/adherant';
import { Droitadhesion } from '../ecransaisie1/droitadhesion';
import { Encaissement } from '../ecransaisie1/encaissement';

@Component({
  selector: 'app-encaissement',
  templateUrl: './encaissement.component.html',
  styleUrls: ['./encaissement.component.css']
})
export class EncaissementComponent implements OnInit {

  select = 'Espèces';

  onChangeGoods(optionsValue: any) {}

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2
      ? c1.sortBy === c2.sortBy && c1.sortOrder === c2.sortOrder
      : c1 === c2;
  }

  ngSelect  = 'Espèces';
  [x: string]: any;
  adherantData: any = {};
  closeResult:string;
  adherans:Adherant[];

  encaissements:Encaissement[];
  droitadhesion:Droitadhesion[];
  codeAdherant: string | String;
  idAdher:string;
  idAdhere:number;
  idEncaissement:number;
  //editForm:FormGroup;
  invoiceIds: string[];

  nomUtil: string;
  prenomUtil:string;
  datnaissUtil:string;
  telephoneUtil:string;
  montantUtil:string;
  f: FormGroup;
  constructor(private modalService: NgbModal,private httpClient:HttpClient,private fb:FormBuilder,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAdherants();
    this.getDroitadhesion();
    this.getEncaissement();


    this.f = this.fb.group({
      nom:['nom'],
      prenom:['prenom'],
      datnaiss:['datnaiss']
    } );
    
  }

  open(content: any) {
    this.modalService.open(content,{backdrop: 'static'}).result.then((result) => {
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

  getEncaissement(){
    this.httpClient.get<any>('http://localhost:8080/encaissement').subscribe(
      resp=>{
        //console.log(resp);
        this.encaissements=resp;
      }
    );
  }
  //procedure qui recupère la liste des adherants pour le paiement des droits
  //d'adhesion
  getAdherants(){
    this.httpClient.get<any>('http://localhost:8080/adherants').subscribe(
      response=>{
        //console.log(response);
        this.adherans=response;
      }
    );
  }

  getDroitadhesion(){
    this.httpClient.get<any>('http://localhost:8080/droitadhesion').subscribe(
      respons=>{
        //console.log(response);
        this.droitadhesion=respons;
      }
    );
  }
  //cette procedure permet d'extraire le id contenu dans le code de
  // de l'adherant. cet id sera utilisé pour mettre à jour le statut
  //de l'adherant à payé apres encaissement
  getChange(event: any){
    let codAdherant=new String(event);
    this.codeAdherant=codAdherant;
    this.idAdher=this.codeAdherant.substr(8,this.codeAdherant.length);
    this.idAdhere=parseInt(this.idAdher);

    //document.getElementById('nom').setAttribute('value', 'hghg');

    /*this.httpClient.get<any>('http://localhost:8080/adherants').subscribe(
      response=>{
        //console.log(response);
        this.adherans=response;
      }
    );*/

    /*const arr:any=this.getAdherants();
    var myArray:any =this.getAdherants();
    var newArray=myArray?.filter(function(element){
        return element.id==this.idAdhere;
    });*/
    let result = this.adherans.find(item => item.id === this.idAdhere);
    this.nomUtil=result.nom;
    this.prenomUtil=result.prenom;
    this.datnaissUtil=result.datnaiss;
    this.telephoneUtil=result.telephone;
    //document.getElementById('nom').ariaValueText=result.nom.toString();

    //document.getElementById('nom').setAttribute('ngValue', result.nom.toString());
    //document.getElementById('prenom').setAttribute('ngValue', result.prenom.toString());
    
    //var result = myArray?.find(item => item.code === this.codeAdherant);
    //result.nom='';
    /*const first = arr?.find((obj) => {
      return obj.code === 'MF111111101';
    });*/
    console.log(result);
    console.log(result.prenom);
    console.log(result.datnaiss);
    //let adheran of this.adherans;
    //if (this.adherans.values.arguments ===) {

    //}
    //console.log(this.idAdher)
  }
  getChangeNom(event){
    let nomUtilisateur=new String(event);
    //this.nomUtil=nomUtilisateur;
  }
  getChangePrenom(event){
    let prenomUtilisateur=new String(event);
    //this.prenomUtil=prenomUtilisateur;
  }

  onSubmit(f: NgForm) {
    
    //this.f.patchValue({nom:this.nomUtil,prenom:this.prenomUtil});
    const url = 'http://localhost:8080/encaissement/addnew';

    /*this.httpClient
      .post(url, f.value)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });*/
      console.log(f.value);
    this.httpClient.post<any>(url, f.value)
      .subscribe((result) => {
        //console.log(result);
        this.ngOnInit(); //reload the table
      //console.log(result.id);
      //console.log(result["ops"][0]["_id"]);
      this.idEncaissement=result.id;
      //console.log(this.idEncaissement);
      this.printRecuAdhesion();
      });
      
    this.modalService.dismissAll(); //dismiss the modal
    this.miseAjourStatutAdhesion();
    this.initialiserEncaissement();
    
  }
  initialiserEncaissement(){
    this.nomUtil="";
    this.prenomUtil="";
    this.datnaissUtil="";
    this.telephoneUtil="";
    this.montantUtil="";
  }
  miseAjourStatutAdhesion() {
    const editURL = 'http://localhost:8080/adherants/' + this.idAdhere;
    //console.log(this.codeAdherant);
    this.httpClient.put(editURL,this.adherantData)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
  impriRecu(id:number) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
 
      };
    return this.httpClient.get<any>('http://localhost:8080/encaissement/report/'+id,httpOptions);
    }
  printRecuAdhesion() {
    //console.log(this.idEncaissement);
    this.impriRecu(this.idEncaissement).subscribe((response) => { 
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      console.log(fileURL);
      window.open(fileURL,'_blank');
    });
  }



}
