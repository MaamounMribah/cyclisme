import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsableEquipeService {

  constructor(private http:HttpClient) { }
  getallresponsableEquipe(){
    return this.http.get(`${environment.baseurl}/api/auth/all`)
  }
  deleterespequipe(id:any){
    return this.http.delete(`${environment.baseurl}/api/auth/delete/${id}`)

  }
  updateresponsableequipe(id:any,respequipe:any){
    return this.http.put(`${environment.baseurl}/api/auth/update/${id}`,respequipe)


  }
  getallEquipe(){
    return this.http.get(`${environment.baseurl}/equipe/all`)
  }

  
  saverequipe(requipe:any,idequipe:any){
    return this.http.post(`${environment.baseurl}/api/auth/signup1/${idequipe}`,requipe)
  }
  getoneresequipe(id:any){
    return this.http.get(`${environment.baseurl}/api/auth/getone/${id}`)

  }
  updateresequipedesactiver(id:any){
    return this.http.put(`${environment.baseurl}/api/auth/desactiver/${id}`,{})
  }
  updateresequipeactiver(id:any){
    return this.http.put(`${environment.baseurl}/api/auth/activer/${id}`,{})
  }
  
}
