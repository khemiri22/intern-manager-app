import { Component, computed,inject, Input, OnDestroy } from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';
import { AuthService } from '../../../services/auth/auth.service'
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive,Router  } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { ToasterService } from '../../../services/notification/toaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent extends HeaderComponent implements OnDestroy {
  subscription :Subscription = new Subscription()
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly currentRoute:string
  readonly prenom:string
  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode=> mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor(private router: Router,private authservice:AuthService,private toastService: ToasterService) {
    super();
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
    this.currentRoute = this.router.url.substring(1);
    this.prenom = ""
 
  }
  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe()
  }
  @Input() sidebarId: string = 'sidebar1';

  logout = () => {
    this.subscription=this.authservice.logout().subscribe(response => {
      window.location.reload()
    },error => {
      this.showToast(error.error, 'danger');
    }
  )
  }

  showToast(message: string, type: string) {
    this.toastService.changeMessage(message, type);
  }

}
