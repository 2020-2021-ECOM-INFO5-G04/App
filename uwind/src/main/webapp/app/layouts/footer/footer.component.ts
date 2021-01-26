import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.scss'],
})
export class FooterComponent {
  medium = false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth < 1000) {
      this.medium = true;
    } else this.medium = false;
  }
}
