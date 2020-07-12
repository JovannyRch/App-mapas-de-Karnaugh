import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
})
export class GridPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  vars: any;
  grid: any;
  miniterminos: any = [];
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.vars = params['n'];
    });
    this.buildGrid(this.vars);
  }

  buildGrid(m) {
    let n = parseInt(m);
    let size = Math.pow(2, n);
    let mins = [];
    for (let i = 0; i < size; i++) {
      mins.push({ min: i, value: 0 });
    }

    if (n == 2) {
      this.grid = [
        [0, 2],
        [1, 3],
      ];
    }
  }

  click(min) {
    if (this.miniterminos.indexOf(min) >= 0) {
      this.miniterminos.splice(this.miniterminos.indexOf(min), 1);
    } else {
      this.miniterminos.push(min);
    }
  }

  value(min) {
    return this.miniterminos.indexOf(min) >= 0 ? 1 : 0;
  }
  /* goResult() {
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


  } */




}
