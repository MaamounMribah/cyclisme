import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultatCompetitionService {
constructor(private http:HttpClient) { }



  getallresultatComp(){
    return this.http.get(`${environment.baseurl}/resultat/all`)
  }
  addresultatComp(idcompetition:any,idcoureur:any,rescompetition:any){
    return this.http.post(`${environment.baseurl}/resultat/save/${idcompetition}/${idcoureur}`,rescompetition)

  }
   deleteresultatComp(id:any){
    return this.http.delete(`${environment.baseurl}/resultat/delete/${id}`)

  }
  updatecoureurdossards(id:any,dossards:any,temps:any){
    return this.http.put(`${environment.baseurl}/resultat/updatedossards/${id}?dossards=${dossards}&temps=${temps}`,{})
  }

  updatecoureurclassement(id:any,classement:any){
    return this.http.put(`${environment.baseurl}/resultat/updateclassement/${id}?classement=${classement}`,{})
  }



}
