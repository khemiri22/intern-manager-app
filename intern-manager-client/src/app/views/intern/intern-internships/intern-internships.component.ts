import { Component, OnDestroy, OnInit } from '@angular/core';
import { InternService } from '../../../services/intern/intern.service'
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { StageResponse } from 'src/app/interfaces/stage.model';
import { ToasterService } from 'src/app/services/notification/toaster.service';
import { Subscription } from 'rxjs';
import { InternResponse } from 'src/app/interfaces/intern.model';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-intern-internships',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardBodyComponent,
    CardComponent,
    TableDirective,
    CommonModule,
    CapitalizePipe,
    ButtonDirective,
    IconDirective
  ],
  templateUrl: './intern-internships.component.html',
  styleUrl: './intern-internships.component.scss'
})
export class InternInternshipsComponent implements OnInit,OnDestroy {
  subscription: Subscription = new Subscription()
  stageList: StageResponse[] = [];
  internResponse: InternResponse = {
    id:-1,
    email: '',
    nom: '',
    prenom: '',
    password: '',
    image: '',
  };
  constructor(private internService:InternService,private toastService: ToasterService) {}
  ngOnInit(): void {
    this.getAllStages()
    this.getInternInfo()
  }
  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe()
  }

  getAllStages = () => {
    this.subscription = this.internService.getAllStageOfIntern().subscribe(respone=> {
      this.stageList = respone
    },error => {
      this.showToast(error.error,"danger")
    }
  )
  }
  showToast(message: string, type: string) {
    this.toastService.changeMessage(message, type);
  }
  getInternInfo() {
    this.subscription = this.internService.getIntern().subscribe(
      (response) => {
        this.internResponse = {
          id:response.id,
          email: response.email,
          nom: response.nom,
          prenom: response.prenom,
          password: '',
          image: '',
        };
      },
      (error) => {
        this.showToast(error.error, 'danger');
      }
    );
  }

  generateCertif = (id:string) => {
    this.subscription = this.internService.generateInternshipCertif(id).subscribe(response=> {
      const url = window.URL.createObjectURL(response);
      window.open(url);
      
    },error => {
      this.showToast(error.error, 'danger');
    }
  )
  }
}
