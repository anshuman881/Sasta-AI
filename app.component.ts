import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { KeycloakApi } from 'src/services/Keycloak.service';
import { KeycloakService } from 'keycloak-angular';
import { MatDialog } from '@angular/material/dialog';
import { Api } from 'src/services/Api.service';
// import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('routeAnimation', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate("0s",keyframes([
  //         style({ transform: 'translateX(0)'}),
  //       ]))
  //     ]),
  //   ])
  // ]
})
export class AppComponent implements OnInit {

  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'];
  }

  @ViewChild('loadProfile') loadProfile: TemplateRef<any>;
  public appName: String = '';
  public chatE1: boolean = false;
  public imageE1: boolean = false;
  public latlongE1: boolean = false;
  public home: boolean = true;
  public userDetail: any;
  public imageSrc: any;
  public spinclass: any;

  constructor(public title: Title, private router: Router, private keycloakApi: KeycloakApi, private keycloak: KeycloakService, private dialog: MatDialog, private api: Api) {
    this.router.events.subscribe((val) => {
      if (title.getTitle().includes('Home')) {
        this.appName = 'SASTA.AI';
        this.imageSrc = 'assets/img/ai3.png';
        this.spinclass = 'spin';
      } else if (title.getTitle().includes('Chat')) {
        this.appName = 'Chat.E1';
        this.imageSrc = 'assets/img/ai2.png';
        this.spinclass = '';
      } else if (title.getTitle().includes('Image')){
        this.appName = 'Image.E1';
        this.imageSrc = 'assets/img/artist.png';
        this.spinclass = '';
      } else {
        this.appName = 'LatLong.E1';
        this.imageSrc = 'assets/img/globe.png';
        this.spinclass = 'spin';
      }
      this.hideContentPageWise();
    });
  }

  ngOnInit(): void {
    this.keycloakApi.getUserDetail().subscribe((res) => {
      this.userDetail = res;
    })
  }

  hideContentPageWise() {
    if (this.appName == 'SASTA.AI') {
      this.home = true;
      this.chatE1 = false;
      this.imageE1 = false;
      this.latlongE1 = false;
    } else if (this.appName == 'Chat.E1') {
      this.home = false;
      this.chatE1 = true;
      this.imageE1 = false;
      this.latlongE1 = false;
    } else if((this.appName == 'Image.E1')){
      this.home = false;
      this.chatE1 = false;
      this.imageE1 = true;
      this.latlongE1 = false;
    } else {
      this.home = false;
      this.chatE1 = false;
      this.imageE1 = false;
      this.latlongE1 = true;
    }
  }

  logout() {
    this.keycloak.logout();
  }

  public shipName: string;
  public cordinate: any;
  public planetName: string;

  loadUserProfile() {
    var selector: String = this.userDetail.id;
    switch (selector.charAt(0)) {
      case '1':
        this.shipName = 'Thrunzun',
          this.planetName = 'TOI-700 e'
        break;
      case '2':
        this.shipName = 'Xukten',
          this.planetName = 'Wolf 1069 b'
        break;
      case '3':
        this.shipName = 'Nokkun',
          this.planetName = 'AF Leporis b'
        break;
      case '4':
        this.shipName = 'Heimul',
          this.planetName = 'L 363-38 b'
        break;
      case '5':
        this.shipName = 'Sceek’uks',
          this.planetName = 'Kepler-1976 b'
        break;
      case '6':
        this.shipName = 'Namno',
          this.planetName = 'LTT 1445 A c'
        break;
      case '7':
        this.shipName = 'Mozoih',
          this.planetName = 'K2-381 c'
        break;
      case '8':
        this.shipName = 'Esai',
          this.planetName = 'HIP 94235 b'
        break;
      case '9':
        this.shipName = 'Eviks',
          this.planetName = 'Ross 508 b'
        break;
      case 'o':
        this.shipName = 'Shaahriex',
          this.planetName = 'NGTS-20 b'
        break;
      default:
        this.shipName = 'Garqoix',
          this.planetName = 'CHXR 73 b'
        break;
    }

    this.api.liveISSLocation().subscribe((res) => {
      this.cordinate = res;
    })

    this.dialog.open(this.loadProfile, {
      backdropClass: 'backdropBackground',
    })
  }

}
