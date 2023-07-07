import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  apiUrl = 'http://localhost:3000/user';

  GetAll() {
    return this.http.get(this.apiUrl);
  }

  GetByCode(code: any) {
    return this.http.get(this.apiUrl + '/' + code);
  }

  ProceedRegister(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }

  UpdateUser(code: any, inputData: any) {
    return this.http.put(this.apiUrl + '/' + code, inputData);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  GetUserRole() {
    const userRole = sessionStorage.getItem('userRole');
    return userRole != null ? userRole?.toString() : '';
  }

  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }
}
