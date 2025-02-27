import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Api } from 'src/services/Api.service';
import { MarkdownService } from 'ngx-markdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { Router } from '@angular/router';
import { VoiceToTextComponent } from '../voice-to-text/voice-to-text.component';

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChatGptComponent implements OnInit, AfterViewInit {

  public loading: boolean = false;
  public form: FormGroup;
  public answer: any;
  public data: Array<any> = [];
  public container = document.getElementById('msgContainer');

  constructor(
    public api: Api,
    public cdRef: ChangeDetectorRef,
    private mdService: MarkdownService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.form = new FormGroup({
      question: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    let st = localStorage.getItem('chatGpt');
    if (st) {
      this.data = JSON.parse(st);
    }
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    let container = document.getElementById('msgContainer');
    if (container?.scrollTop != null) {
      container.scrollTop = container.scrollHeight;
    }
    this.cdRef.detectChanges();
  }

  sendQuestion() {
    this.loading = true;
    const user = {
      time: new Date().getTime(),
      name: 'user',
      content: this.form.get('question')?.value,
    };
    this.localStorageService(user);
    this.api
      .chatGpt(this.form.get('question')?.value)
      .catch(
        catchError((error: HttpErrorResponse) => {
          this.loading = false;
          let dialogRef = this.dialog.open(ErrorPageComponent, {
            data: error
          })
          dialogRef.afterClosed().subscribe(() => {
            this.router.navigateByUrl('/home');
          });
          return EMPTY;
        })
      ).then((res) => {
        if (res) {
          this.loading = false;
          this.form.reset();
          res.subscribe((r)=>{
            const gpt = {
              time: new Date().getTime(),
              name: 'gpt',
              content: r.content.results.text__chat.results[0].message[1].message,
            };
            this.localStorageService(gpt);            
          })
        }
      });
  }

  localStorageService(data: any) {
    this.data.push(data);
    localStorage.setItem('chatGpt', JSON.stringify(this.data));
    this.ngOnInit();
    this.ngAfterViewInit();
  }

  onLoad(data: any) {
    console.log('onloaod');
  }

  onError(data: any) { }

  deleteChat() {
    this.data.splice(0, this.data.length);
    localStorage.removeItem("chatGpt");
    this.ngOnInit();
  }

  openListner() {
    this.form.reset();
    this.dialog.open(VoiceToTextComponent,{
      backdropClass: 'backdropBackground',
    }).afterClosed().subscribe(result => {
      console.log(result);
      if (result != null && result != undefined) {
        this.form.get('question')?.setValue(result);
        this.sendQuestion();
      } else {
        this.form.get('question')?.setValue('Can not understand properly , try again later.');
      }
    })
  }
}
