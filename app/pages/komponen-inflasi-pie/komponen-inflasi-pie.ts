import {Component, OnInit, OnChanges, Output, AfterViewInit, EventEmitter, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';

/*
  Generated class for the KomponenInflasiPiePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/komponen-inflasi-pie/komponen-inflasi-pie.html',
})
export class KomponenInflasiPiePage {
  url: String;
  data: Array<any>;
  dateArr: Array<Date>;
  options: any;
  tahun: any;

  constructor(public nav: NavController, private dataService: DataService, private loadOptions: Options) {

  }

  ngOnInit(): void {
    console.log('on ngOnInit');
    this.tahun = 2012;
    this.url = "https://api.kawaljakarta.org/v1/komponen-inflasi/key=tahun&gd=%22"
                +(this.tahun - 1).toString()+"%22&ld=%22"+this.tahun.toString()+"%22";
    this.loadData(this.url);
  }

  loadData(url): void {
    console.log('on loadData(): void');
    this.dataService.load(this.url)
      .then(data => {
        this.data = this.handleData(data);
        this.options = this.loadOptions.loadOptionPie("");
        this.dateArr = this.selectDistinct("tahun", data);
        // console.log(this.dateArr);
        // console.log(this.data);
      });
  }

  handleData(datum) {
    let dataArr = [];
    for (let data of datum) {
      dataArr.push({
        key: data.komponen,
        y: data.persen_inflasi
      });
    }
    return dataArr;
  }

  // get unique array of tahun
  selectDistinct(distinct, arrObj) {
    var flags = [], dataDistinct = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      if (flags[arrObj[i][distinct]]) continue;
      flags[arrObj[i][distinct]] = true;
      dataDistinct.push(arrObj[i][distinct]);
    }
    return dataDistinct;
  }
}
