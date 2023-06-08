import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembreEquipeService {

  constructor(private http:HttpClient) { }
  getallmembreEquipe(){
    return this.http.get(`${environment.baseurl}/mequipe/all`)
  }
  deletemembreEquipe(id:any){
    return this.http.delete(`${environment.baseurl}/mequipe/delete/${id}`)

  }
  getonemembreEquipe(id:any){
    return this.http.get(`${environment.baseurl}/mequipe/getone/${id}`)

  }
  savemequipe(mequipe:any,id_equipefeder:any){
    return this.http.post(`${environment.baseurl}/mequipe/save/${id_equipefeder}`,mequipe)
  }
  updatemmeq(mmeq:any,id:any,id_equipefeder:any){
    return this.http.put(`${environment.baseurl}/mequipe/update/${id}/${id_equipefeder}`,mmeq)
  }

  confirmermember(idmember:any) {
  
    return this.http.put(`${environment.baseurl}/mequipe/confirmer/${idmember}`, {});
  }
}
