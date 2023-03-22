import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent { 

  constructor(public dialogRef: MatDialogRef<PopupComponent>){    
  }

  onClick(){
    this.dialogRef.close();
  }
}
