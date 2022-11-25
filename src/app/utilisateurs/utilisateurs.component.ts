import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from '../ecransaisie1/roles';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  nomUtil;
  prenomUtil;
  datecreationUtil;
  motDepasseUtil;
  nomutilisateurUtil;
  selectedItemsList = [];
  rolesselected:any=[];
  roles:Roles[];
  closeResult:string;
  selectedValues: string[] = ['val1','val2'];
  //
  

  options = ['OptionA', 'OptionB', 'OptionC'];
  optionsMap = {
        OptionA: false,
        OptionB: false,
        OptionC: false,
};
optionsChecked = [];
order: any;
selectedCities = {};
f: FormGroup;
  constructor(private modalService: NgbModal,private httpClient:HttpClient,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getRoles();

    this.f = this.fb.group({
      roles:[''],
      nom:['nom'],
      prenom:['prenom'],
      datecreation:['datecreation'],
      motdepasse:['motdepasse'],
      nomutilisateur:['nomutilisateur']
    } );
    //this.fetchSelectedItems();
    //document.getElementById('datinscript').set
  }

  

  initOptionsMap() {
    for (var x = 0; x<this.order.options.length; x++) {
        this.optionsMap[this.options[x]] = true;
    }
  }

  updateCheckedOptions(option, event) {
    this.optionsMap[option] = event.target.checked;
 }

 updateOptions() {
  for(var x in this.optionsMap) {
      if(this.optionsMap[x]) {
          this.optionsChecked.push(x);
      }
  }
  this.options = this.optionsChecked;
  this.optionsChecked = [];
}

onCheckboxChange(option, event) {
  if(event.target.checked) {
    this.rolesselected.push(option.id);
  } else {
  for(var i=0 ; i < this.roles.length; i++) {
    if(this.rolesselected[i] == option.id) {
      this.rolesselected.splice(i,1);
   }
 }
}
console.log(this.rolesselected);
}

  onchange(event){
    
    //return this.roles.filter(opt => opt.isselected).map(opt => opt.libelle)
    //console.log(this.roles.filter(opt => opt.isselected).map(opt => opt.libelle));

    let index=this.rolesselected.indexOf(event.target.value);
    if(index==-1){
      this.rolesselected.push(event.target.value);
    }else{
      this.rolesselected.splice(index,1);
    }
    console.log(this.rolesselected);
    return this.rolesselected;
    
  }



  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.roles.filter((value, index) => {
      return value.isselected;
      console.log(this.selectedItemsList);
    });
  }

  


  open(formUtilisateur) {
    this.modalService.open(formUtilisateur, {backdrop: 'static'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    //console.log(this.selectedValues);
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
  getRoles(){
    this.httpClient.get<any>('http://localhost:8080/roles').subscribe(
      response=>{
        console.log(response);
        this.roles=response;
      }
    );
  }

  
  getChange(event){
    let nomUtilisateur=new String(event);
    this.nomUtil=nomUtilisateur;
  }
  getChangeP(event){
    let prenomUtilisateur=new String(event);
    this.prenomUtil=prenomUtilisateur;
  }
  getChangeD(event){
    let datecreationUtilisateur=new String(event);
    this.datecreationUtil=datecreationUtilisateur;
  }
  
  getChangeM(event){
    let motdePasseUtilisateur=new String(event);
    this.motDepasseUtil=motdePasseUtilisateur;
  }

  getChangeLogin(event){
    let nomutilisateurUtilisateur=new String(event);
    this.nomutilisateurUtil=nomutilisateurUtilisateur;
  }
  onSubmit() {

    /*this.editForm.setValue( { 
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
      
    });*/
    
     // console.log(this.selectedCities);
      const array = Object.keys(this.selectedCities).filter((key)=> {return this.selectedCities[key]});
      const arrays=array.toString()
      //console.log(arrays);
      //f.patchValue
      this.f.patchValue({roles:arrays,nom:this.nomUtil,prenom:this.prenomUtil,nomutilisateur:this.nomUtil,datecreation:this.datecreationUtil,motdepasse:this.motDepasseUtil});
      //this.f.patchValue({roles:arrays,nom:'$nom',prenom:'',motdepasse:'',datecreation:''});
      //f.patchValue({roles:arrays,});
      
      //f.control.get.
      //f.get("roles").setValue(arrays.toString);
    const url = 'http://localhost:8080/utilisateurs/addnew';
    this.httpClient.post(url, this.f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }




  
}
