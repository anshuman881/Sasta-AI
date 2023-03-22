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
      title: 'Chat.E1',
      image: 'assets/img/ai2.png',
      path: 'chatE1',
      desc:'Chat.E1 is an artificial intelligence language model developed by OpenAI.'
    },
    {
      title: 'Image.E1',
      image:
        'assets/img/artist.png',
      path: 'imageE1',
      desc:'Image.E1 is an AI system that can create realistic images and art from a description in natural language.'
    },
  ];

  constructor(private router: Router) {}

  onClick(widget: any) {
    this.router.navigateByUrl(widget.path);
  }
}
