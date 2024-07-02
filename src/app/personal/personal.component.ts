import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  // constructor(private dataService: DataService) {}
  // ngOnInit(): void {
  //   this.dataService.personalformData$.subscribe((formData) => {
  //     this.formData = { ...formData };
  //   });
  // }
  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (this.isValidFormData(form.value)) {
      if (form.value.id) {
        this.dataService.updatePersonalData(form.value);
      } else {
        form.value.id = this.generateUniqueId();
        this.dataService.addPersonalData(form.value);
        this.router.navigate(['home/family']);
      }
      this.resetFormData();
    } else {
      alert('Please fill out all fields.');
    }
  }

  private isValidFormData(data: any): boolean {
    return (
      data.name && data.dob && data.address && data.designation && data.password
    );
  }
  private generateUniqueId(): string {
    return (
      'BTS_' +
      Date.now().toString(16) +
      Math.floor(Math.random() * 1000).toString(16)
    );
  }

  resetFormData() {
    this.dataService.setSelectedEntry({});
  }

  get formData(): any {
    return this.dataService.getSelectedEntry();
  }
}
