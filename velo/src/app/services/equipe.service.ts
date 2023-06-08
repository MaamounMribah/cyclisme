import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http:HttpClient) { }
  getallEquipe(){
    return this.http.get(`${environment.baseurl}/equipe/all`)
  }

  deleteequipe(id:any){
    return this.http.delete(`${environment.baseurl}/equipe/delete/${id}`)

  }
  saveequipe(equipe:any){
    return this.http.post(`${environment.baseurl}/equipe/save`,equipe)
  }
  savefederation(federation:any){
    return this.http.post(`${environment.baseurl}/equipe/save`,federation)
  }
  updateequipefederation(id:any,equipefederation:any){
    return this.http.put(`${environment.baseurl}/equipe/update/${id}`,equipefederation)


  }
  updateequipefederationdesactiver(id:any){
    return this.http.put(`${environment.baseurl}/equipe/desactiver/${id}`,{})
  }
  updateequipefederationactiver(id:any){
    return this.http.put(`${environment.baseurl}/equipe/activer/${id}`,{})
  }
  // updatefeder(id:any,federation:any){
  //   return this.http.put(`${environment.baseurl}/equipe/update/${id}`,federation)


  // }
  
  getonecoureur(id:any){
    return this.http.get(`${environment.baseurl}/equipe/getone/${id}`)

  }
}
