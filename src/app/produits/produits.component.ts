import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produit } from '../ecransaisie1/produit';
import {Categorie } from '../ecransaisie1/categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  [x: string]: any;
  closeResult:string;
  selectedProduit: Produit;
  produits:Produit[];
  produit:Produit[];
  categories:Categorie[];


  constructor(private route:ActivatedRoute,private modalService: NgbModal,private httpClient:HttpClient) { }

  ngOnInit(): void {
    console.log("HELLEO");
    //this.httpClient.get<any>('http://localhost:8080/produits').subscribe(
      //respons=>{
        //console.log(respons);
        //console.log("HELLEO");
        //this.produits=respons;
      //}
    //);
    this.getProduits();
    this.getCat();
  }
  
  getProduits(){
    this.httpClient.get<any>('http://localhost:8080/produits').subscribe(
      respons=>{
        console.log(respons);
        console.log("HELLEO");
        this.produits=respons;
      }
    );
  }
  getCat(){
    this.httpClient.get<any>('http://localhost:8080/categories').subscribe(
      response=>{
        console.log(response);
        console.log("HELLEO");
        this.categories=response;
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    const url = 'http://localhost:8080/produits/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

}
