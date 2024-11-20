import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  RowComponent,
  TableDirective,
} from '@coreui/angular';
import {StageResponse} from '../../interfaces/stage.model'
import { CommonModule } from '@angular/common'
import { InternStagesService } from "../../services/notification/intern-stages.service"
import { Subscription } from 'rxjs';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-intern-stages',
  standalone: true,
  imports: [
    CardBodyComponent,
    CardComponent,
    ColComponent,
    RowComponent,
    TableDirective,
    CommonModule,
    CapitalizePipe
  ],
  templateUrl: './intern-stages.component.html',
  styleUrl: './intern-stages.component.scss',
})
export class InternStagesComponent implements OnInit,OnDestroy {
  constructor(private internStageService:InternStagesService){}
  
  subscription: Subscription = new Subscription();
  stages: StageResponse[] = [];

  ngOnInit(): void {
    this.subscription = this.internStageService.currentStages.subscribe(data=>{
      this.stages = data;
    })
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
}
