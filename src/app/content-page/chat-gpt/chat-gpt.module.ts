import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatGptComponent } from './chat-gpt.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardButtonComponent, ClipboardOptions, MarkdownModule } from 'ngx-markdown';

const routes: Routes = [
  {
    path: '',
    component: ChatGptComponent
  },
]

@NgModule({ declarations: [ChatGptComponent], imports: [CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MarkdownModule.forRoot({
            clipboardOptions: {
                provide: ClipboardOptions,
                useValue: {
                    buttonComponent: ClipboardButtonComponent,
                },
            }
        })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ChatGptModule { }
