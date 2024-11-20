import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InternRequest } from '../../interfaces/intern.model';
import { StageRequest } from 'src/app/interfaces/stage.model';
@Injectable({
  providedIn: 'root',
})
export class InternService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  register(internRequest: InternRequest): Observable<any> {
    let formData = new FormData();
    formData.append('email', internRequest.email);
    formData.append('nom', internRequest.nom);
    formData.append('prenom', internRequest.prenom);
    formData.append('motDePasse', internRequest.password);
    formData.append('image', internRequest.image);
    return this.http.post(`${this.apiUrl}/intern/register`, formData, {
      withCredentials: true,
    });
  }
  getAllInterns(): Observable<any> {
    return this.http.get(`${this.apiUrl}/intern`, { withCredentials: true });
  }

  getInternById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/intern/${id}`, {
      withCredentials: true,
    });
  }
  getIntern(): Observable<any> {
    return this.http.get(`${this.apiUrl}/intern/userInfo`, {
      withCredentials: true,
    });
  }

  deleteInternById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/intern/${id}`, {
      withCredentials: true,
    });
  }

  updateInternById(id: string, internRequest: InternRequest): Observable<any> {
    let formData = new FormData();
    if (internRequest.email != '') {
      formData.append('email', internRequest.email);
    }
    if (internRequest.nom != '') {
      formData.append('nom', internRequest.nom);
    }
    if (internRequest.prenom != '') {
      formData.append('prenom', internRequest.prenom);
    }
    if (internRequest.password != '') {
      formData.append('motDePasse', internRequest.password);
    }
    if (internRequest.image != '') {
      formData.append('image', internRequest.image);
    }
    return this.http.put(`${this.apiUrl}/intern/${id}`, formData, {
      withCredentials: true,
    });
  }

  getAllStageOfInternById(id: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/intern/getAllStageOfInternByAdmin/${id}`,
      { withCredentials: true }
    );
  }
  getAllStageOfIntern(): Observable<any> {
    return this.http.get(`${this.apiUrl}/intern/getAllStageOfInternByAdmin`, {
      withCredentials: true,
    });
  }
  affecterStagiaireAStage(
    stageRequest: StageRequest,
    id: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/internship/affecterStage/${id}`,
      stageRequest,
      {
        withCredentials: true,
      }
    );
  }
  generateInternshipCertif(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/internship/generateCertif/${id}`, {
      withCredentials: true,
      responseType: 'blob',
    });
  }
}
