import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  constructor(private http: HttpClient) {}

  add(postedModel): Observable<any> {
    return this.http.post<any[]>(
      `${environment.baseAPIURL}/Applicant/Add`,
      postedModel
    );
  }
 
}
