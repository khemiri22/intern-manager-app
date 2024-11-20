import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterService } from '../../../services/notification/toaster.service';
import { ChatMessage,Destinataire } from '../../../interfaces/chat-room.model';
import { ChatService } from '../../../services/chat/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import {
  RowComponent,
  ColComponent,
  CardComponent,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  CardBodyComponent,
  CardHeaderComponent,
  AlertComponent,
  CardGroupComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  ButtonDirective,
  CardFooterComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Subscription } from 'rxjs';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
@Component({
  selector: 'app-intern-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    NavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    AlertComponent,
    CardGroupComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormDirective,
    FormControlDirective,
    FormLabelDirective,
    ButtonDirective,
    IconDirective,
    CapitalizePipe,
    CardFooterComponent,
  ],
  templateUrl: './intern-chat.component.html',
  styleUrl: './intern-chat.component.scss',
})
export class InternChatComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  internInfo : any
  talkingTo :any
  chatrooms : Map<string,ChatMessage[]>  = new Map();
  contenu: string = '';
  socket?: WebSocket;
  stompClient?: Stomp.Client;
  subscription!: Subscription;
  messagesContainer: any;
  constructor(
    private toasterService: ToasterService,
    private chatService: ChatService,
  ) {}
  ngAfterViewChecked(): void {
    this.messagesContainer = document.getElementById('msgContainer');
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
  ngOnDestroy(): void {
    this.stompClient?.disconnect(() => {});
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getInternData();
    this.getMessagesOfUser();
    this.connect();
  }
  connect = () => {
    this.socket = new SockJS.default(`${environment.apiUrl}/ws`);
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, this.onConnected, this.onError);
  };
  onConnected = () => {
    this.stompClient?.subscribe(
      `/user/${this.internInfo.id}/private`,
      this.onMessage
    );
    this.stompClient?.subscribe(
      `/user/${this.internInfo.id}/error`,
      this.onMessageError
    );
  };
  onError = (err: any) => {
    console.log(err);
    this.toasterService.changeMessage('Accès refusé !', 'danger');
  };
  onMessage = (payload: any) => {
    let payloadData = JSON.parse(payload.body);
    if (!this.chatrooms.has(payloadData.expediteurId)) {
      this.chatrooms.set(payloadData.expediteurId,[])
    }
      this.chatrooms.get(payloadData.expediteurId)?.push(payloadData)
  };

  onMessageError = (payload: any) => {
    let payloadData = payload.body;
    this.toasterService.changeMessage(payloadData, 'danger');
  };
  
  sendMessage() {
    this.stompClient?.send(
      '/app/private-message',
      {},
      JSON.stringify({
        contenu: this.contenu,
        expediteurId: this.internInfo.id,
        destinataireId: this.talkingTo,
      })
    );
    if (!this.chatrooms.has(this.talkingTo))
    {
      this.chatrooms.set(this.talkingTo,[])
    }
    this.chatrooms.get(this.talkingTo)?.push({
      contenu: this.contenu,
      dateEnvoi: this.formatDateToYYYYMMDDHHMM(new Date()),
      destinataireId: this.talkingTo,
      expediteurId: this.internInfo.id,
    });
    this.contenu = '';
  }
    

  formatDateToYYYYMMDDHHMM(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  getInternData = () => {
    this.subscription = this.chatService.getInfoForInternToChat().subscribe(
      (response) => {
        this.internInfo = response;
        this.talkingTo = response.adminId
        this.chatrooms.set(response.adminId,[])
      },
      (error) => {
        this.toasterService.changeMessage(error.error, 'danger');
      }
    );
  };
  getMessagesOfUser = () => {
    this.subscription = this.chatService
      .getMessagesOfInternWithAdmin()
      .subscribe(
        (response) => {
          if (response.length !== 0) {
          let map: Map<string,ChatMessage[]> = new Map();
          response.forEach(
            (item: { destinataire: Destinataire; chatRoomMessages: ChatMessage[] }) => {
              const { destinataire, chatRoomMessages } = item;
                map.set(destinataire.id,chatRoomMessages)
              
            }
          );
          this.chatrooms = map;
          }
        },
        (error) => {
          this.toasterService.changeMessage(error.error, 'danger');
        }
      );
  };
}
