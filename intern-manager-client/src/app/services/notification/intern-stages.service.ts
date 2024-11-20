import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StageResponse } from '../../interfaces/stage.model'
@Injectable({
  providedIn: 'root'
})
export class InternStagesService {
  private stages= new BehaviorSubject<StageResponse[]>([]);
  currentStages = this.stages.asObservable();

  constructor() { }

  changestages(stages:StageResponse[]) {
    this.stages.next(stages)
  }
}