import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() childMessage! : string

  @Output() parentMessage: EventEmitter<string> = new EventEmitter<string>();


parentFunction() {
  this.parentMessage.emit("Omooo")
}
}

