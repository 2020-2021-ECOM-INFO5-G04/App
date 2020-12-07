import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-calcul-prix',
  templateUrl: './calcul-prix.component.html',
})
export class CalculPrixComponent implements OnInit {
  error = false;
  success = false;

  constructor() {}

  ngOnInit(): void {}

  pay(): void {
    this.error = false;
    // add payment service and code
  }
}
