import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
    
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  listAllCategories(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/categories`, options)
      .toPromise();
  }

  getSuppliers(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/suppliers`, options)
      .toPromise();
  }

  getProducts(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/products`, options)
      .toPromise();
  }

  getOneProduct(id): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/products/${id}`, options)
      .toPromise();
  }

}
