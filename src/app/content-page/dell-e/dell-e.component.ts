import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Api } from 'src/services/Api.service';

@Component({
  selector: 'app-dell-e',
  templateUrl: './dell-e.component.html',
  styleUrls: ['./dell-e.component.scss']
})
export class DellEComponent implements OnInit {

  public question: string = '';
  public data: Array<any> = [];
  public dellE: any;
  public sendBtn: any = 'submit-icon';
  public counts: Array<any> = [{ "value": 1 }, { "value": 2 }, { "value": 3 }, { "value": 4 },{ "value": 5 }, { "value": 6 }, { "value": 7 }, { "value": 8},{ "value": 9 }, { "value": 10 }];
  
  public resolutions: Array<any> = [{ "value": "256x256" }, { "value": "512x512" }, { "value": "1024x1024" }];
  public form: FormGroup;

  constructor(private api: Api) {
    this.form = new FormGroup({
      question: new FormControl(null, Validators.required),
      count: new FormControl(1, Validators.required),
      resolution: new FormControl("1024x1024", Validators.required)
    })
  }

  ngOnInit(): void {

  }

  active() {
    if (this.question == '') {
      this.sendBtn = 'submit-icon';
    } else {
      this.sendBtn = 'submit-icon-content';
    }
  }

  sendQuesion() {
    const question = this.form.get('question')?.value;
    const count = this.form.get('count')?.value;
    const resolution = this.form.get('resolution')?.value;
    console.log(question, count, resolution);
    this.api.dellEGeneration(question, count, resolution).subscribe((res) => {
      this.dellE = res.data;
      this.dellE.forEach((element: any) => {
        this.data.push(element)
        this.question = '';
        this.active();
      });
    })
  }
}
