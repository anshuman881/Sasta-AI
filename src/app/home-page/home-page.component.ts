import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePageComponent {
  public widgets: Array<any> = [
    {
      title: 'Chat.E1',
      image: 'assets/img/ai2.png',
      path: 'chatE1',
      desc:'Chat.E1 is an artificial intelligence language model developed by Sasta.AI.It use chatGPT api.'
    },
    {
      title: 'Image.E1',
      image:
        'assets/img/artist.png',
      path: 'imageE1',
      desc:'Image.E1 is an AI system that can create realistic images and art from a description in natural language by using DELL-E2 api.'
    },
    {
      title: 'LatLongDistance.E1',
      image:
        'assets/img/globe.png',
      path: 'latlongE1',
      desc:'Find the Distance Between two city , city latitude & longniude & find distance between two cordinate.'
    }
  ];

  constructor(private router: Router) {}

  onClick(widget: any) {
    this.router.navigateByUrl(widget.path);
  }
}
