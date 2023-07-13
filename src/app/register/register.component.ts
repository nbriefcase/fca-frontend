import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router) {

  }

  registerRequest: any;
  registerResponse: any;

  registrationForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    //password: this.builder.control('',Validators.compose([Validators.required, Validators.pattern('')])),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    active: this.builder.control(false),
  });

  proceedRegistration() {
    if (this.registrationForm.valid) {
      this.service.ProceedRegister(this.registrationForm.value).subscribe(res => {
        this.toastr.success('Contacte al administrador para activar su cuenta!', 'Se ha registrado exitosamente!');
        this.router.navigate(['login']);
      });

      this.registerRequest = {
        "firstname": this.registrationForm.value.name,
        "email": this.registrationForm.value.email,
        "password": this.registrationForm.value.password,
      }
      this.service.AuthProceedRegister(this.registerRequest).subscribe(res => {

        this.registerResponse = res;
        console.log(this.registerResponse);
        localStorage.setItem("accessToken", this.registerResponse.accessToken);
        localStorage.setItem("refreshToken", this.registerResponse.refreshToken);


        this.toastr.success('Contacte al administrador para activar su cuenta!', 'Se ha registrado exitosamente!');
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Por favor, corrija el error en datos y intenten de nuevo.');
    }
  }
}
