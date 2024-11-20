import { Component, OnDestroy } from '@angular/core';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective,FormLabelDirective } from '@coreui/angular';
import { NgStyle,CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import {User} from '../../interfaces/user.model'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,FormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,FormLabelDirective],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  isError = {
    status : false,
    message : ""
  };
  isSuccess = {
    status : false,
    message : ""
  };
  loading = false;
  constructor(private router:Router,private authservice:AuthService){}
  user:User = {
    email: "",
    nom: "",
    prenom:"",
    password: "",
    confirmPassword: ""
  }
  onSubmit() {
    this.loading=true
    this.authservice.recoverPassword(this.user.email).subscribe(response => {
      console.log(response);
      this.isSuccess = {
        status : true,
        message : response.message
      };
      this.isError = {
        status : false,
        message : ""
      };
      this.navigateTo("/login",2500)
      
    },
    error => {
      console.log(error.error);
      this.isError = {
        status:true,
        message:error.error
      }
      this.isSuccess = {
        status : false,
        message : ""
      };
      this.loading=false
    }
  )
  }
  navigateTo(route:string,timeout: number){
  setTimeout(() => {
    this.router.navigate([route]);
    this.loading=false
  }, timeout);
}

ngOnDestroy(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}
}
