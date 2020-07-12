import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-truthtable',
  templateUrl: './truthtable.page.html',
  styleUrls: ['./truthtable.page.scss'],
})
export class TruthtablePage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  vars: any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.vars = params['n'];

    });
  }

}
