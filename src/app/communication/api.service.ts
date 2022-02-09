import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http:HttpClient) { }

  // Url de la API, en testing
  apiUrl:string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  loginUser(data:any) {
    return this.http.post(this.apiUrl + '/login', data);
  }
  
  registerUser(data:any) {
    return this.http.post(this.apiUrl + '/signin/registeruser', data);
  }
}
