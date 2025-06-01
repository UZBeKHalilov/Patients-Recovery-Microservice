import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;
  private notificationSubject = new Subject<string>();

  public notifications$: Observable<string> = this.notificationSubject.asObservable();

  constructor() { }

  public startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalRHubUrl) // O'zgartirilgan qator
      .build();

    return this.hubConnection.start()
      .then(() => console.log('SignalR Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addNotificationListener(): void {
    this.hubConnection.on('ReceiveNotification', (message: string) => {
      console.log('Notification received: ' + message);
      this.notificationSubject.next(message);
    });
  }

  public stopConnection(): void {
    this.hubConnection.stop()
      .then(() => console.log('SignalR Connection stopped'))
      .catch(err => console.log('Error while stopping connection: ' + err));
  }
}