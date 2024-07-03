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
  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (this.dataService.isValidFormData(form.value, 'personal')) {
      if (form.value.id) {
        this.dataService.updateData(form.value, 'personal');
      } else {
        form.value.id = this.generateUniqueId();
        this.dataService.addData(form.value, 'personal');
        this.router.navigate(['home', 'family']);
      }
      this.dataService.resetFormData();
    } else {
      alert('Please fill out all fields.');
    }
  }

  private generateUniqueId(): string {
    return (
      'BTS_' +
      Date.now().toString(16) +
      Math.floor(Math.random() * 1000).toString(16)
    );
  }

  get formData(): any {
    return this.dataService.getSelectedEntry();
  }
}
