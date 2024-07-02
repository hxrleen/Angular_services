import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface ExperienceFormData {
  id: string;
  lastcomp1: string;
  roles1: string;
  tenure1: number;
  lastcomp2: string;
  roles2: string;
  tenure2: number;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experienceDataIds: string[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.experienceDataIds = this.dataService.getEmployeeId();

    this.updateSliderUI('tenure1', this.formData.tenure1);
    this.updateSliderUI('tenure2', this.formData.tenure2);

    this.initializeSlider('tenure1', 'slider-label1');
    this.initializeSlider('tenure2', 'slider-label2');
  }

  onSubmit(form: NgForm): void {
    if (this.isValidFormData(form.value)) {
      if (form.value.id) {
        this.dataService.updateExperienceData(form.value);
      } else {
        this.dataService.addExperienceData(form.value);
        this.router.navigate(['home/homepage']);
      }
      this.resetFormData();
    } else {
      alert('Please fill out all fields.');
    }
  }

  initializeSlider(sliderId: string, labelId: string): void {
    const slider = document.getElementById(sliderId) as HTMLInputElement;
    const span = document.getElementById(labelId);
    if (slider && span) {
      this.updateSliderLabel(slider, span);
      slider.oninput = () => {
        this.updateSliderLabel(slider, span);
      };
    }
  }

  updateSliderUI(sliderId: string, value?: number): void {
    const slider = document.getElementById(sliderId) as HTMLInputElement;
    if (slider && value !== undefined) {
      slider.value = value.toString();
      const span = document.getElementById(`${sliderId}-label`);
      if (span) {
        this.updateSliderLabel(slider, span);
      }
    }
  }

  updateSliderLabel(slider: HTMLInputElement, span: HTMLElement): void {
    let marginValue = parseInt(slider.value) * 5 - 4;
    if (parseInt(slider.value) === 20) {
      marginValue -= 6;
      if (screen.width < 993) {
        marginValue -= 6;
      }
    }
    this.renderer.setStyle(span, 'margin-left', `${marginValue}%`);
    let _yrsTxt = parseInt(slider.value) < 10 ? 'yr.' : 'yrs.';
    span.innerHTML = `${slider.value} ${_yrsTxt}`;
  }

  private isValidFormData(data: ExperienceFormData): any {
    return (
      data.id &&
      data.lastcomp1 &&
      data.tenure1 &&
      data.lastcomp2 &&
      data.tenure2 &&
      data.roles1 &&
      data.roles2
    );
  }

  resetFormData() {
    this.dataService.setSelectedEntry({});
  }

  get formData(): any {
    return this.dataService.getSelectedEntry();
  }
}
