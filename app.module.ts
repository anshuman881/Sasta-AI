import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from 'src/util/app-init';
import { APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule} from '@angular/material/menu';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/popup/popup.component';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { VoiceToTextComponent } from 'src/app/content-page/voice-to-text/voice-to-text.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    ErrorPageComponent,
    VoiceToTextComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    KeycloakAngularModule,
    HttpClientModule,
  ],
  providers: [
    // KeycloakService,{
    //   provide:APP_INITIALIZER,
    //   useFactory:initializer,
    //   multi:true,
    //   deps:[KeycloakService]
    // },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
