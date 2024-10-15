import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  post(endPoint,obj){
    return this.http.post(environment.baseUrl+endPoint,obj)
  }
}
