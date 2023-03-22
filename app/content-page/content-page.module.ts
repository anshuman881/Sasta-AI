import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DellEComponent } from './dell-e/dell-e.component';
import { ChatGptComponent } from './chat-gpt/chat-gpt.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ContentPageComponent } from './content-page.component';
import { WisperComponent } from './wisper/wisper.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ClipboardButtonComponent, ClipboardOptions, MarkdownModule } from 'ngx-markdown';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chatGpt',
    pathMatch: 'full'
  },
  {
    path: 'chatE1',
    component: ChatGptComponent,
    title: "Sasta.AI | Chat.E1"
  },
  {
    path: 'imageE1',
    component: DellEComponent,
    title: "Sasta.AI | Image.E1"
  },
  {
    path: 'talkE1',
    component: WisperComponent,
    title: "Sasta.AI | Talk.E1"
  }
];

@NgModule({
  declarations: [
    DellEComponent,
    ChatGptComponent,
    WisperComponent,
    ContentPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    MatSelectModule,
    MarkdownModule.forRoot({
      clipboardOptions: {
        provide: ClipboardOptions,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      }      
    }),
    MatOptionModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCardModule,
    

    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  exports: [RouterModule]
})
export class ContentPageModule {}
