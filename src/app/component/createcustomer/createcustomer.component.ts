import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../interfaces/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-add',
  standalone: false,
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {
  customerForm!: FormGroup;
  submitted = false;

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
  }

  get f() { return this.customerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    const newCustomer = new Customer(
      this.customerForm.value.firstName,
      this.customerForm.value.lastName,
      this.customerForm.value.phoneNumber,
      this.customerForm.value.email,
      this.customerForm.value.address
    );

    this.customerService.addCustomer(newCustomer).subscribe(() => {
      this.router.navigate(['/customers']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }
}