import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  constructor(private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>) {

  }

  editData: any;

  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res => {
      this.roleList = res;
    })

    if (this.data.userCode != null && this.data.userCode != '') {

      this.service.GetByCode(this.data.userCode).subscribe(res => {

        this.editData = res;
        this.registrationForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          email: this.editData.email,
          password: this.editData.password,
          role: this.editData.role,
          gender: this.editData.gender,
          isActive: this.editData.isActive
        })
      })
    }
  }

  roleList: any;
  registrationForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.nonNullable.control(''),
    isActive: this.builder.control(false),
  });

  UpdateUser() {
    if (this.registrationForm.valid) {
      this.service.UpdateUser(this.registrationForm.value.id, this.registrationForm.value).subscribe(res => {
        this.toast.success('Datos actualizados exitosamente!');
        this.dialog.close();
      });
    } else {
      this.toast.warning('Seleccione un Role!')
    }
  }
}
