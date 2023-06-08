import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArbitreService {

  constructor(private http:HttpClient) { }
  getallArbitre(){
    return this.http.get(`${environment.baseurl}/arbitre/all`)
  }
  deletearbitre(id:any){
    return this.http.delete(`${environment.baseurl}/arbitre/delete/${id}`)

  }
  getonearbitre(id:any){
    return this.http.get(`${environment.baseurl}/arbitre/getone/${id}`)
}
savearbitre(arbitre:any,id_equipefedera:any){
  return this.http.post(`${environment.baseurl}/arbitre/save/${id_equipefedera}`,arbitre)
}
updatearbitre(arbitre:any,id:any){
  return this.http.put(`${environment.baseurl}/arbitre/update/${id}`,arbitre)
}
}
