import { Pipe, PipeTransform } from '@angular/core';
import { currencies } from './shared/constants/constants';

@Pipe({
  name: 'numeral',
  standalone: true
})
export class NumeralPipe implements PipeTransform {
  private currencySymbols: { [key: string]: string } = currencies;

  transform(value: number, currencyCode = 'USD'): string {
    if (isNaN(value)) {
      return ''; // ou retourner une chaîne indiquant une valeur non valide
    }

    let num = value;
    const symbols = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
    let tier = Math.log10(num) / 3 | 0;
    let scale = Math.pow(10, tier * 3);
    let scaled = num / scale;
    let formatted = scaled % 1 !== 0 ? scaled.toFixed(1) : scaled.toString();

    // Appliquer le format de la devise et le suffixe numéral
    return this.formatCurrency(formatted, currencyCode) + (tier > 0 ? symbols[tier] : '');
  }

  private formatCurrency(value: string, currencyCode: string): string {
    // Utiliser le symbole de la devise si disponible
    const currencySymbol = this.currencySymbols[currencyCode] || '';
    return `${currencySymbol}${value}`;
  }
}
