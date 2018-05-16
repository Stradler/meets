import { Injectable } from '@angular/core';

import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {

  messages: Subject<any>;

  constructor(private wsService: WebsocketService) {}

  connect(userId, dialogId, user2Id) {
    this.messages = <Subject<any>>this.wsService
      .connect(userId, dialogId, user2Id);
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

}
