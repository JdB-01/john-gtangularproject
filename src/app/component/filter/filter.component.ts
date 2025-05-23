import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-customer-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  searchControl = new FormControl('');
  @Output() searchTextChanged = new EventEmitter<string>();

  ngOnInit(): void {
    
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchTextChanged.emit(value || '');
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}


