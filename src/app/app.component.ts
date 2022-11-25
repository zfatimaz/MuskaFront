import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { FormGroup } from '@angular/forms';
import emailMask from 'text-mask-addons/dist/emailMask';

import { MisajAdherantComponent } from './ecransaisie1/misaj-adherant/misaj-adherant.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  emailMask = emailMask;
  title = 'connect';
  constructor(private dialog: MatDialog) { }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
  };
    this.dialog.open(MisajAdherantComponent, dialogConfig);
  }

  //public mask = {
    //guide: true,
    //showMask: true,
    //mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  //};
  //dateMask=[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  //public mask = {
    //guide: true,
    //showMask: true,
    //mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  //};
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  //public mask = {
    //guide: true,
    //showMask: true,
    //mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  //};
}
