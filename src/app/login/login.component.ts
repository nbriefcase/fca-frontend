import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router) {

    localStorage.clear();

  }

  userData: any;
  authResponse: any;
  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedLogin() {
    if (this.loginForm.valid) {
    } else {
      this.toastr.warning('Por favor, corrija el error en datos y intenten de nuevo.');
    }

    console.log('calling auth...');
    let username = this.loginForm.value.username || '';
    let password = this.loginForm.value.password;
    this.service.Authenticate({ email: username, password }).subscribe(res => {
      this.authResponse = res;
      localStorage.setItem('accessToken', this.authResponse.access_token);
      localStorage.setItem('refreshToken', this.authResponse.refresh_token);
      localStorage.setItem('username', username);

      this.service.GetByCode(username).subscribe(res => {
        this.userData = res;
        console.log(this.userData);

        if (this.userData.active) {
          localStorage.setItem('userRole', this.userData.role);
          this.router.navigate(['']);

        } else {
          this.toastr.warning('Contacte al administrador!', 'Usuario Inactivo!');
        }

      });
      console.log('finished auth...');
    });
  }
}
