import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) { }

  numVars = [2, 3, 4, 5, 6];
  onSelectNum(n) {
    let navigationExtras: NavigationExtras = {
      queryParams: { n: n }
    };
    this.router.navigate(['tabla'], navigationExtras);
  }


}
