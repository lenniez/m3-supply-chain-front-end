import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
  
  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  listAllCategories(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/categories`, options)
      .toPromise();
  }

  getSuppliers(): Promise<any> {
    // const options = {
    //   withCredentials: true
    // };
    // return this.httpClient.get(`${this.baseUrl}/movies/${id}`, options)
    //   .toPromise();
    return;
  }
}
