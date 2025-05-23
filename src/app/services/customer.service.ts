import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Customer } from '../view-customer/view-customer.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [
      new Customer('Bolaji', 'Zuckerberg', '09002570752', 'boss@gmail.com', 'Victoria Island, Lagos',  1),
      new Customer('Lily', 'Musk', '09017328226', 'lilym@gmail.com', 'Aso Rock Villa, Abuja', 2),
      new Customer('John', 'Dickson', '09004187432', 'bigd@gmail.com', 'Ajah, Lagos',  3),
      new Customer('David', 'Solomon', '09023578241', 'davido@gmail.com', 'Asokoro, Abuja',  4),
      new Customer('Hope', 'Bidemi', '08125684324', 'hope54@gmail.com', 'Surulere, Lagos',  5),
      new Customer('Ese', 'Wilson', '07048921355', 'wilese@gmail.com', 'Ajah, Lagos',  6),
      new Customer('Temi', 'Tayo', '08093257881', 'tt01@gmail.com', 'Lekki, Lagos',  7),
      new Customer('Miriam', 'Bliss', '09026402318', 'blessed@gmail.com', 'Victoria Island, Lagos',  8),
      new Customer('Mese', 'Lionel', '08036458079', 'olulionel@gmail.com', 'Ikoyi, Lagos',  9),
      new Customer('Subomi', 'Angel', '07035814485', 'saucy@gmail.com', 'Lekki, Lagos',  10),
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
