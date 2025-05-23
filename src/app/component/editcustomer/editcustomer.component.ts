import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../interfaces/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-edit',
  standalone: false,
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit {
  customerId!: number;
  customerForm!: FormGroup;
  submitted = false;
  loading = true;
  customerNotFound = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^0\d{10}$/)]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      this.customerId = +params['id'];
      this.loadCustomerData();
    });
  }

  get f() { return this.customerForm.controls; }

  loadCustomerData(): void {
    this.customerService.getCustomerById(this.customerId).subscribe(customer => {
      this.loading = false;
      if (customer) {
        this.customerForm.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber,
          email: customer.email,
          address: customer.address
        });
      } else {
        this.customerNotFound = true;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    const updatedCustomer = new Customer(
      this.customerForm.value.firstName,
      this.customerForm.value.lastName,
      this.customerForm.value.phoneNumber,
      this.customerForm.value.email,
      this.customerForm.value.address,
      this.customerId
    );

    this.customerService.updateCustomer(updatedCustomer).subscribe(() => {
      this.router.navigate(['/customers']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }
}
