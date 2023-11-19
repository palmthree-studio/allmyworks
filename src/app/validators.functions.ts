import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function linkedFieldsValidator(field1: string, field2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;  // Cast en tant que FormGroup
    const f1 = group.get(field1)?.value;
    const f2 = group.get(field2)?.value;

    // Si l'un des deux champs est rempli et l'autre non, renvoyez une erreur
    if ((f1 && !f2) || (!f1 && f2)) {
      // Renvoie un objet d'erreur avec une clé personnalisée
      return { 'linkedFields': true };
    }

    return null;  // Aucune erreur si les conditions ne sont pas remplies
  };
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Si le champ est vide, ne renvoie pas d'erreur
    if (!value) {
      return null;
    }

    // Expression régulière pour valider l'URL
    const pattern = /^(http|https):\/\/[^ "]+$/;
    const isValid = pattern.test(value);

    // Renvoie un objet d'erreur si l'URL n'est pas valide
    return isValid ? null : { 'invalidUrl': true };
  };
}