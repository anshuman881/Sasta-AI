import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Api } from 'src/services/Api.service';

@Component({
  selector: 'app-dell-e',
  templateUrl: './dell-e.component.html',
  styleUrls: ['./dell-e.component.scss']
})
export class DellEComponent implements OnInit {

  public imageName: string = '';
  public base64Image: any;
  public question: string = '';
  public data: Array<any> = [];
  public dellE: any;
  public sendBtn: any = 'submit-icon';
  public counts: Array<any> = [{ "value": 1 }, { "value": 2 }, { "value": 3 }, { "value": 4 }, { "value": 5 }, { "value": 6 }, { "value": 7 }, { "value": 8 }, { "value": 9 }, { "value": 10 }];

  public resolutions: Array<any> = [{ "value": "256x256" }, { "value": "512x512" }, { "value": "1024x1024" }];
  public form: FormGroup;

  constructor(private api: Api, public cdRef: ChangeDetectorRef) {
    this.form = new FormGroup({
      question: new FormControl(null, Validators.required),
      count: new FormControl(1, Validators.required),
      resolution: new FormControl("1024x1024", Validators.required)
    })
  }

  ngOnInit(): void {
  }

  active() {
    if (this.question == '') {
      this.sendBtn = 'submit-icon';
    } else {
      this.sendBtn = 'submit-icon-content';
    }
  }

  sendQuesion() {
    const question = this.form.get('question')?.value;
    const count = this.form.get('count')?.value;
    const resolution = this.form.get('resolution')?.value;
    this.api.dellEGeneration(question, count, resolution).subscribe((res) => {
      this.dellE = res.data;
      this.dellE.forEach((element: any) => {
        this.data.push(element)
        this.imageName = this.form.get('question')?.value;
        this.question = '';
        this.active();
      });
    })
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

}
