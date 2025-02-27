import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { KeycloakApi } from 'src/services/Keycloak.service';
import { MatDialog } from '@angular/material/dialog';
import { Api } from 'src/services/Api.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("0s",keyframes([
          style({ transform: 'translateX(0)'}),
        ]))
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {

  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'];
  }

  @ViewChild('loadProfile') loadProfile: TemplateRef<any>;
  public appName: string = '';
  public chatE1: boolean = false;
  public imageE1: boolean = false;
  public latlongE1: boolean = false;
  public home: boolean = true;
  public userDetail: any;
  public imageSrc: any;
  public spinclass: any;
  public shipName: string;
  public cordinate: any;
  public planetName: string;

  constructor(public title: Title, private router: Router, private keycloakApi: KeycloakApi, private dialog: MatDialog, private api: Api) {
    this.router.events.subscribe((val) => {
      if (title.getTitle().includes('Home')) {
        this.setAppNameAndImg('SASTA.AI','assets/img/ai3.png','spin');
      } else if (title.getTitle().includes('Chat')) {
        this.setAppNameAndImg('Chat.E1','assets/img/ai2.png','');
      } else if (title.getTitle().includes('Image')){
        this.setAppNameAndImg('Image.E1','assets/img/artist.png','');
      } else {
        this.setAppNameAndImg('LatLong.E1','assets/img/globe.png','spin');
      }
      this.hideContentPageWise();
    });
  }

  ngOnInit(): void {
  }

  setAppNameAndImg(appName: any, imageSrc: any, spinclass: any) {
    this.appName = appName;
    this.imageSrc = imageSrc;
    this.spinclass = spinclass;
  }

  hideContentPageWise() {
    if (this.appName == 'SASTA.AI') {
      this.setTrueFalseAsPerPage(true,false,false,false);
    } else if (this.appName == 'Chat.E1') {
      this.setTrueFalseAsPerPage(false,true,false,false);
    } else if((this.appName == 'Image.E1')){
      this.setTrueFalseAsPerPage(false,false,true,false);
    } else {
      this.setTrueFalseAsPerPage(false,false,false,true);
    }
  }

  setTrueFalseAsPerPage(home: any, chatE1: any, imageE1: any, latlongE1: any) {
    this.home = home;
    this.chatE1 = chatE1;
    this.imageE1 = imageE1;
    this.latlongE1 = latlongE1;
  }

  logout() {
    //this.keycloak.logout();
  }

  loadUserProfile() {
    let selector: string = this.userDetail.id;
    switch (selector.charAt(0)) {
      case '1':
        this.setShipAndPlanetName('Thrunzun','TOI-700 e');
        break;
      case '2':
        this.setShipAndPlanetName('Xukten','Wolf 1069 b');
        break;
      case '3':
        this.setShipAndPlanetName('Nokkun','AF Leporis b');
        break;
      case '4':
        this.setShipAndPlanetName('Heimul','L 363-38 b');
        break;
      case '5':
        this.setShipAndPlanetName('Sceek’uks','Kepler-1976 b');
        break;
      case '6':
        this.setShipAndPlanetName('Namno','LTT 1445 A c');
        break;
      case '7':
        this.setShipAndPlanetName('Mozoih','K2-381 c');
        break;
      case '8':
        this.setShipAndPlanetName('Esai','HIP 94235 b');
        break;
      case '9':
        this.setShipAndPlanetName('Eviks','Ross 508 b');
        break;
      case 'o':
        this.setShipAndPlanetName('Shaahriex','NGTS-20 b');
        break;
      default:
        this.setShipAndPlanetName('Garqoix','CHXR 73 b');
        break;
    }

    this.api.liveISSLocation().subscribe((res) => {
      this.cordinate = res;
    })

    this.dialog.open(this.loadProfile, {
      backdropClass: 'backdropBackground',
    })
  }

  setShipAndPlanetName(shipName:any,planetName:any){
    this.shipName = shipName;
    this.planetName = planetName;
  }

}
