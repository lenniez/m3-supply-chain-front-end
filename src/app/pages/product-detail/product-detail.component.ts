import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  idProduct: string;
  subcomponents: Array<any>;
  error: string;
  user: any;

  constructor(private authService: AuthService  ,private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, private orderService: OrderService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.idProduct = params.id;
      this.productService.getOneProduct(this.idProduct)
        .then((data) => {
          this.product = data;
          this.subcomponents = data.subComponents;
        });
    });

    this.user = this.authService.getUser();
  }

  placeOrder() {
    const order = {
      product: this.idProduct,
      brandId: this.user._id,
      supplierId: this.product.supplier
    }

    this.orderService.placeOrder(order)
    .then((result) => {
      this.router.navigate(['/openorders']);
      })
      .catch((err) => {
        this.error = err.error.code;
      });
  }

}
