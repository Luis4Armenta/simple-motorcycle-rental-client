import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {
  callback: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url: 'http://localhost:3000',
      options: {
        query: {
          token: localStorage.getItem('token')
        }
      }
    })
    this.listen();
  }
  
  listen = () => {
    this.ioSocket.on('motorcycles', (res: string) => this.callback.emit(res));
  }

  takeMotorcycle = (scheduleNumber: number) => {
    this.ioSocket.emit('take:event', scheduleNumber);
  }

  returnMotorcycle = () => {
    this.ioSocket.emit('return:event', 0);
  }
}
