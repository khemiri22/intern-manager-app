import { Component, OnDestroy } from '@angular/core';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective,FormLabelDirective } from '@coreui/angular';
import { NgStyle,CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import {User} from '../../../interfaces/user.model'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin/admin.service';
@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,FormLabelDirective],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.scss'
})
export class AdminRegisterComponent implements OnDestroy {
  constructor(private router:Router,private adminservice:AdminService){}
  subscription: Subscription = new Subscription();
  isError = {
    status : false,
    message : ""
  };
  user:User = {
    email: "",
    nom: "",
    prenom:"",
    password: "",
    confirmPassword: ""
  }
  onSubmit() {
    this.subscription = this.adminservice.register(this.user).subscribe(response => {
      console.log(response);
      this.navigateTo("/login")
    }
  ,error => {
    console.log(error.error);
    this.isError = {
      status:true,
      message:error.error
    }
  }
  )
    
  }
  navigateTo(route:string)
  {
    this.router.navigate([route])
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
