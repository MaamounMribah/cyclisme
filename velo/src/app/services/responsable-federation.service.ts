import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsableFederationService {

  constructor(private http:HttpClient) { }
  
  getallresponsableFederation(){
    return this.http.get(`${environment.baseurl}/api/auth/all`)
  }
  deleterespfedera(id:any){
    return this.http.delete(`${environment.baseurl}/api/auth/delete/${id}`)

  }
  saverfedera(requipe:any){
    return this.http.post(`${environment.baseurl}/api/auth/signup3`,requipe)
  }

  updaterefederdesactiver(id:any){
    return this.http.put(`${environment.baseurl}/api/auth/desactiver/${id}`,{})
  }
  updaterefederactiver(id:any){
    return this.http.put(`${environment.baseurl}/api/auth/activer/${id}`,{})
  }
  getoneresefeder(id:any){
    return this.http.get(`${environment.baseurl}/api/auth/getone/${id}`)

  }
}
