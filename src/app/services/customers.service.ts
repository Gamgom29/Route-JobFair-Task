import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService  {

  constructor(private _HttpClient:HttpClient) { }


  getCustomers():Observable<any>{
    return this._HttpClient.get('./assets/jsons/db.json');
  }

}
