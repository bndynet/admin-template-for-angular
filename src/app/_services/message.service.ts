import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageEntity } from '../app-types';
@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor(
    private http: HttpClient,
  ) {

  }

  getMessage(): Observable<MessageEntity[]> {
    return this.http.get<MessageEntity[]>(`/assets/messages.json`);
  }

  send(msg: string): void {
    console.debug(msg);
  }
}