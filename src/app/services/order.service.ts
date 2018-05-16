import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {

  baseUrl = `${environment.apiUrl}/orders`;

  constructor(private httpClient: HttpClient) { }

  listReleventOrders(userId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/${userId}`, options)
      .toPromise();
  }

  placeOrder(order): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/placeorder`, order, options)
      .toPromise();

    }

  updateOrderStatus(stepId): Promise <any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/step/${stepId}`, stepId, options)
      .toPromise();
  }

}
