import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoureurService {

  constructor(private http:HttpClient) { }
  getallcoureur(){
    return this.http.get(`${environment.baseurl}/coureur/all`)
  }
  deletecoureur(id:any){
    return this.http.delete(`${environment.baseurl}/coureur/delete/${id}`)

  }
  getonecoureur(id:any){
    return this.http.get(`${environment.baseurl}/coureur/getone/${id}`)

  }
  savecoureur(coureur:any,id_equipefeder:any){
    return this.http.post(`${environment.baseurl}/coureur/save/${id_equipefeder}`,coureur)
  }
  updatecoureur(coureur:any,id:any,id_equipefeder:any){
    return this.http.put(`${environment.baseurl}/coureur/update/${id}/${id_equipefeder}`,coureur)
  }
  updatedistancecoureur(distance:any,id:any){
    return this.http.put(`${environment.baseurl}/coureur/updatedistance/${id}?distance=${distance}`,{})
  }
  updatecategorycoureur(id:any,category:any){
    return this.http.put(`${environment.baseurl}/coureur/updatecategory/${id}?category=${category}`,{})
  }

 coureurdesactiver(id:any){
    return this.http.put(`${environment.baseurl}/coureur/desactiver/${id}`,{})
  }
 coureuractiver(id:any){
    return this.http.put(`${environment.baseurl}/coureur/activer/${id}`,{})
  }

  confirmercoureur(idcoureur:any) {
  
    return this.http.put(`${environment.baseurl}/coureur/confirmer/${idcoureur}`, {});
  }
}
