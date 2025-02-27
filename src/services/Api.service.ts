import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  headers = { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmQzOGM2OTQtMTg1NC00NTkyLTg4NmEtY2I2N2RkODg2NTQ3IiwidHlwZSI6ImFwaV90b2tlbiJ9.7pRTj0qpWm-rcF3m1H6seYm8ZxDf-3B_73m7IH12s08" }

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }

  async chatGpt(question: any): Promise<Observable<any>> {
    const res = await this.nestedCall(question).toPromise();
    let getUrl: string = 'https://api.edenai.run/v2/workflow/df6d372d-f810-4f2f-9524-119cad7d7010/execution/';
    getUrl = getUrl + res.id;
    console.log(getUrl);
    return this.http.get(getUrl, { headers: this.headers });
  }

  nestedCall(question: any): Observable<any> {
    let postUrl: string = 'https://api.edenai.run/v2/workflow/df6d372d-f810-4f2f-9524-119cad7d7010/execution/';
    let payload = { "text": question }
    return this.http.post(postUrl, payload, { headers: this.headers });
  }

  dellEGeneration(desc: any, count: any, resolution: any): Observable<any> {
    console.log(desc, count, resolution);
    let url: string = 'https://openai80.p.rapidapi.com/images/generations';
    let data = {
      n: count,
      prompt: desc,
      size: resolution,
    };
    return this.http.post(url, data, { headers: this.headers });
  }

  sendMail(email: any, feedback: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      'https://formspree.io/f/xdovlgaz',
      { name: email, message: feedback },
      { headers: headers }
    );
  }

  liveISSLocation(): Observable<any> {
    return this.http.get('https://api.wheretheiss.at/v1/satellites/25544');
  }

}
