import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ChatService{
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    getInfoForInternToChat() : Observable<any> {
        return this.http.get(`${this.apiUrl}/chat/getInfoForInternToChat`,{
            withCredentials:true
        })
    }
    getInfoForAdminToChat() : Observable<any> {
        return this.http.get(`${this.apiUrl}/chat/getInfoForAdminToChat`,{
            withCredentials:true
        })
    }   
    getMessagesOfInternWithAdmin() : Observable<any> {
        return this.http.get(`${this.apiUrl}/chat/getMessagesOfUser`,{
            withCredentials:true
        })
    }
}