import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, Observer } from 'rxjs';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { Api } from 'src/services/Api.service';

@Component({
  selector: 'app-dell-e',
  templateUrl: './dell-e.component.html',
  styleUrls: ['./dell-e.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DellEComponent implements OnInit, AfterViewInit {

  @ViewChild('callImageDialog') callImageDialog: TemplateRef<any>;
  public loading: boolean = false;
  public imageName: string = '';
  public base64Image: any;
  public questionstr: string = '';
  public data: Array<any> = [];
  public dellE: any;
  public container = document.getElementById('msgContainer');
  public counts: Array<any> = [{ "value": 1 }, { "value": 2 }, { "value": 3 }, { "value": 4 }, { "value": 5 }, { "value": 6 }, { "value": 7 }, { "value": 8 }, { "value": 9 }, { "value": 10 }];

  public resolutions: Array<any> = [{ "value": "256x256" }, { "value": "512x512" }, { "value": "1024x1024" }];
  public form: FormGroup;
  public seletedImage: any;

  constructor(private api: Api, public cdRef: ChangeDetectorRef,
    private dialog: MatDialog, private router: Router) {
    this.form = new FormGroup({
      question: new FormControl(null, Validators.required),
      // count: new FormControl(1, Validators.required),
      // resolution: new FormControl("1024x1024", Validators.required)
    })
  }

  ngOnInit(): void {

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
    this.questionstr = this.form.get('question')?.value;
    this.form.reset();
    // const count = this.form.get('count')?.value;
    // const resolution = this.form.get('resolution')?.value;
    console.log(this.questionstr);
    this.api.dellEGeneration(this.questionstr, 4, '1024x1024').pipe(
      catchError((error: HttpErrorResponse) => {
        this.dialog.open(ErrorPageComponent, {
          data: error
        }).afterClosed().subscribe(() => {
          this.router.navigateByUrl('/home');
        })
        return EMPTY
      })
    ).subscribe((res) => {
      this.loading = false;
      this.dellE = res.data;
      this.dellE.forEach((element: any) => {
        this.data.push(element)
      });
    })
    this.ngAfterViewInit();
  }

  download(imageUrl: any) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64data: string) => {
      this.base64Image = "data:image/jpg;base64," + base64data;
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", this.imageName.concat('.jpg'));
      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return new Observable((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  openDialog(url: string): void {
    this.seletedImage = url;
    this.dialog.open(this.callImageDialog, {
      backdropClass: 'backdropBackground'
    })
  }

}
