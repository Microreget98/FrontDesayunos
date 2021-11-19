import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class ApiService {
  constructor(public http: HttpClient) {}

  GetData(apiURL: string,headers?: any): Observable<any> {
    return this.http.get<any>(apiURL, headers);
  }

  GetDataWBody(apiURL: string, body?:any, options?: any): Observable<any> {
    return this.http.post<any>(apiURL, body, options);
  }

  PutData(apiURL: string, body?: any, options?: any): Observable<any> {
    return this.http.put<any>(apiURL,body,options);
  }

  PostData(apiURL : string, body?: any, options?: any): Observable<any> {
    return this.http.post<any>(apiURL, body, options);
  }

  DeleteData(apiURL: string, options?: any): Observable<any> {
    return this.http.delete(apiURL,options);
  }

}
