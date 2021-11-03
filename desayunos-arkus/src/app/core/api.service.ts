import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class ApiService {
  constructor(public http: HttpClient) {}

  GetData(apiURL: string,headers?: any): Observable<any> {
    console.log(apiURL);
    return this.http.get<any>(apiURL, headers);
  }

  // GetDataWBody(apiURL: string, body?:any, headers?: any): Observable<any> {
  //   // body = JSON.stringify(body);
  //   console.log(body);
  //   return this.http.get<any>(apiURL,{observe: body, headers:headers});
  //   // return this.http.get<any>(apiURL, headers);
  // }

  GetDataWBody(apiURL: string, body?:any, options?: any): Observable<any> {
    // body = JSON.stringify(body);
    console.log(body);
    return this.http.post<any>(apiURL, body, options);
    // return this.http.get<any>(apiURL, headers);
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
