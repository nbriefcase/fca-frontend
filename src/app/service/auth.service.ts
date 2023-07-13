import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  headers = { 'Authorization': 'Bearer my-token' }
  userBaseUrl = 'users';
  rolBaseUrl = 'roles';
  authBaseUrl = 'api/v1/auth';
  authResponse: any;
  registerResponse: any;

  Authenticate(credential: any) {
    return this.http.post(this.authBaseUrl + '/authenticate', credential);
  }


  AuthProceedRegister(inputData: any) {
    return this.http.post(this.authBaseUrl + '/register', inputData);
  }

  GetAll() {
    return this.http.get(this.userBaseUrl);
  }

  GetByCode(code: any) {
    this.populateToken();
    return this.http.get(this.userBaseUrl + '/' + code, { headers: this.headers });
  }

  ProceedRegister(inputData: any) {
    return this.http.post(this.userBaseUrl, inputData);
  }

  UpdateUser(code: any, inputData: any) {
    return this.http.put(this.userBaseUrl + '/' + code, inputData);
  }

  IsLoggedIn() {
    return localStorage.getItem('username') != null;
  }

  GetUserRole() {
    const userRole = localStorage.getItem('userRole');
    return userRole != null ? userRole?.toString() : '';
  }

  GetAllRole() {
    return this.http.get(this.rolBaseUrl);
  }

  GetAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }

  GetAccessByRole(role: any, menu: any) {
    return this.http.get(this.rolBaseUrl + '/role-access?role=' + role + '&menu=' + menu);
  }

  populateToken() {
    const token = localStorage.getItem('accessToken');
    this.headers = { 'Authorization': 'Bearer ' + (token != null ? token?.toString() : '') }
  }
}
