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

  // formData: any = { id: '' };
  // personalDataIds: string[] = [];
  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    this.educationDataIds = this.dataService.getEmployeeId();
  }
  //   this.dataService.educationformData$.subscribe((formData) => {
  //     this.formData = { ...formData };
  //   });
  // }
  onSubmit(form: NgForm): void {
    if (this.isValidFormData(form.value)) {
      if (form.value.id) {
        this.dataService.updateEducationData(form.value);
      } else {
        this.dataService.addEducationData(form.value);
        this.router.navigate(['home/experience']);
      }
      this.resetFormData();
    } else {
      alert('Please fill out all fields.');
    }
  }
  private isValidFormData(data: any): boolean {
    return (
      data.id &&
      data.highdeg1 &&
      data.highdeg2 &&
      data.stream1 &&
      data.stream2 &&
      data.marks1 &&
      data.marks2 &&
      data.university1 &&
      data.university2
    );
  }

  resetFormData() {
    this.dataService.setSelectedEntry({});
  }
  get formData(): any {
    return this.dataService.getSelectedEntry();
  }
}
