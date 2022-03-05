import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FromControlService } from './form-control.service';
import { Field, FieldOption, FieldValueChangeEvent } from './form.types';

@Component({
  selector: 'el-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormComponent),
      multi: true,
    },
    FromControlService,
  ],
})
export class FormComponent implements OnInit {
  // implements ControlValueAccessor {
  @Input()
  public fields: Field[];
  @Input()
  public formGroup: FormGroup;

  @Output()
  public fieldValueChange = new EventEmitter<FieldValueChangeEvent>();
  @Output()
  public init = new EventEmitter<FormGroup>();

  public fieldOptionGroups: {
    [key: string]: { name?: string; options?: FieldOption[] }[];
  } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formControlService: FromControlService
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.formControlService.toFromGroup(this.fields);

    this.fields.forEach((field) => {
      const fieldOptionGroup = this.fieldOptionGroups[field.name];
      if (!fieldOptionGroup) {
        this.fieldOptionGroups[field.name] = [];
      }
      field.options?.forEach((option) => {
        let group = this.fieldOptionGroups[field.name].find(
          (group) => group.name === option.group
        );
        if (!group) {
          group = { name: option.group, options: [] };
          this.fieldOptionGroups[field.name].push(group);
        }
        group.options.push(option);
      });
    });
    console.log(this.fieldOptionGroups);

    this.init.emit(this.formGroup);
  }

  public changeValue(field: Field, event: Event): void {
    const fc = this.formGroup.get(field.name);
    field.value = fc.value;

    this.fieldValueChange.emit({
      fieldName: field.name,
      fieldValue: field.value,
      formGroup: this.formGroup,
      event: event,
    });
  }

  public getOptionGroups(
    options: FieldOption[]
  ): { name: string; items: FieldOption[] }[] {
    const result = [];
    options.forEach((option) => {
      let groupItem = result.find((item) => item.group === option.group);
      if (!groupItem) {
        groupItem = {
          name: option.group,
          items: [],
        };
        result.push(groupItem);
      }
      groupItem.items.push(option);
    });
    return result;
  }

  writeValue(obj: any): void {
    console.log(obj);
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
