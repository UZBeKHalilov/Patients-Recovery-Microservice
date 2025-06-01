import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MedicF';
  private notificationSubscription!: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.startConnection().then(() => {
      this.notificationService.addNotificationListener();
      this.notificationSubscription = this.notificationService.notifications$.subscribe(message => {
        // Handle incoming notifications here (e.g., display a toast, update a list)
        console.log('App Component received notification: ' + message);
        alert(message); // For demonstration, you might use a more sophisticated notification system
      });
    }).catch(err => console.error(err));
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    this.notificationService.stopConnection();
  }
}
