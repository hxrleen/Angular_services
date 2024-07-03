import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  educationDataIds: string[] = [];

  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    this.educationDataIds = this.dataService.getEmployeeId();
  }

  onSubmit(form: NgForm): void {
    if (this.dataService.isValidFormData(form.value, 'education')) {
      if (form.value.id) {
        this.dataService.updateData(form.value, 'education');
      } else {
        this.dataService.addData(form.value, 'education');
        this.router.navigate(['home', 'experience']);
      }
      this.dataService.resetFormData();
    } else {
      alert('Please fill out all fields.');
    }
  }

  get formData(): any {
    return this.dataService.getSelectedEntry();
  }
}
