import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { KeycloakApi } from 'src/services/Keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public appName: String = '';
  public chatE1: boolean = false;
  public imageE1: boolean = false;
  public home: boolean = true;
  public userDetail : any;
  public imageSrc :any;

  constructor(public title: Title, private router: Router, private keycloakApi: KeycloakApi) {
    router.events.subscribe((val) => {
      if (title.getTitle().includes('Home')) {
        this.appName = 'SASTA.AI';
        this.imageSrc='assets/img/ai3.png';
      } else if (title.getTitle().includes('Chat')) {
        this.appName = 'Chat.E1';
        this.imageSrc='assets/img/ai2.png';
      } else {
        this.appName = 'Image.E1';
        this.imageSrc='assets/img/artist.png';
      }
      this.hideContentPaseWise();
    });
  }

  ngOnInit(): void {
    this.keycloakApi.getUserDetail().subscribe((res) => {
      this.userDetail = res;
    })
  }

  hideContentPaseWise() {
    if (this.appName == 'SASTA.AI') {
      this.home = true;
      this.chatE1 = false;
      this.imageE1 = false;
    } else if (this.appName == 'Chat.E1') {
      this.home = false;
      this.chatE1 = true;
      this.imageE1 = false;
    } else {
      this.home = false;
      this.chatE1 = false;
      this.imageE1 = true;
    }
  }
  deleteLocalstorage() {
    localStorage.removeItem("chatGpt");
    location.reload();
  }
}
