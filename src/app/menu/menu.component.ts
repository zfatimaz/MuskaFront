import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../service/AuthService';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentUser = this.userService.currentUser;
  closeResult:string;

  constructor(private modalService: NgbModal,private router: Router,private userService: AuthService) { }

  ngOnInit(): void {
  }
  setUser() {
    this.userService.setUser(this.currentUser);
  }
  Afficher_Inscription=function(event){
    this.router.navigateByUrl("/ecransaisie1");
    //this.router.navigateByUrl("/ecransaisie2-list");
  }
  Afficher_Produits=function(event){
    this.router.navigateByUrl("/produits");
  }
  AfficherCategories=function(event){
    this.router.navigateByUrl("/categories");
  }
  AfficherSouscriptionpp=function(event){
    this.router.navigateByUrl("/souscriptionpp");
  }

  AfficherEncaissementAdhesion=function(event){
     this.router.navigateByUrl("/encaissement");
  }
  AfficherDroitAdhesion=function(event){
    this.router.navigateByUrl("/droitadhesion");
 }
 AfficherUtilisateurs=function(event){
  this.router.navigateByUrl("/utilisateurs");
}
AfficherProfessions=function($event){
  this.router.navigateByUrl("/utilisateurs");
}

  open(staticBackdrop) {
    this.modalService.open(staticBackdrop, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
/*
  onCreateModal(): void {
    const modalRef = this.modalService.open(MyModalComponent, { title: 'My dynamic title', message: 'My dynamic message' });

    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => console.log('completed')
    );
  }*/

}
