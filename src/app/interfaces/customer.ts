
export class Customer {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;

  constructor(firstName: string, lastName: string, phoneNumber: string, email: string, address: string, id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
  }
}
