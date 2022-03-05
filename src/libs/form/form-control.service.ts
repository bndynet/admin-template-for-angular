import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Field } from './form.types';

@Injectable()
export class FromControlService {
  public toFromGroup(fields: Field[]): FormGroup {
    const controls = {};
    fields.forEach((field) => {
      controls[field.name] = field.required
        ? new FormControl(
            { value: field.value, disabled: !!field.disabled },
            Validators.required
          )
        : new FormControl({ value: field.value, disabled: !!field.disabled });
    });
    return new FormGroup(controls);
  }
}
