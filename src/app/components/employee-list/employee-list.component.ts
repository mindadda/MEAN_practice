import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  
  Employee:any = [];
  status: boolean = false;

  constructor(private apiService: ApiService , private actRoute: ActivatedRoute, private router: Router) { 
    this.readEmployee();
  }

  ngOnInit() {}

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    //  console.log(this.Employee);
     
    })    
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }
  }

  verifyEmployee(employee , index){
      this.status = true;
      console.log(this.status);
      this.apiService.setStatus(employee._id , this.status).subscribe((data) => {
          alert('Verified !!')
        }, (error) => {
          console.log(error)
        })
  }

}