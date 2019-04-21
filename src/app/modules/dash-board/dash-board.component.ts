import { Component, OnInit } from '@angular/core';
import { ForgeService } from 'src/app/services/forge.service';
import { Quota } from 'src/app/model/quota.model';
import { Quote } from 'src/app/model/quote.model';
import 'hammerjs';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  chartValues: Quote[] = [];
  quota: Quota;
  symbols = [];
  titleChart = '';
  marketStatus = false;
  showMarket = false;

  categories: any[] = [];
  private loopEvent: any = null;
  constructor(
    private forgeService: ForgeService
  ) { }

  ngOnInit() {
    this.getSymbolsList();
    this.getQuota();
  }

  // Get data Symbol
  getSymbolsList() {
    this.forgeService.getSymbols().subscribe(
      res => {
        this.symbols = res;
      }
    );
  }
  // Get data quota
  getQuota() {
    this.forgeService.getQuota().subscribe(
      res => {
        this.quota = res;
      }
    );
  }
  // Get data quotes
  getQuote(param) {
    this.forgeService.getQuotes(param).subscribe(
      res => {
        this.titleChart = res[0].symbol;
        this.chartValues = [...this.chartValues, res[0]];
        this.categories = [...this.categories, this.toHHMMSS(res[0].timestamp)];
        this.titleChart = res[0].symbol;
      }
    );
  }
  // Get market status
  getMarketStatus() {
    this.forgeService.getMarketStatus().subscribe(
      res => {
        this.marketStatus = res.market_is_open;
      }
    );
  }
  // Symbols selected
  onSymbolSelected($event) {
    // Clear before change new choosen Symbol
    this.showMarket = true;
    clearInterval(this.loopEvent);
    this.chartValues = [];
    this.categories = [];
    // Start market
    this.loopEvent = setInterval(() => {
      this.getQuote($event);
      this.getMarketStatus();
      this.getQuota();
    }, 2000);
    // Clear Symbol
    if (!!!$event) {
      this.showMarket = false;
      clearInterval(this.loopEvent);
      this.chartValues = [];
      this.categories = [];
    }
  }
  // Convert timestamp to HHMMSS
  toHHMMSS(timestamp) {
    return new Date(timestamp * 1000).getHours() + ':'
      + new Date(timestamp * 1000).getMinutes() + ':'
      + new Date(timestamp * 1000).getSeconds();
  }

}
