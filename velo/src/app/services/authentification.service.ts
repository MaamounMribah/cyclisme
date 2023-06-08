import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  token = localStorage.getItem("token")!
  headersoption = new HttpHeaders({
    Authorization: 'Bearer ' + this.token
  })

  private apiUrl = 'http://example.com/api/';
  constructor(private http:HttpClient) { }
  signin(loginrequest:any){
    return this.http.post(`${environment.baseurl}/api/auth/signin`,loginrequest)
  }
  signup(loginrequest:any){
    return this.http.post(`${environment.baseurl}/api/auth/signup2`,loginrequest)
  }
  forgetpassword(email:any){
    return this.http.post(`${environment.baseurl}/api/auth/forgetPassword?email=${email}`,{})
  }
  restpassword(resetlink:any,newPassword:any){
    return this.http.post(`${environment.baseurl}/api/auth/savePassword/${resetlink}?newPassword=${newPassword}`,{})
  }
  updateadmin(id:any,user:any){
    return this.http.put(`${environment.baseurl}/api/auth/updateuser/${id}`,user)


  }
  updateuser(id:any,user:any){
    return this.http.put(`${environment.baseurl}/api/auth/updateuser1/${id}`,user)


  }
  updateimage(id:any,image:any){
    return this.http.put(`${environment.baseurl}/api/auth/update/${id}`,image)


  }

 changepassword(requestpassword:any){
  return this.http.post(`${environment.baseurl}/api/auth/change-Password`,requestpassword,{ headers: this.headersoption })

}

getUserTeamId(): Observable<number> {
  // récupère le token JWT de l'utilisateur connecté depuis le local storage
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in local storage');
  }

  // envoie une requête HTTP pour récupérer l'ID de l'équipe de l'utilisateur connecté
  return this.http.get<number>(this.apiUrl + 'auth/teamid', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
}
