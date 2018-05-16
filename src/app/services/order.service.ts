import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  listReleventOrders(userId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/orders/${userId}`, options)
      .toPromise();
  }

  placeOrder(order): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/orders/placeorder`, order, options)
      .toPromise();

    }

  updateOrderStatus(stepId): Promise <any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/orders/step/${stepId}`, stepId, options)
      .toPromise();
  }

}
