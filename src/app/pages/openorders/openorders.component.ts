import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-openorders',
  templateUrl: './openorders.component.html',
  styleUrls: ['./openorders.component.css']
})
export class OpenOrdersComponent implements OnInit {

  id: String;
  orders: Array<any>;
  nextAction: Object;
  error: String;
  user: any;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private authService: AuthService ) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    // @todo make this into an observable -- work with andre
    this.orderService.listReleventOrders(this.user._id)
      .then((data) => {
        this.orders = data;
      })
      .catch((err) => {
        this.error = err.error.code;
      });

    }
   
  
}

