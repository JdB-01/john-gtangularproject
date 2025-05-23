import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Customer } from '../view-customer/view-customer.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [
      new Customer('Lily', 'Musk', '09017328226', 'Aso Rock Villa, Abuja', 'lilym@gmail.com', 1),
      new Customer('John', 'Dickson', '09004187432', 'Ajah, Lagos', 'bigd@gmail.com', 2),
      new Customer('David', 'Solomon', '09023578241', 'Asokoro, Abuja', 'davido@gmail.com', 3),
      new Customer('Hope', 'Bidemi', '08125684324', 'Surulere, Lagos', 'hope54@gmail.com', 4),
      new Customer('Ese', 'Wilson', '07048921355', 'Ajah, Lagos', 'wilese@gmail.com', 5),
      new Customer('Temi', 'Tayo', '08093257881', 'Lekki, Lagos', 'tt01@gmail.com', 6),
      new Customer('Miriam', 'Bliss', '09026402318', 'Victoria Island, Lagos', 'blessed@gmail.com', 7),
      new Customer('Mese', 'Lionel', '08036458079', 'Ikoyi, Lagos', 'olulionel@gmail.com', 8),
      new Customer('Subomi', 'Angel', '07035814485', 'Lekki, Lagos', 'saucy@gmail.com', 9),
      new Customer('Bolaji', 'Zuckerberg', '09002570752', 'Victoria Island, Lagos', 'boss@gmail.com', 10)
  ];
  
  private customersSubject = new BehaviorSubject<Customer[]>(this.customers);
  
  constructor() {}
  
  getCustomers(): Observable<Customer[]> {
    return this.customersSubject.asObservable();
  }
  
  getCustomerById(id: number): Observable<Customer | undefined> {
    const customer = this.customers.find(c => c.id === id);
    return of(customer);
  }
  
  addCustomer(customer: Customer): Observable<Customer> {
    const maxId = Math.max(...this.customers.map(c => c.id || 0), 0);
    customer.id = maxId + 1;
    this.customers.push(customer);
    this.customersSubject.next([...this.customers]);
    return of(customer);
  }
  
  updateCustomer(customer: Customer): Observable<Customer> {
    const index = this.customers.findIndex(c => c.id === customer.id);
    if (index !== -1) {
      this.customers[index] = customer;
      this.customersSubject.next([...this.customers]);
    }
    return of(customer);
  }
  
  deleteCustomer(id: number): Observable<boolean> {
    const initialLength = this.customers.length;
    this.customers = this.customers.filter(c => c.id !== id);
    this.customersSubject.next([...this.customers]);
    return of(initialLength > this.customers.length);
  }
}
