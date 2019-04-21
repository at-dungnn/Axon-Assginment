import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { API_KEY } from '../constants/forge.constants';
import { Quota } from '../model/quota.model';
import { Quote } from '../model/quote.model';

@Injectable()

export class ForgeService {

  constructor(
    private http: HttpClient
  ) { }

  // Get quotes for specific currency pair(s)
  public getQuotes(pair: string): Observable<Quote> {
    const apiURL = `https://forex.1forge.com/1.0.3/quotes?pairs=${pair}&api_key=${API_KEY}`;
    return this.http.get(apiURL)
      .pipe(
        map((res: Quote) => {
          return res || null;
        }));
  }

  // Get symbols
  public getSymbols(): Observable<any> {
    const apiURL = `https://forex.1forge.com/1.0.3/symbols?api_key=${API_KEY}`;
    return this.http.get(apiURL)
      .pipe(
        map((res: Response) => {
          return res || {};
        }));
  }

  // Get market status
  public getMarketStatus(): Observable<any> {
    const apiURL = `https://forex.1forge.com/1.0.3/market_status?api_key=${API_KEY}`;
    return this.http.get(apiURL)
      .pipe(
        map((res: Response) => {
          return res || {};
        }));
  }

  // Get data Check your current usage and remaining quota
  public getQuota(): Observable<Quota> {
    const apiURL = `https://forex.1forge.com/1.0.3/quota?api_key=${API_KEY}`;
    return this.http.get(apiURL)
      .pipe(
        map((res: Quota) => {
          return res || null;
        }));
  }

}
