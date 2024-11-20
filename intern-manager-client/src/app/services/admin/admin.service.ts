import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {User} from '../../interfaces/user.model'

@Injectable({
    providedIn: 'root'
  })
  export class AdminService {
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  
    register(user:User): Observable<any> {
      return this.http.post(
        `${this.apiUrl}/admin/register`,
        { email:user.email, motDePasse:user.password,nom:user.nom,prenom:user.prenom}
    );
    }
}
    