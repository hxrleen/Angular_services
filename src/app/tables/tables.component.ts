import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
    ]),
  ],
})
export class TablesComponent implements OnInit {
  personalDataArray: any[] = [];
  familyDataArray: any[] = [];
  educationDataArray: any[] = [];
  experienceDataArray: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }

  expand() {
    this.collapsed = false;
  }

  collapse() {
    this.collapsed = true;
  }

  ngOnInit(): void {
    this.personalDataArray = this.dataService.getData('personal');
    this.familyDataArray = this.dataService.getData('family');
    this.educationDataArray = this.dataService.getData('education');
    this.experienceDataArray = this.dataService.getData('experience');

    this.refreshData();
  }

  //delete-------------------------------------------------------------

  deleteData(id: string, type: string) {
    this.dataService.deleteData(id, type);
    this.refreshData();
  }

  //edit----------------------------------------------------------------

  editData(formData: any, type: string) {
    switch (type) {
      case 'personal':
        this.router.navigate(['home', 'personal']);
        break;
      case 'family':
        this.router.navigate(['home', 'family']);
        break;
      case 'education':
        this.router.navigate(['home', 'education']);
        break;
      case 'experience':
        this.router.navigate(['home', 'experience']);
        break;
    }
    this.dataService.setSelectedEntry({ ...formData });
  }

  refreshData() {
    this.personalDataArray = this.dataService.getData('personal');
    this.familyDataArray = this.dataService.getData('family');
    this.educationDataArray = this.dataService.getData('education');
    this.experienceDataArray = this.dataService.getData('experience');
  }
}
