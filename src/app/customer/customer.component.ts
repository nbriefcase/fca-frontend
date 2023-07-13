import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private service: AuthService,
    private toastr: ToastrService,
    private router: Router) {
    this.SetAccessPermission();
  }

  customerList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  accessData: any;
  haveAdd = false;
  haveEdit = false;
  haveDelete = false;

  LoadCustomer() {
    this.service.GetAllCustomer().subscribe(res => {
      this.customerList = res;
      this.dataSource = new MatTableDataSource(this.customerList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  SetAccessPermission() {
    // https://rxjs.dev/deprecations/subscribe-arguments
    this.service.GetAccessByRole(this.service.GetUserRole(), 'customer').subscribe({
      next: res => {
        this.accessData = res;
        console.log(this.accessData);
        if (this.accessData.length > 0) {
          this.haveAdd = this.accessData[0].haveadd;
          this.haveEdit = this.accessData[0].haveedit;
          this.haveDelete = this.accessData[0].havedelete;
          this.LoadCustomer();
        } else {
          alert('No autorizado!');
          this.router.navigate(['']);
        }
      },
      error: err => {
        alert('No autorizado!');
        this.router.navigate(['']);
      }
    });
  }
  displayedColumns: string[] = ['code', 'name', 'creditlimit', 'action'];

  UpdateCustomer(code: any) {
    if (this.haveEdit) {
      this.toastr.success('Success!');
    } else {
      this.toastr.warning('No autorizado!');
    }
  }

  DeleteCustomer(code: any) {
    if (this.haveDelete) {
      this.toastr.success('Success!');
    } else {
      this.toastr.warning('No autorizado!');
    }
  }

  AddCustomer() {
    if (this.haveAdd) {
      this.toastr.success('Success!');
    } else {
      this.toastr.warning('No autorizado!');
    }
  }
}
