import { Employee } from './../../model/Employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  employeeData: Employee[];
  employee: any;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  // countries: any;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      countries: new FormArray([])
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  get t() { return this.myForm.countries as FormArray; }

  // addAddress() {
  //   this.t.push(this.fb.group({
  //     countryName: ['']
  //   }));

  //   // this.editForm.get('countries').push({
  //   //   countryName: ['']
  //   // });
  // }
  addAddress(country = '') {
    this.t.push(this.fb.group({
      countryName: [country]
    }));

    // this.editForm.get('countries').push({
    //   countryName: ['']
    // });
  }

  removeAddress(i: number) {
    this.t.removeAt(i);
  }

  removeAdd(i: number) {
    this.t.removeAt(i);
  }

  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      this.employee = data;
      // this.countries = data.countries;
      // console.log(this.countries[0].countryName);

      // console.log(data);
      // for (let i = 0; i < this.countries.length; i++) {
      //   this.editForm.patchValue({
      //     name: this.employee.name,
      //     email: this.employee.email,
      //     designation: this.employee.designation,
      //     phoneNumber: this.employee.phoneNumber,
      //     countryName: this.countries[i].countryName
      //   });
      //   // console.log(this.countries[i].countryName);

      // }

      this.editForm.patchValue({
        name: this.employee.name,
        email: this.employee.email,
        designation: this.employee.designation,
        phoneNumber: this.employee.phoneNumber
      });
      data.countries.map(country => {
        this.addAddress(country.countryName);
      });

      // this.editForm.controls.countries.setValue('abc');
      // this.setExpenseCategories();
    });
  }

  // setExpenseCategories() {
  //   let control = <FormArray>this.editForm.controls.countriesName;
  //   this.employeeData.countries.forEach(x => {
  //     control.push(this.fb.group(x));
  //   })
  // }

  // updateEmployee() {
  //   this.editForm = this.fb.group({
  //     name: ['', [Validators.required]],
  //     email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
  //     designation: ['', [Validators.required]],
  //     phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  //     countryName: ['']
  //   })
  // }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editForm.value, null, 4));
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateEmployee(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/employees-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
