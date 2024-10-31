import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  public headers = new HttpHeaders({
    'content-type': 'application/json',
    'X-RapidAPI-Key': '',
    'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
  })

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }

  chatGpt(question: any): Observable<any> {
    let url: string = 'https://openai80.p.rapidapi.com/chat/completions';
    let data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
    };
    return this.http.post(url, data, { headers: this.headers });
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
