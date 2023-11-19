import { AfterViewChecked, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAdjustTextSize]',
  standalone: true
})
export class AdjustTextSizeDirective implements AfterViewChecked {
  
  private lastFontSizeIndex: number | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewChecked(): void {
    this.adjustFontSize();
  }

  private adjustFontSize() {
    const element = this.el.nativeElement;
    const parentWidth = element.parentElement.offsetWidth;

    // Tailwind classes pour différentes tailles
    const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
    
    // Commencez par la taille de police actuelle ou la plus grande si non définie
    let sizeIndex = this.lastFontSizeIndex !== null ? this.lastFontSizeIndex : sizes.length - 1; 

    // Trouvez la taille appropriée
    for (let i = sizeIndex; i >= 0; i--) {
      this.renderer.removeClass(element, sizes[i]);
    }
    
    for (let i = sizeIndex; i >= 0; i--) {
      this.renderer.addClass(element, sizes[i]);
      if (element.scrollWidth <= parentWidth) {
        this.lastFontSizeIndex = i;
        break;
      } else if (i === 0) {
        this.lastFontSizeIndex = 0; // Le texte ne peut pas être réduit davantage
      }
      this.renderer.removeClass(element, sizes[i]);
    }
  }
}