import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private httpClient:HttpClient) { }
  printInvoice(id): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    
    return this.httpClient.get<any>('http://localhost:8080/adherants/' + '/print/' + id, httpOptions);
     }
}
