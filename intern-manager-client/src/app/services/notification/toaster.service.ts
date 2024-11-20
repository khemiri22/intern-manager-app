import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private textSource= new BehaviorSubject<{message : string,type : string}>({message:"",type:""});
  currentMessage = this.textSource.asObservable();

  constructor() { }

  changeMessage(message: string,type : string) {
    this.textSource.next({
      message,
      type
    });
  }
}
