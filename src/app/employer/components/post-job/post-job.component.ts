import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
  ],
  template: `
    <div class="post-job-container">
      <form [formGroup]="jobForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Job Description</mat-label>
          <textarea
            matInput
            formControlName="description"
            rows="6"
            required
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Location</mat-label>
          <input matInput formControlName="location" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Required Skills</mat-label>
          <mat-chip-grid #chipGrid>
            <mat-chip-row
              *ngFor="let skill of requiredSkills"
              (removed)="removeSkill(skill)"
            >
              {{ skill }}
              <button matChipRemove>×</button>
            </mat-chip-row>
          </mat-chip-grid>
          <input
            placeholder="New skill..."
            [matChipInputFor]="chipGrid"
            (matChipInputTokenEnd)="addSkill($event)"
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Experience Level</mat-label>
          <mat-select formControlName="experienceLevel" required>
            <mat-option value="entry">Entry Level</mat-option>
            <mat-option value="mid">Mid Level</mat-option>
            <mat-option value="senior">Senior Level</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Salary Range</mat-label>
          <input matInput formControlName="salaryRange" required />
        </mat-form-field>

        <div class="button-container">
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!jobForm.valid"
            class="post-button"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .post-job-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      .full-width {
        width: 100%;
        margin-bottom: 20px;
      }
      .button-container {
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;
      }
      .post-button {
        min-width: 120px;
        height: 45px;
        font-size: 16px;
      }
      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }
      ::ng-deep .mat-mdc-form-field {
        background: white;
        border-radius: 4px;
      }
      ::ng-deep .mat-mdc-text-field-wrapper {
        background: white !important;
      }
      ::ng-deep .mat-mdc-form-field-flex {
        background: white !important;
      }
    `,
  ],
})
export class PostJobComponent implements OnInit {
  jobForm: FormGroup;
  requiredSkills: string[] = [];

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      description: ['', Validators.required],
      location: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      salaryRange: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.jobForm.valid) {
      const jobData = {
        ...this.jobForm.value,
        requiredSkills: this.requiredSkills,
      };
      console.log('Job data:', jobData);
      // Save job data to backend
    }
  }

  addSkill(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.requiredSkills.push(value);
      event.chipInput!.clear();
    }
  }

  removeSkill(skill: string): void {
    const index = this.requiredSkills.indexOf(skill);
    if (index >= 0) {
      this.requiredSkills.splice(index, 1);
    }
  }
}
