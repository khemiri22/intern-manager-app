import { Component,OnDestroy, OnInit } from '@angular/core';
import {MainHeaderComponent} from '../main-header/main-header.component'
import {MainFooterComponent} from '../main-footer/main-footer.component'
import { RouterLink, RouterOutlet} from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { AuthService } from '../../../services/auth/auth.service'
import { IconDirective } from '@coreui/icons-angular';
import { Subscription } from 'rxjs';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
  ToastBodyComponent,
  ToastComponent,
  ToasterComponent,
  ToastHeaderComponent
} from '@coreui/angular';
import { ToasterService } from "../../../services/notification/toaster.service"
import { navItems } from './sidebarNavs';
import { SipLogoComponent } from 'src/app/components/sip-logo/sip-logo.component';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}
@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    MainFooterComponent,
    MainHeaderComponent,
    ToastBodyComponent,
    ToastComponent,
    ToasterComponent,
    ToastHeaderComponent,
    SipLogoComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent implements OnInit,OnDestroy {
  public navItems : any
  public space : string = ""
  toast = {
    message : "",
    type : "secondary"
  }
  authSubscription: Subscription = new Subscription();
  toasterSubscription: Subscription = new Subscription();
  // toast config
  visible = false;
  percentage = 0;

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }
  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
  // end of toast config
  constructor(private authservice:AuthService,private toastService : ToasterService){
    this.authservice.checkAuth().toPromise().then(response => {
      if(response.role === "admin")
        {
          this.navItems = navItems.admin
          this.space = "ESAPCE-ADMIN"
        }   
        else{
          this.navItems = navItems.intern
          this.space = "ESAPCE-STAGIAIRE"
        }
    });
  }
  ngOnDestroy(): void {
    if(this.authSubscription)
      this.authSubscription.unsubscribe()
    if(this.toasterSubscription)
      this.toasterSubscription.unsubscribe()
  }
  ngOnInit(): void {
    this.toastService.currentMessage.subscribe(
      msg => {
        if(msg.message!="")
        {
          this.toast = {
            message:msg.message,
            type : msg.type
          }
          this.toggleToast()
        }
        
      }
    )
  }
}
