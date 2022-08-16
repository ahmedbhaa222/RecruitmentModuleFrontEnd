import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getList(searchModel: any): Observable<any[]> {
    let params = new URLSearchParams();
    if (searchModel) {
      Object.keys(searchModel).forEach((key) => {
        params.set(key, searchModel[key]);
      });
    }
    return this.http.get<any[]>(
      `${environment.baseAPIURL}/job/GetMany?${params.toString()}`
    );
  }

  getAllAvailble(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseAPIURL}/job/GetAllAvailble`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseAPIURL}/job/GetCategories`);
  }

  getById(id): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.baseAPIURL}/job/GetById?id=${id}`
    );
  }

  add(postedModel): Observable<any> {
    return this.http.post<any[]>(
      `${environment.baseAPIURL}/job/Add`,
      postedModel
    );
  }
  edit(postedModel): Observable<any> {
    return this.http.put<any[]>(
      `${environment.baseAPIURL}/job/Edit`,
      postedModel
    );
  }

  delete(id): Observable<any> {
    return this.http.delete<any[]>(
      `${environment.baseAPIURL}/job/Delete?jobId=${id}`
    );
  }
}
