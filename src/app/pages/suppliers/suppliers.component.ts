import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  constructor(private productService: ProductService) { }
  suppliers: Array<any>;
  products: Array<any>;
  

  ngOnInit() {

    this.productService.getSuppliers()
      .then((data) => {
        this.suppliers = data;
      })
      .then(() => {
        this.productService.getProducts()
        .then((productResults) => {
          console.log(productResults);
          this.products = productResults;
        })
      });
  }

}