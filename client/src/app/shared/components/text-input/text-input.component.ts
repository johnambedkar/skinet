import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor { // controlvalueaccessor is to access te control value

  @ViewChild('input', {static:true}) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  constructor(@Self() public controlDir: NgControl) { 
    this.controlDir.valueAccessor = this;
  } // Self is for angular depedency injection. it gurantees that we are working with specific control 
                                                        // NgControl is where all the formcontrols are derived from. 
  
  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];  // to check with an api call;
    
    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity(); // try and validates our form on initiazation.
  }

  onChange(event) {}

  onTouched() {}
  
  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
