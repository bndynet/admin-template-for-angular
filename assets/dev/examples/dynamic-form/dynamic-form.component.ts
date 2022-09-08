import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldValueChangeEvent } from 'src/libs/form';

@Component({
  selector: 'app-example-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  public formStatus;
  public fields: Field[] = [
    {
      name: 'yourName',
      label: 'Your Name',
      value: 'Bing',
      required: true,
      requiredMessage: 'Your name is required.',
      placeholder: 'Your full name',
      style: 'font-size: 1.25rem; height: 2rem',
      labelStyle: 'font-weight: bold;',
    },
    {
      name: 'yourCompany',
      label: 'Your Company',
      value: 'BNDY-NET',
      disabled: true,
    },
    {
      name: 'yourCountry',
      label: 'Your Country',
      // value: 'us',
      options: [
        { label: 'China', value: 'cn', group: 'ASIA' },
        { label: 'United State', value: 'us', group: 'EMEA' },
      ],
    },
    {
      name: 'yourcountry1',
      label: 'Has Placeholder',
      placeholder: 'select one',
      // value: 'us',
      options: [
        { label: 'China', value: 'cn', group: 'ASIA' },
        { label: 'United State', value: 'us', group: 'EMEA' },
      ],
    },
    {
      name: 'des',
      label: 'Your Description',
      isMultiline: true,
    },
  ];

  show(): void {
    console.log(this.fields);
  }

  formInit(fg: FormGroup): void {
    this.formStatus = fg.status;
  }

  formValueChange(e: FieldValueChangeEvent): void {
    this.formStatus = e.formGroup.status;
    console.log(e);
  }

  constructor() {}

  ngOnInit(): void {}
}
