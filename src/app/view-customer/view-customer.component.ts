import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../interfaces/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css',
  standalone: false
})
export class ViewCustomerComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchText = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
       this.applyFilter();
    });
  }
onSearchTextChanged(searchText: string): void {
    this.searchText = searchText;
    this.applyFilter();
  }

  applyFilter(): void {
    if (!this.searchText) {
      this.filteredCustomers = [...this.customers];
      return;
    }

    const searchTermLower = this.searchText.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer => 
      customer.firstName.toLowerCase().includes(searchTermLower) ||
      customer.lastName.toLowerCase().includes(searchTermLower) ||
      customer.phoneNumber.toLowerCase().includes(searchTermLower) ||
      customer.email.toLowerCase().includes(searchTermLower) ||
      customer.address.toLowerCase().includes(searchTermLower)
    );
  }


  editCustomer(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/customers/edit', id]);
    }
  }

  deleteCustomer(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(success => {
        if (success) {
          this.loadCustomers();
        }
      });
    }
  }

  addNewCustomer(): void {
    this.router.navigate(['/customers/add']);
  }
}

export { Customer };
