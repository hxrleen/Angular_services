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
    if (this.dataService.isValidFormData(form.value, 'family')) {
      if (form.value.id) {
        this.dataService.updateData(form.value, 'family');
      } else {
        this.dataService.addData(form.value, 'family');
        this.router.navigate(['home', 'education']);
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
