import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  navigate() {
    this.router.navigate(['/display'])
  }

}
