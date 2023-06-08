import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http:HttpClient) { }
  getallCompetition(){
    return this.http.get(`${environment.baseurl}/competition/all`)
    
  }
  getonecompetition(id:any){
    return this.http.get(`${environment.baseurl}/competition/getone/${id}`)

  }
  deletecompetition(id:any){
    return this.http.delete(`${environment.baseurl}/competition/delete/${id}`)

  }

  savecomp(id_categ:any,comp:any){
    return this.http.post(`${environment.baseurl}/competition/savenew/${id_categ}`,comp)
  }


  affecterCoureur(idcompetition:any,idc:any) {
  
    return this.http.put(`${environment.baseurl}/competition/affectercoureur/${idcompetition}?idc=${idc}`, {});
  }
  affecterarbitre(idcompetition:any,ida:any) {
  
    return this.http.put(`${environment.baseurl}/competition/affecterarbitre/${idcompetition}?ida=${ida}`, {});
  }

 confirmercompétition(idcompetition:any) {
  
    return this.http.put(`${environment.baseurl}/competition/confirmer/${idcompetition}`, {});
  }
  updatecomp(id:any,id_categorie:any,comp:any){
    return this.http.put(`${environment.baseurl}/competition/update/${id}/${id_categorie}`,comp)
  }

 
}
