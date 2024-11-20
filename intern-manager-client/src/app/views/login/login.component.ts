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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,FormLabelDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

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
  constructor(private router:Router,private authservice:AuthService){}

  onSubmit() {
    this.subscription=this.authservice.login(this.user.email,this.user.password).subscribe(response=>{
      response.role === "admin" ? this.navigateTo("/admin") : this.navigateTo("/intern") 

    },
    error => {
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
