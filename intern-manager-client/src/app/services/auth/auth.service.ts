import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, { email:email, motDePasse:password},{
      withCredentials:true
    });
  }
  recoverPassword(email: string):Observable<any> {
    return this.http.get(`${this.apiUrl}/user/sendRecoverMail/${email}`);
  }
  checkAuth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/verifyToken`,{
      withCredentials:true
    });
  }
  logout():Observable<any>{
    return this.http.get(`${this.apiUrl}/user/logout`,
      {
        withCredentials:true
      }
    )
  }
  getUserById(id:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/user/${id}`,
      {
        withCredentials:true
      }
    )
  }
  getAllInternsToChat():Observable<any> {
    return this.http.get(`${this.apiUrl}/user/getAllInternsToChat`,
      {
        withCredentials:true
      }
    )
  }
}
