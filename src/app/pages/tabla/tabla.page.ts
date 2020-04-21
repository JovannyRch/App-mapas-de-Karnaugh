import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.page.html',
  styleUrls: ['./tabla.page.scss'],
})
export class TablaPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  numberVar = 2;
  tabla = [];
  variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.numberVar = params['n'];

    });
    this.buildTable();
  }

  formatBin(bin, n) {
    while (bin.length < n) {
      bin = "0" + bin;
    }
    return bin;
  }



  //Build table
  buildTable() {

    for (let i = 0; i < Math.pow(2, this.numberVar); i++) {
      let bin = this.formatBin(i.toString(2), this.numberVar);
      this.tabla.push(this.row(i, bin.split("")));
    }
    console.log(this.tabla);
  }


  row(m, bin) {
    return {
      m,
      bin,
      val: 0
    };
  }

  buildArray(n) {
    let res = [];
    for (let i = 0; i < n; i++) res.push(i);
    return res;
  }

  changeDefault(val) {
    for (let r of this.tabla) {
      r.val = val;
    }
  }

  goResult() {
    let ms = [];
    let d = [];
    for (let r of this.tabla) {
      if (r.val == 1) {
        ms.push(r.m);
      }
      else if (r.val == 3) {
        d.push(r.m);
      }
    }

    let navigationExtras: NavigationExtras = {
      queryParams: { ms: ms.join(','), d: d.join(',') }

    };
    this.router.navigate(['result'], navigationExtras);


  }



}
