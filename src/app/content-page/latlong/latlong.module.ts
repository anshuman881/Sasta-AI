import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LatlongComponent } from './latlong.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: LatlongComponent
  },
]

@NgModule({ declarations: [
        LatlongComponent
    ], imports: [CommonModule,
        RouterModule.forChild(routes),
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatOptionModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class LatlongModule { }
