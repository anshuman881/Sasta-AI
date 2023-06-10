import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatGptComponent } from './chat-gpt.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardButtonComponent, ClipboardOptions, MarkdownModule } from 'ngx-markdown';

const routes: Routes = [
  {
    path: '',
    component: ChatGptComponent
  },
]

@NgModule({
  declarations: [ChatGptComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      clipboardOptions: {
        provide: ClipboardOptions,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      }
    }),
  ]
})
export class ChatGptModule { }
