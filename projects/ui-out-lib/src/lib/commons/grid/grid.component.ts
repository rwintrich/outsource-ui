import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';
import { Product } from './product';
import { from, of, pipe } from 'rxjs';
@Component({
  selector: 'ui-out-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  products!: Product[];

  cols: any[] = [];

  constructor(private productService: GridService) { }

  ngOnInit() {
    const source = from(this.productService.getProductsSmall());
    //emit first item to pass test
    const example = source.pipe(p => p);
    example.subscribe(p => this.products = p.data);

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];
  }

}
