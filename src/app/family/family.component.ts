import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css'],
})
export class FamilyComponent implements OnInit {
  familyDataIds: string[] = [];

  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    this.familyDataIds = this.dataService.getEmployeeId();
  }

  onSubmit(form: NgForm): void {
    if (this.isValidFormData(form.value)) {
      if (form.value.id) {
        this.dataService.updateFamilyData(form.value);
      } else {
        this.dataService.addFamilyData(form.value);
        this.router.navigate(['home/education']);
      }
      this.resetFormData();
    } else {
      alert('Please fill out all fields.');
    }
  }
  // // formData: any = { id: '' };
  // // personalDataIds: string[] = [];
  // // ngOnInit(): void {
  // //   this.dataService.personalData$.subscribe((personalData) => {
  // //     this.personalDataIds = personalData.map((data) => data.id);
  // //   });
  // //   this.dataService.familyformData$.subscribe((formData) => {
  // //     this.formData = { ...formData };
  // //   });
  // // }
  private isValidFormData(data: any): boolean {
    return (
      data.fathersName &&
      data.fatherDOB &&
      data.motherName &&
      data.motherDOB &&
      data.spouseName &&
      data.spouseDOB
    );
  }
  resetFormData() {
    this.dataService.setSelectedEntry({});
  }
  get formData(): any {
    return this.dataService.getSelectedEntry();
  }
}
