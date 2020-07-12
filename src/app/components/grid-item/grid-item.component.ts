import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent implements OnInit {
  @Input() value: number;

  constructor() { }

  ngOnInit() { }


  onClick() {
    if (this.value == 1) {
      this.value = 0;
    }
    else {
      this.value = 1;
    }
  }

}
