import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembreFederationService {

  constructor(private http:HttpClient) { }

  getallmembrefederation(){
    return this.http.get(`${environment.baseurl}/mequipe/all`)
  }
  deletemembrefeder(id:any){
    return this.http.delete(`${environment.baseurl}/mequipe/delete/${id}`)

  }
  getonemembrefeder(id:any){
    return this.http.get(`${environment.baseurl}/mequipe/getone/${id}`)

  }
  
  savemmfeder(mfederation:any,id_equipefeder:any){
    return this.http.post(`${environment.baseurl}/mequipe/save1/${id_equipefeder}`,mfederation)
  }

  updatemf(mmef:any,id:any,id_equipefeder:any){
    return this.http.put(`${environment.baseurl}/mequipe/update/${id}/${id_equipefeder}`,mmef)
  }
  updatemf1(mmef:any,id:any){
    return this.http.put(`${environment.baseurl}/mequipe/update1/${id}`,mmef)
  }
}
