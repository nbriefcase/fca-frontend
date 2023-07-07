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

  }

  userData: any;
  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedLogin() {
    if (this.loginForm.valid) {
    } else {
      this.toastr.warning('Por favor, corrija el error en datos y intenten de nuevo.');
    }

    this.service.GetByCode(this.loginForm.value.username).subscribe(res => {
      this.userData = res;
      console.log(this.userData);

      if (this.userData.password === this.loginForm.value.password) {

        if (this.userData.isActive) {
          sessionStorage.setItem('username', this.userData.id);
          sessionStorage.setItem('userRole', this.userData.role);
          this.router.navigate(['']);

        } else {

          this.toastr.warning('Contacte al administrador!', 'Usuario Inactivo!');
        }

      } else {

        this.toastr.warning('Clave incorrecta!');
      }
    });
  }
}
