import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Api } from 'src/services/Api.service';

@Component({
  selector: 'app-latlong',
  templateUrl: './latlong.component.html',
  styleUrls: ['./latlong.component.scss']
})
export class LatlongComponent {

  public cityForm: FormGroup;
  public latlongForm: FormGroup;
  public distanceForm: FormGroup;
  public counts: Array<any> = [{ "value": 1 }, { "value": 2 }, { "value": 3 }, { "value": 4 }, { "value": 5 }, { "value": 6 }, { "value": 7 }, { "value": 8 }, { "value": 9 }, { "value": 10 }];
  public resolutions: Array<any> = [{ "value": "256x256" }, { "value": "512x512" }, { "value": "1024x1024" }];

  constructor(private api: Api, public cdRef: ChangeDetectorRef) {
    // this.cityForm = new FormGroup({
    //   city1: new FormControl(1, Validators.required),
    //   city2: new FormControl("1024x1024", Validators.required)
    // })
  }

  public findDistanceBetweenCity() {

  }

  public findDistanceBetweenLatLong() {

  }

  public addCity() {

  }
}
