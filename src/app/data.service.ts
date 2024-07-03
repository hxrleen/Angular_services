import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public personalData: any[] = [];
  public familyData: any[] = [];
  public educationData: any[] = [];
  public experienceData: any[] = [];
  public empId: string[] = [];

  private formData: any = {
    id: '',
    name: '',
    dob: '',
    designation: '',
    password: '',
  };

  // Personal data

  constructor() {
    this.personalData = JSON.parse(
      localStorage.getItem('personalData') || '[]'
    );

    this.familyData = JSON.parse(localStorage.getItem('familyData') || '[]');

    this.educationData = JSON.parse(
      localStorage.getItem('educationData') || '[]'
    );

    this.experienceData = JSON.parse(
      localStorage.getItem('experienceData') || '[]'
    );

    this.empId = JSON.parse(localStorage.getItem('employeeId') || '[]');
  }

  //validate formdata

  isValidFormData(data: any, type: string): boolean {
    switch (type) {
      case 'personal':
        return (
          data.name &&
          data.dob &&
          data.address &&
          data.designation &&
          data.password
        );

      case 'family':
        return (
          data.fathersName &&
          data.fatherDOB &&
          data.motherName &&
          data.motherDOB &&
          data.spouseName &&
          data.spouseDOB
        );
      case 'education':
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
      case 'experience':
        return (
          data.id &&
          data.lastcomp1 &&
          data.tenure1 &&
          data.lastcomp2 &&
          data.tenure2 &&
          data.roles1 &&
          data.roles2
        );
      default:
        console.error('error');
        return false;
    }
  }

  getData(type: string) {
    switch (type) {
      case 'personal':
        return this.personalData;
      case 'family':
        return this.familyData;
      case 'education':
        return this.educationData;
      case 'experience':
        return this.experienceData;
      default:
        console.error('error');
        return [];
    }
  }

  getEmployeeId() {
    return this.empId;
  }

  updateData(newData: any, type: string): void {
    let dataArray: any[] = [];
    let localStorageKey = '';

    switch (type) {
      case 'personal':
        dataArray = this.personalData;
        localStorageKey = 'personalData';
        break;
      case 'family':
        dataArray = this.familyData;
        localStorageKey = 'familyData';
        break;
      case 'education':
        dataArray = this.educationData;
        localStorageKey = 'educationData';
        break;
      case 'experience':
        dataArray = this.experienceData;
        localStorageKey = 'experienceData';
        break;
      default:
        console.error('error');
        return;
    }

    const index = dataArray.findIndex((item) => item.id === newData.id);
    if (index !== -1) {
      dataArray[index] = { ...newData };
      localStorage.setItem(localStorageKey, JSON.stringify(dataArray));
      alert('Data updated');
    } else {
      this.addData(newData, type);
    }
  }

  // ------------------------------------------------------------------------------------------------------

  addData(newData: any, type: String) {
    switch (type) {
      case 'personal':
        this.personalData.push({ ...newData });
        localStorage.setItem('personalData', JSON.stringify(this.personalData));
        this.addEmployeeId(newData.id);
        break;
      case 'family':
        this.familyData.push({ ...newData });
        localStorage.setItem('familyData', JSON.stringify(this.familyData));
        break;
      case 'education':
        this.educationData.push(newData);
        localStorage.setItem(
          'educationData',
          JSON.stringify(this.educationData)
        );
        break;
      case 'experience':
        this.experienceData.push({ ...newData });
        localStorage.setItem(
          'experienceData',
          JSON.stringify(this.experienceData)
        );
        break;
      default:
        console.error('Invalid data type');
        return;
    }
    alert('Data added');
  }

  addEmployeeId(empId: string): void {
    if (!this.empId.includes(empId)) {
      this.empId.push(empId);
      localStorage.setItem('employeeId', JSON.stringify(this.empId));
      alert('ID added');
    } else {
      alert('ID already exists');
    }
  }

  // Delete methods

  deleteData(id: string, type: string) {
    if (confirm('Are you sure?')) {
      switch (type) {
        case 'personal':
          this.personalData = this.personalData.filter(
            (data) => data.id !== id
          );
          localStorage.setItem(
            'personalData',
            JSON.stringify(this.personalData)
          );

          this.familyData = this.familyData.filter((data) => data.id !== id);
          localStorage.setItem('familyData', JSON.stringify(this.familyData));

          this.educationData = this.educationData.filter(
            (data) => data.id !== id
          );
          localStorage.setItem(
            'educationData',
            JSON.stringify(this.educationData)
          );

          this.experienceData = this.experienceData.filter(
            (data) => data.id !== id
          );
          localStorage.setItem(
            'experienceData',
            JSON.stringify(this.experienceData)
          );

          this.empId = this.empId.filter((empId) => empId !== id);
          localStorage.setItem('employeeId', JSON.stringify(this.empId));

          alert('Data deleted successfully!');
          break;
        case 'family':
          this.familyData = this.familyData.filter((data) => data.id !== id);
          localStorage.setItem('familyData', JSON.stringify(this.familyData));
          break;
        case 'education':
          this.educationData = this.educationData.filter(
            (data) => data.id !== id
          );
          localStorage.setItem(
            'educationData',
            JSON.stringify(this.educationData)
          );
          break;
        case 'experience':
          this.experienceData = this.experienceData.filter(
            (data) => data.id !== id
          );
          localStorage.setItem(
            'experienceData',
            JSON.stringify(this.experienceData)
          );
          break;
      }
    }
  }

  resetFormData() {
    this.setSelectedEntry({});
  }

  // Edit methods
  setSelectedEntry(entry: any) {
    this.formData = entry;
  }

  getSelectedEntry(): any {
    return this.formData;
  }
}
