import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Customer { id?: number; name: string; email: string; }
export interface Product { id?: number; name: string; price: number; quantity: number; }
export interface ProductItem { id?: number; productId: number; price: number; quantity: number; product?: Product; }
export interface Bill { id?: number; billingDate: string; customerId: number; customer?: Customer; productItems: ProductItem[]; }
interface HalResponse<T> { _embedded?: Record<string, T[]>; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly gateway = 'http://localhost:8888';

  getCustomers(): Observable<Customer[]> { return this.collection<Customer>('CUSTOMER-SERVICE/customers', 'customers'); }
  getProducts(): Observable<Product[]> { return this.collection<Product>('INVENTORY-SERVICE/products', 'products'); }
  getBills(): Observable<Bill[]> { return this.collection<Bill>('BILLING-SERVICE/bills', 'bills'); }
  getBill(id: number): Observable<Bill> { return this.http.get<Bill>(`${this.gateway}/BILLING-SERVICE/bills/${id}`); }
  createCustomer(customer: Customer) { return this.http.post(`${this.gateway}/CUSTOMER-SERVICE/customers`, customer); }
  updateCustomer(id: number, customer: Customer) { return this.http.put(`${this.gateway}/CUSTOMER-SERVICE/customers/${id}`, customer); }
  deleteCustomer(id: number) { return this.http.delete(`${this.gateway}/CUSTOMER-SERVICE/customers/${id}`); }
  createProduct(product: Product) { return this.http.post(`${this.gateway}/INVENTORY-SERVICE/products`, product); }
  updateProduct(id: number, product: Product) { return this.http.put(`${this.gateway}/INVENTORY-SERVICE/products/${id}`, product); }
  deleteProduct(id: number) { return this.http.delete(`${this.gateway}/INVENTORY-SERVICE/products/${id}`); }

  private collection<T>(path: string, key: string): Observable<T[]> {
    return this.http.get<HalResponse<T> | T[]>(`${this.gateway}/${path}`).pipe(
      map(response => Array.isArray(response) ? response : response._embedded?.[key] ?? []),
    );
  }
}
