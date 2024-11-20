import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { InternService } from '../../../services/intern/intern.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToasterService } from '../../../services/notification/toaster.service';
import { InternStagesService } from '../../../services/notification/intern-stages.service';

import {
  BorderDirective,
  ButtonDirective,
  ButtonCloseDirective,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardGroupComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardLinkDirective,
  CardSubtitleDirective,
  CardTextDirective,
  CardTitleDirective,
  ColComponent,
  GutterDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  RowComponent,
  TabDirective,
  TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TextColorDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
} from '@coreui/angular';

import {
  ContainerComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  FormLabelDirective,
} from '@coreui/angular';

import { InternStagesComponent } from '../../../components/intern-stages/intern-stages.component';
import {
  InternRequest,
  InternResponse,
} from '../../../interfaces/intern.model';
import { IconDirective } from '@coreui/icons-angular';
import { NgTemplateOutlet } from '@angular/common';
import { StageResponse, StageRequest } from 'src/app/interfaces/stage.model';
@Component({
  selector: 'app-admin-intern-manager',
  standalone: true,
  imports: [
    RowComponent,
    IconDirective,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardTitleDirective,
    CardTextDirective,
    ButtonDirective,
    CardSubtitleDirective,
    CardLinkDirective,
    ListGroupDirective,
    ListGroupItemDirective,
    CardFooterComponent,
    BorderDirective,
    CardGroupComponent,
    GutterDirective,
    CardImgDirective,
    TabsComponent,
    TabsListComponent,
    TabDirective,
    TabsContentComponent,
    TabPanelComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalToggleDirective,
    NgTemplateOutlet,
    ButtonCloseDirective,
    ContainerComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    FormLabelDirective,
    NgStyle,
    CommonModule,
    FormsModule,
    CapitalizePipe,
    InternStagesComponent,
  ],
  templateUrl: './admin-intern-manager.component.html',
  styleUrl: './admin-intern-manager.component.scss',
})
export class AdminInternManagerComponent implements OnInit, OnDestroy {
  constructor(
    private internService: InternService,
    private router: Router,
    private toastService: ToasterService,
    private internStageService: InternStagesService
  ) {}
  subscription: Subscription = new Subscription();
  selectedUser: string = '';
  addInternModalVisible: boolean = false;
  deleteInternModalVisible: boolean = false;
  updateInternModalVisible: boolean = false;
  stagesInternModalVisible: boolean = false;

  internRequest: InternRequest = {
    email: '',
    nom: '',
    prenom: '',
    password: '',
    confirmPassword: '',
    image: '',
  };
  stageRequest: StageRequest = {
    dateDebut: "",
    dateFin: "",
    description: '',
    etablissement: '',
    sujet: '',
    tuteur: '',
  };

  internList: InternResponse[] = [];
  stageList: StageResponse[] = [];

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getInternsData();
  }

  toggleAddInternModal() {
    this.addInternModalVisible = !this.addInternModalVisible;
  }

  toggleDeleteInternModal() {
    this.deleteInternModalVisible = !this.deleteInternModalVisible;
  }
  toggleUpdateInternModal() {
    this.updateInternModalVisible = !this.updateInternModalVisible;
  }
  toggleStagesInternModal() {
    this.stagesInternModalVisible = !this.stagesInternModalVisible;
  }

  handleUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      this.internRequest.image = file;
    }
  }
  resetFields() {
    this.internRequest = {
      email: '',
      nom: '',
      prenom: '',
      password: '',
      confirmPassword: '',
      image: '',
    };
  }

  resetStageFields() {
    this.stageRequest = {
      dateDebut: "",
      dateFin: "",
      description: '',
      etablissement: '',
      sujet: '',
      tuteur: '',
    };
  }
  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router
      .navigateByUrl('/blank', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentUrl]);
      });
  }

  addIntern() {
    this.subscription = this.internService
      .register(this.internRequest)
      .subscribe(
        (response) => {
          this.reloadComponent();
          this.showToast('Le stagiaire a été ajouté', 'success');
          this.resetFields();
        },
        (error) => {
          this.showToast(error.error, 'danger');
        }
      );
  }

  getInternsData() {
    this.subscription = this.internService.getAllInterns().subscribe(
      (response) => {
        response.map(
          (value: {
            id: any;
            email: any;
            nom: any;
            prenom: any;
            motDePasse: any;
            image: any;
          }) => {
            this.internList.push({
              id: value.id,
              email: value.email,
              nom: value.nom,
              prenom: value.prenom,
              password: value.motDePasse,
              image: environment.apiUrl + '/' + value.image,
            });
          }
        );
      },
      (error) => {
        console.log(error.error);
        this.showToast(error.error, 'danger');
      }
    );
  }

  getInternByIdData(id: string) {
    this.subscription = this.internService.getInternById(id).subscribe(
      (response) => {
        this.internRequest = {
          email: response.email,
          nom: response.nom,
          prenom: response.prenom,
          password: '',
          confirmPassword: '',
          image: '',
        };
      },
      (error) => {
        this.showToast(error.error, 'danger');
      }
    );
  }

  deleteIntern() {
    this.subscription = this.internService
      .deleteInternById(this.selectedUser)
      .subscribe(
        (response) => {
          this.reloadComponent();
          this.showToast('Stagaire a été supprimé !', 'success');
        },
        (error) => {
          this.showToast(error.error, 'danger');
        }
      );
  }
  updateIntern() {
    this.subscription = this.internService
      .updateInternById(this.selectedUser, this.internRequest)
      .subscribe(
        (response) => {
          this.reloadComponent();
          this.showToast('Stagaire a été modifié !', 'success');
          this.resetFields();
        },
        (error) => {
          this.showToast(error.error, 'danger');
        }
      );
  }

  affecterStage = () => {
    this.subscription = this.internService.affecterStagiaireAStage(this.stageRequest,this.selectedUser).subscribe(response => {
      this.getAllStageOFIntern(this.selectedUser)
      this.showToast('Stagaire a été affecter !', 'success');
      this.resetStageFields();
    },error=>{
      this.showToast(error.error, 'danger');
    }
  )
    
  };
  getAllStageOFIntern = (id: string) => {
    this.subscription = this.internService
      .getAllStageOfInternById(id)
      .subscribe(
        (response) => {
          this.internStageService.changestages(
            response.map((stage: StageResponse) => stage)
          );
        },
        (error) => {
          console.log(error);

          this.showToast(error.error, 'danger');
        }
      );
  };
  selectUser(id: string) {
    this.selectedUser = id;
  }
  showToast(message: string, type: string) {
    this.toastService.changeMessage(message, type);
  }
}
