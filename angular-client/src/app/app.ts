import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ApiService, Customer, Product, Bill } from './api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly api = inject(ApiService);
  readonly customers = signal<Customer[]>([]);
  readonly products = signal<Product[]>([]);
  readonly bills = signal<Bill[]>([]);
  readonly selectedBill = signal<Bill | null>(null);
  readonly error = signal('');
  readonly loading = signal(false);

  activeTab = 'dashboard';
  customerDraft: Customer = { name: '', email: '' };
  productDraft: Product = { name: '', price: 0, quantity: 0 };
  editingCustomerId?: number;
  editingProductId?: number;

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set('');
    forkJoin([
      this.api.getCustomers(),
      this.api.getProducts(),
      this.api.getBills(),
    ]).subscribe({
      next: ([customers, products, bills]) => {
      this.customers.set(customers);
      this.products.set(products);
      this.bills.set(bills);
      },
      error: () => this.error.set('Impossible de joindre le gateway. Vérifiez que les services sont démarrés.'),
      complete: () => this.loading.set(false),
    });
  }

  saveCustomer(): void {
    const request = this.editingCustomerId
      ? this.api.updateCustomer(this.editingCustomerId, this.customerDraft)
      : this.api.createCustomer(this.customerDraft);
    request.subscribe({
      next: () => { this.resetCustomer(); this.refresh(); },
      error: error => this.error.set(`La sauvegarde du client a échoué (${error.status || 'réseau'}).`),
    });
  }

  editCustomer(customer: Customer): void {
    this.editingCustomerId = customer.id;
    this.customerDraft = { ...customer };
  }

  deleteCustomer(id?: number): void {
    if (id == null || !confirm('Supprimer ce client ?')) return;
    this.api.deleteCustomer(id).subscribe({
      next: () => this.refresh(),
      error: error => this.error.set(`La suppression du client a échoué (${error.status || 'réseau'}).`),
    });
  }

  saveProduct(): void {
    const request = this.editingProductId
      ? this.api.updateProduct(this.editingProductId, this.productDraft)
      : this.api.createProduct(this.productDraft);
    request.subscribe({
      next: () => { this.resetProduct(); this.refresh(); },
      error: error => this.error.set(`La sauvegarde du produit a échoué (${error.status || 'réseau'}).`),
    });
  }

  editProduct(product: Product): void {
    this.editingProductId = product.id;
    this.productDraft = { ...product };
  }

  deleteProduct(id?: number): void {
    if (id == null || !confirm('Supprimer ce produit ?')) return;
    this.api.deleteProduct(id).subscribe({
      next: () => this.refresh(),
      error: error => this.error.set(`La suppression du produit a échoué (${error.status || 'réseau'}).`),
    });
  }

  showBill(id?: number): void {
    if (id == null) return;
    this.api.getBill(id).subscribe({
      next: bill => this.selectedBill.set(bill),
      error: error => this.error.set(`La facture demandée est introuvable (${error.status || 'réseau'}).`),
    });
  }

  resetCustomer(): void {
    this.editingCustomerId = undefined;
    this.customerDraft = { name: '', email: '' };
  }

  resetProduct(): void {
    this.editingProductId = undefined;
    this.productDraft = { name: '', price: 0, quantity: 0 };
  }
}
