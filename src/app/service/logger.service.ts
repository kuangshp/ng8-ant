import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(msg: string): void {
    console.log(msg);
  }

  error(msg: string, obj = {}): void {
    console.error(msg, obj);
  }
  constructor() { }
}
