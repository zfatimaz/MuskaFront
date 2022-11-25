import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adherant } from './adherant';
import * as _ from 'lodash';
import { StringResult } from './StringResult';
import { Report } from './report';

@Injectable({
  providedIn: 'root'
})
export class AdherantService {
  array = [];
  //private baseURL="http://localhost:8080/api/v1/Adherent";
  private baseURL="http://localhost:8080";

  constructor(private httpClient:HttpClient) { }
  getProductsSmall() {
    return this.httpClient.get<any>("http://localhost:8080/api/v1/Adherent")
    .toPromise()
    .then(res => <Adherant[]>res.data)
    .then(data => { return data; });
  
}
  getAdherantList():Observable<Adherant[]>{
    return this.httpClient.get<Adherant[]>(`${this.baseURL}`);
  }
  createAdherant(adherant:Adherant):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,adherant);
  }
  getAdherantById(id:number):Observable<Adherant>{
    return this.httpClient.get<Adherant>(`${this.baseURL}/${id}`);
  }

  updateAdherant(id:number,adherant:Adherant):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,adherant);
  }

  imprimerRecut(){
    
    //<any>('http://localhost:8080/adherants').subscribe
    return this.httpClient.get(`${this.baseURL}/adherants/report`);
    //return this.httpClient.get<any>('http://localhost:8080/adherants/report');
  }


  getPDF(){
    const url = `${this.baseURL}/adherants/report`;
    
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
       //'responseType'  : 'blob' as 'json'        //This also worked
    };
    
    return this.httpClient.get<any>(url, httpOptions);
    
    }

    public printAdherant=(report:Report):Observable<StringResult>=> {
        const data=JSON.stringify(report);
        const urlSend=this.baseURL+'/adherants/printAdherant';
        return this.httpClient.post<StringResult>(urlSend,data,{
          headers:new HttpHeaders({
            'Content-type':'application/json'
          })
        });
    }
}
