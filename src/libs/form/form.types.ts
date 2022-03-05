import { FormGroup } from '@angular/forms';

export interface Field {
  id?: string;
  name?: string;
  label?: string;
  value?: any;
  options?: FieldOption[];
  placeholder?: string;
  isMultiline?: boolean;
  style?: string;
  labelStyle?: string;

  disabled?: boolean;
  required?: boolean;
  requiredMessage?: string;
}

export interface FieldOption {
  label: string;
  value: string;
  group?: string;
  disabled?: boolean;
}

export interface FieldValueChangeEvent {
  fieldName: string;
  fieldValue: string;
  formGroup: FormGroup;
  event: Event;
}
