import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Adherant } from '../ecransaisie1/adherant';
import { Produit } from '../ecransaisie1/produit';

@Component({
  selector: 'app-souscriptionpp',
  templateUrl: './souscriptionpp.component.html',
  styleUrls: ['./souscriptionpp.component.css']
})
export class SouscriptionppComponent implements OnInit {
  closeResult:string;
  adherants:Adherant[];
  produits:Produit[];
  dateOfBirth: Date;
  Statut ="Inactif";
  constructor(private modalService: NgbModal,private httpClient:HttpClient) { }
  

  ngOnInit(): void {
    this.getAdherants();
    this.getProduits();
  }
  open(contentFicheSouscription) {
    this.modalService.open(contentFicheSouscription, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  getAdherants(){
    this.httpClient.get<any>('http://localhost:8080/adherants').subscribe(
      response=>{
        //console.log(response);
        this.adherants=response;
      }
    );
  }
  getProduits(){
    this.httpClient.get<any>('http://localhost:8080/produits').subscribe(
      respons=>{
        //console.log(respons);
        //console.log("HELLEO");
        this.produits=respons;
      }
    );
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/adherantproduit/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        console.log(result);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
    
  }
}
