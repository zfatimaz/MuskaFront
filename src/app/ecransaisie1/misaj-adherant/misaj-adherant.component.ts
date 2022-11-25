import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Adherant } from '../adherant';
import { ModalManager, ModalModule } from 'ngb-modal';


@Component({
  selector: 'app-misaj-adherant',
  templateUrl: './misaj-adherant.component.html',
  styleUrls: ['./misaj-adherant.component.css']
})
export class MisajAdherantComponent implements OnInit {
    form: FormGroup;
    nom:string;

  constructor(private dialogRef: MatDialogRef<MisajAdherantComponent>,private modalService: ModalManager) { 
        }
  ngOnInit(): void {
  }
  openDetails(targetModal, adherant: Adherant) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    //document.getElementById('fnom').setAttribute('value', adherant.nom_adherant);
    //document.getElementById('fprenom').setAttribute('value', adherant.prenom_adherant);
 }
}

