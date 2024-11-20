import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
@Component({
  selector: 'app-main-footer',
  standalone: true,
  templateUrl: './main-footer.component.html',
  styleUrl: './main-footer.component.scss'
})
export class MainFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
