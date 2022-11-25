import { Component, OnInit } from '@angular/core';
import { Adherant } from '../adherant';
import {MatDialogRef} from '@angular/material/dialog';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {AdherantService} from '../adherant.service';
import { ActivatedRoute, Router } from '@angular/router';
import {EcransaisieService} from '../../shared/ecransaisie.service';

@Component({
  selector: 'app-update-adherant',
  templateUrl: './update-adherant.component.html',
  styleUrls: ['./update-adherant.component.css']
})
export class UpdateAdherantComponent implements OnInit {
  id:number;
  adherants:Adherant[];
  [x: string]: any;
  myData: any;
  dateadhesion;
  dateeffet;
  date_effet;
  isDate = false;

  constructor(private adherantService:AdherantService,private route:ActivatedRoute,public service:EcransaisieService,private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.adherantService.getAdherantById(this.id).subscribe(data=>{
      this.adherant=data;
    },error=>console.log(error))
  }
  myModel: any;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
  onlyCaracterKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : (event.charCode >= 65 && event.charCode <=90) || (event.charCode >=97 && event.charCode <=122);
  }

  onSubmit(){
    this.adherantService.updateAdherant(this.id,this.adherant).subscribe(data=>{
      this.goToadherantList();  
    },error=>console.log(error))
  }
  goToadherantList(){
    this.router.navigate(['/ecransaisie2-list']);
  }

}
