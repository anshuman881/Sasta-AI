import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public home : string = 'home';
  deleteLocalstorage(){
    localStorage.removeItem("chatGpt");
    location.reload();
  }
}
