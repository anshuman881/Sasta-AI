import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue',
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class HomePageComponent {
  public widgets: Array<any> = [
    {
      title: 'Chat Gpt',
      image: 'https://img.icons8.com/nolan/100/chatgpt.png',
      path: 'chatGpt',
    },
    {
      title: 'DALL·E 2',
      image:
        'https://img.freepik.com/free-vector/photo-concept-illustration_114360-161.jpg?w=740&t=st=1678610536~exp=1678611136~hmac=8564638b0a301b2ddb99d8f39f37319504cecb701fa58bcb7b90349855975796',
      path: 'dellE',
    },
  ];

  constructor(private router: Router) {}

  onClick(widget: any) {
    this.router.navigateByUrl(widget.path);
  }
}
