import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PopupComponent } from 'src/app/popup/popup.component';
import { Api } from 'src/services/Api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public form: FormGroup;
  constructor(private api: Api,@Inject(MAT_DIALOG_DATA) public dialogData: any,
  public dialogRef: MatDialogRef<FooterComponent>,
  private dialog : MatDialog,){
    this.form = new FormGroup({
      email: new FormControl(null),
      feedback: new FormControl(null, Validators.required)
    })
  }
  
  sendMail(){
    if(this.form.get('email')?.value==null){
      this.form.get('email')?.setValue('Unknown');
    }
    const email  = this.form.get('email')?.value;
    const feedback = this.form.get('feedback')?.value;
    this.api.sendMail(email,feedback).subscribe((res)=>{
        if(res.ok==true){
          this.openDialog();          
        }
        this.form.reset();
    })
  }

  openDialog(): void {
    this.dialog.open(PopupComponent,{
      backdropClass: 'backdropBackground'
    })
  }

}
