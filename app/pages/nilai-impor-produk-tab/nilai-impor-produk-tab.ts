import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController, Platform} from 'ionic-angular';
import {NilaiImporProdukLinePage} from '../nilai-impor-produk-line/nilai-impor-produk-line';
import {NilaiImporProdukHistogramPage} from '../nilai-impor-produk-histogram/nilai-impor-produk-histogram';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Tabs</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
    </ion-content>
`})
class TabTextPage {
  isAndroid: boolean = false;

  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');
  }
}

@Component({
  template: `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="Line" [root]="tabOne"></ion-tab>
      <ion-tab tabTitle="Histogram" [root]="tabTwo"></ion-tab>
    </ion-tabs>
`})
export class NilaiImporProdukTabPage {
  tabOne = NilaiImporProdukLinePage;
  tabTwo = NilaiImporProdukHistogramPage;
}
