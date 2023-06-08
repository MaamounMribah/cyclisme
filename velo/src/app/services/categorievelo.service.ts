import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieveloService {

  constructor(private http:HttpClient) { }
  getallCategoryVelo(){
    return this.http.get(`${environment.baseurl}/Categorievelo/all`)
  }
  deletevelo(id:any){
    return this.http.delete(`${environment.baseurl}/Categorievelo/delete/${id}`)

  }
  getonevelo(id:any){
    return this.http.get(`${environment.baseurl}/Categorievelo/getone/${id}`)

  }
  updatevelo(id:any,velo:any){
    return this.http.put(`${environment.baseurl}/Categorievelo/update/${id}`,velo)


  }
  saveveelo(velo:any){
    return this.http.post(`${environment.baseurl}/Categorievelo/save`,velo)
  }
}
