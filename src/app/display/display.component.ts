import { Component, OnInit, ViewChild } from '@angular/core';
import { Api } from 'src/services/Api.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  public question: any;
  public answer: any;
  public data: Array<any> = [];
  public store: string = '';
  public dellE:any;

  constructor(private api: Api) { }

  ngOnInit(): void {
    let st = localStorage.getItem("chatGpt");
    if (st) {
      this.data = JSON.parse(st);
    }
  }

  sendQuesion() {
    const user = {
      "name": "user",
      "content": this.question
    }
    console.log(user);
    this.data.push(user);
    console.log(this.data);
    this.api.chatGpt(this.question).subscribe((res) => {
      if (res) {
        this.question = null;
        const detail = res.choices[0];
        this.answer = detail.message.content;
        const gpt = {
          "name": "gpt",
          "content": this.answer
        }
        this.data.push(gpt);
        localStorage.setItem("chatGpt", JSON.stringify(this.data));
        this.ngOnInit();
      }
    })
  }
}
