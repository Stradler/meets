import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';


@Injectable()
export class WebsocketService {

  private socket;

  constructor() { }

  connect( userId, dialogId, user2Id): Rx.Subject<MessageEvent> {

    this.socket = io('http://localhost:3000',
                      { query: {
                          user_id: userId,
                          dialog_id:dialogId,
                          user2_id:user2Id,
                        }
                      });

    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received message from Websocket Server");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, observable);
  }

}
