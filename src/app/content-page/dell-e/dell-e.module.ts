import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClipboardButtonComponent, ClipboardOptions, MarkdownModule } from 'ngx-markdown';
import { DellEComponent } from './dell-e.component';

const routes: Routes = [
  {
    path: '',
    component: DellEComponent
  },
]

@NgModule({ declarations: [DellEComponent], imports: [CommonModule,
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
export class DellEModule { }
