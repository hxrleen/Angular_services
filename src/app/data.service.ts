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
    const savedPersonalData = JSON.parse(
      localStorage.getItem('personalData') || '[]'
    );
    this.personalData = savedPersonalData;

    const savedFamilyData = JSON.parse(
      localStorage.getItem('familyData') || '[]'
    );
    this.familyData = savedFamilyData;

    const savedEducationData = JSON.parse(
      localStorage.getItem('educationData') || '[]'
    );
    this.educationData = savedEducationData;

    const savedExperienceData = JSON.parse(
      localStorage.getItem('experienceData') || '[]'
    );
    this.experienceData = savedExperienceData;

    const savedEmployeeData = JSON.parse(
      localStorage.getItem('employeeId') || '[]'
    );
    this.empId = savedEmployeeData;
  }

  getPersonalData() {
    return this.personalData;
  }

  getFamilyData() {
    return this.familyData;
  }

  getEducationData() {
    return this.educationData;
  }

  getExperienceData() {
    return this.experienceData;
  }

  getEmployeeId() {
    return this.empId;
  }

  // public personalDataSubject = new BehaviorSubject<PersonalData[]>(
  //   this.getDataFromLocalStorage('personalData')
  // );

  // personalData$ = this.personalDataSubject.asObservable();

  // private personalformDataSubject = new BehaviorSubject<any>({});
  // personalformData$ = this.personalformDataSubject.asObservable();

  // Family data
  // public familyDataSubject = new BehaviorSubject<any[]>(
  //   this.getDataFromLocalStorage('familyData')
  // );
  // familyData$ = this.familyDataSubject.asObservable();

  // private familyformDataSubject = new BehaviorSubject<any>({});
  // familyformData$ = this.familyformDataSubject.asObservable();

  // Education data
  // public educationDataSubject = new BehaviorSubject<any[]>(
  //   this.getDataFromLocalStorage('educationData')
  // );
  // educationData$ = this.educationDataSubject.asObservable();

  // private educationformDataSubject = new BehaviorSubject<any>({});
  // educationformData$ = this.educationformDataSubject.asObservable();

  // Experience data
  // private experienceDataSubject = new BehaviorSubject<any[]>(
  //   this.getDataFromLocalStorage('experienceData')
  // );
  // experienceData$ = this.experienceDataSubject.asObservable();

  // private experienceformDataSubject = new BehaviorSubject<any>({});
  // experienceformData$ = this.experienceformDataSubject.asObservable();

  // private experienceformDataSource = new BehaviorSubject<any>({});
  // experienceData: any[] = [];

  // Get and set local storage data
  // private getDataFromLocalStorage(key: string): any[] {
  //   return JSON.parse(localStorage.getItem(key) || '[]');
  // }

  // private setDataToLocalStorage(key: string, data: any[]): void {
  //   localStorage.setItem(key, JSON.stringify(data));
  // }

  // Update data general
  // private updateData(
  //   subject: BehaviorSubject<any[]>,
  //   key: string,
  //   newData: any
  // ): void {
  //   const updatedData = [...subject.value, newData];
  //   subject.next(updatedData);
  //   this.setDataToLocalStorage(key, updatedData);
  // }

  //check id exists

  // Personal data methods
  updatePersonalData(newData: any): void {
    const index = this.personalData.findIndex((item) => item.id === newData.id);
    if (index !== -1) {
      this.personalData[index] = { ...newData };
      localStorage.setItem('personalData', JSON.stringify(this.personalData));
      alert('Data updated');
    } else {
      this.addPersonalData(newData);
    }
  }

  addPersonalData(newData: any): void {
    this.personalData.push({ ...newData });
    localStorage.setItem('personalData', JSON.stringify(this.personalData));
    alert('Data added');
    this.addEmployeeId(newData.id);
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

  // Family data methods

  // updateFamilyData(newData: any): void {
  // const index = this.familyDataSubject.value.findIndex(
  //   (item) => item.id === newData.id
  // );
  // if (index !== -1) {
  //   const updatedData = [...this.familyDataSubject.value];
  //   updatedData[index] = newData;
  //   this.familyDataSubject.next(updatedData);
  //   this.setDataToLocalStorage('familyData', updatedData);
  //   alert('Data updated successfully!');
  // } else {
  //   this.addFamilyData(newData);
  // }
  // }

  updateFamilyData(newData: any): void {
    const index = this.familyData.findIndex((item) => item.id === newData.id);
    if (index !== -1) {
      this.familyData[index] = { ...newData };
      localStorage.setItem('familyData', JSON.stringify(this.familyData));
      alert('Data updated');
    } else {
      this.addFamilyData(newData);
    }
  }

  addFamilyData(newData: any): void {
    this.familyData.push({ ...newData });
    localStorage.setItem('familyData', JSON.stringify(this.familyData));
    alert('Data added');
  }

  // addFamilyData(newData: any): void {
  //   if (this.doesIdExist(this.familyDataSubject, newData.id)) {
  //     alert(`The ID already exists`);
  //   } else {
  //     const updatedData = [...this.familyDataSubject.value, newData];
  //     this.familyDataSubject.next(updatedData);
  //     this.setDataToLocalStorage('familyData', updatedData);
  //     alert('New data added');
  //   }
  // }

  // Education data methods

  updateEducationData(newData: any): void {
    const index = this.educationData.findIndex(
      (item) => item.id === newData.id
    );
    if (index !== -1) {
      this.educationData[index] = { ...newData };
      localStorage.setItem('educationData', JSON.stringify(this.educationData));
      alert('Data updated');
    } else {
      this.addEducationData(newData);
    }
  }

  addEducationData(newData: any): void {
    this.educationData.push({ ...newData });
    localStorage.setItem('educationData', JSON.stringify(this.educationData));
    alert('Data added');
  }

  // Experience data methods

  updateExperienceData(newData: any): void {
    const index = this.experienceData.findIndex(
      (item) => item.id === newData.id
    );
    if (index !== -1) {
      this.experienceData[index] = { ...newData };
      localStorage.setItem(
        'experienceData',
        JSON.stringify(this.experienceData)
      );
      alert('Data updated');
    } else {
      this.addExperienceData(newData);
    }
  }

  addExperienceData(newData: any): void {
    this.experienceData.push({ ...newData });
    localStorage.setItem('experienceData', JSON.stringify(this.experienceData));
    alert('Data added');
  }

  // updateExperienceDataAtIndex(index: number, updatedData: any): void {
  //   this.experienceData[index] = updatedData;
  //   this.experienceformDataSource.next(updatedData);
  // }

  // private updateExperienceDataById(updatedData: any): void {
  //   const updatedExperienceData = this.experienceDataSubject.value.map((item) =>
  //     item.id === updatedData.id ? updatedData : item
  //   );
  //   this.experienceDataSubject.next(updatedExperienceData);
  //   this.setDataToLocalStorage('experienceData', updatedExperienceData);
  //   alert('Data updated successfully!');
  // }

  // Delete methods
  deletePersonalData(id: string): void {
    if (confirm('Are you sure?')) {
      this.personalData = this.personalData.filter((data) => data.id !== id);
      localStorage.setItem('personalData', JSON.stringify(this.personalData));

      this.familyData = this.familyData.filter((data) => data.id !== id);
      localStorage.setItem('familyData', JSON.stringify(this.familyData));

      this.educationData = this.educationData.filter((data) => data.id !== id);
      localStorage.setItem('educationData', JSON.stringify(this.educationData));

      this.experienceData = this.experienceData.filter(
        (data) => data.id !== id
      );
      localStorage.setItem(
        'experienceData',
        JSON.stringify(this.experienceData)
      );

      this.empId = this.empId.filter((empId) => empId !== id);
      localStorage.setItem('employeeId', JSON.stringify(this.empId));

      // const updatedData = this.personalDataSubject.value.filter(
      //   (item) => item.id !== id
      // );
      // localStorage.setItem('employeeIds', JSON.stringify(this.employeeIds));

      // this.familyDataSubject.next(updatedData);
      // this.setDataToLocalStorage('familyData', updatedData);

      // this.educationDataSubject.next(updatedData);
      // this.setDataToLocalStorage('educationData', updatedData);

      // this.experienceDataSubject.next(updatedData);
      // this.setDataToLocalStorage('experienceData', updatedData);

      // this.empId = this.empId.filter((id) => id !== id);
      // localStorage.setItem('employeeIds', JSON.stringify(this.empId));

      alert('Data deleted successfully!');
    }
  }

  deleteFamilyData(id: string): void {
    if (confirm('Are you sure?')) {
      this.familyData = this.familyData.filter((data) => data.id !== id);
      localStorage.setItem('familyData', JSON.stringify(this.familyData));
    }
  }

  // deleteExperienceData(id: string): void {
  //   if (confirm('Are you sure?')) {
  //     const updatedData = this.experienceDataSubject.value.filter(
  //       (item) => item.id !== id
  //     );
  //     this.experienceDataSubject.next(updatedData);
  //     this.setDataToLocalStorage('experienceData', updatedData);
  //     alert('Data deleted successfully!');
  //   }
  // }

  deleteEducationData(id: string): void {
    if (confirm('Are you sure?')) {
      this.educationData = this.educationData.filter((data) => data.id !== id);
      localStorage.setItem('educationData', JSON.stringify(this.educationData));
    }
  }

  deleteExperienceData(id: string): void {
    if (confirm('Are you sure?')) {
      this.experienceData = this.experienceData.filter(
        (data) => data.id !== id
      );
      localStorage.setItem(
        'experienceData',
        JSON.stringify(this.experienceData)
      );
    }
  }

  // Edit methods
  setSelectedEntry(entry: any) {
    this.formData = entry;
  }

  getSelectedEntry(): any {
    return this.formData;
  }

  // setPersonalFormData(formData: any): void {
  //   this.personalformDataSubject.next(formData);
  // }

  // setFamilyFormData(formData: any): void {
  //   this.familyformDataSubject.next(formData);
  // }

  // setEducationFormData(formData: any): void {
  //   this.educationformDataSubject.next(formData);
  // }

  // setExperienceFormData(formData: any): void {
  //   this.experienceformDataSubject.next(formData);
  // }
}
