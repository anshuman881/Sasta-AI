import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer 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',
  });

  constructor(private http: HttpClient) { }

  chatGpt(question: any): Observable<any> {
    let url: string = 'https://api.openai.com/v1/chat/completions';
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
    let url: string = 'https://api.openai.com/v1/images/generations';
    let data = {
      "n": count,
      "prompt": desc,
      "size": resolution
    };
    return this.http.post(url, data, { headers: this.headers });
  }
}
