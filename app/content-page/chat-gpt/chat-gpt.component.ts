import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Api } from 'src/services/Api.service';
import { MarkdownService } from 'ngx-markdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChatGptComponent implements OnInit {

  public form:FormGroup;
  public answer: any;
  public data: Array<any> = [];
  public sendBtn: any = 'submit-icon';

  constructor(public api: Api, public cdRef: ChangeDetectorRef, private mdService: MarkdownService) {
    this.form = new FormGroup({
      question :new FormControl(null,Validators.required),
    })
   }

  ngOnInit(): void {
    let st = localStorage.getItem('chatGpt');
    if (st) {
      this.data = JSON.parse(st);
    }
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  sendQuesion() {
    const user = {
      time: new Date().getTime(),
      name: 'user',
      content: this.form.get('question')?.value,
    };
    this.localStorageService(user);
    this.api.chatGpt(this.form.get('question')?.value).subscribe((res) => {
      if (res) {
        this.form.get('question')?.setValue(null);
        const detail = res.choices[0];
        this.answer = detail.message.content;
        const gpt = {
          time: new Date().getTime(),
          name: 'gpt',
          content: this.answer,
        };
        this.localStorageService(gpt);
      }
    });
  }

  localStorageService(data: any) {
    this.data.push(data);
    localStorage.setItem('chatGpt', JSON.stringify(this.data));
    this.ngOnInit();
  }

  onLoad(data: any) {
  }

  onError(data: any) {
  }

}
