import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employeeForm: FormGroup;

  employeeForm1: FormGroup;
  submitted: boolean;
  submitted1: boolean;
  
  constructor(
    public fb: FormBuilder
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.employeeForm = this.fb.group({
      countries: new FormArray([])
    })
    this.employeeForm1 = this.fb.group({
      regions: new FormArray([])
    })
  }

  // Getter to access form control
  get myForm(){
    return this.employeeForm.controls;
  }

  get t() { return this.myForm.countries as FormArray; }

  addAddress() {
    this.t.push(this.fb.group({
      countryName: ['']
    }));
  }

  removeAddress(i: number) {
    this.t.removeAt(i);
  }

  get myForm1(){
    return this.employeeForm1.controls;
  }

  get t1() { return this.myForm1.regions as FormArray; }

  addAddress1() {
    this.t1.push(this.fb.group({
      countryName: [''],
      regionName: ['']
    }));
  }

  removeAddress1(i: number) {
    this.t1.removeAt(i);
  }

  onSubmit(){
    // console.log('submit');
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.employeeForm.value, null, 4));
    }
  }

  onSubmit1(){
    // console.log('submit1');
    this.submitted1 = true;
    if (!this.employeeForm1.valid) {
      return false;
    } else {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.employeeForm1.value, null, 4));
    }
  }

}
