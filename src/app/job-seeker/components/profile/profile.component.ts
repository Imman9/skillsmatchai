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
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-profile',
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
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    // Shared Components
  ],
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Profile Information</mat-card-title>
          <mat-card-subtitle
            >Keep your professional profile up to date</mat-card-subtitle
          >
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <!-- Personal Information -->
            <h3>Personal Information</h3>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" required />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" required />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Professional Headline</mat-label>
              <input
                matInput
                formControlName="headline"
                required
                placeholder="e.g., Senior Software Engineer | AI Specialist"
              />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Professional Summary</mat-label>
              <textarea
                matInput
                formControlName="summary"
                rows="4"
                placeholder="Brief overview of your professional background and aspirations"
              ></textarea>
            </mat-form-field>

            <!-- Contact Information -->
            <h3>Contact Information</h3>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" type="tel" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Location</mat-label>
              <input
                matInput
                formControlName="location"
                placeholder="City, Country"
              />
            </mat-form-field>

            <!-- Professional Information -->
            <h3>Professional Information</h3>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Current Job Title</mat-label>
                <input matInput formControlName="currentJobTitle" />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Years of Experience</mat-label>
                <input
                  matInput
                  type="number"
                  formControlName="yearsOfExperience"
                  min="0"
                />
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Preferred Job Type</mat-label>
                <mat-select formControlName="preferredJobType">
                  <mat-option value="full-time">Full-time</mat-option>
                  <mat-option value="part-time">Part-time</mat-option>
                  <mat-option value="contract">Contract</mat-option>
                  <mat-option value="freelance">Freelance</mat-option>
                  <mat-option value="internship">Internship</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Preferred Location</mat-label>
                <input
                  matInput
                  formControlName="preferredLocation"
                  placeholder="City, Country or Remote"
                />
              </mat-form-field>
            </div>

            <!-- Online Presence -->
            <h3>Online Presence</h3>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>LinkedIn URL</mat-label>
                <input matInput formControlName="linkedinUrl" type="url" />
                <mat-icon matSuffix>link</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>GitHub URL</mat-label>
                <input matInput formControlName="githubUrl" type="url" />
                <mat-icon matSuffix>link</mat-icon>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Portfolio URL</mat-label>
              <input matInput formControlName="portfolioUrl" type="url" />
              <mat-icon matSuffix>link</mat-icon>
            </mat-form-field>

            <!-- Availability -->
            <h3>Availability</h3>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Availability Status</mat-label>
              <mat-select formControlName="availabilityStatus">
                <mat-option value="actively_looking"
                  >Actively Looking</mat-option
                >
                <mat-option value="open_to_opportunities"
                  >Open to Opportunities</mat-option
                >
                <mat-option value="not_available">Not Available</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" (click)="resetForm()">
                Reset
              </button>
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!profileForm.valid"
              >
                Save Profile
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .profile-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
      }
      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }
      .form-row {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
      }
      .form-row mat-form-field {
        flex: 1;
      }
      mat-card {
        padding: 24px;
      }
      h3 {
        margin: 24px 0 16px;
        color: #333;
        font-weight: 500;
      }
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        margin-top: 24px;
      }
      mat-card-subtitle {
        margin-bottom: 20px;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      headline: ['', Validators.required],
      summary: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      currentJobTitle: [''],
      yearsOfExperience: [0, [Validators.min(0), Validators.max(50)]],
      preferredJobType: [''],
      preferredLocation: [''],
      linkedinUrl: ['', Validators.pattern('https?://.+')],
      githubUrl: ['', Validators.pattern('https?://.+')],
      portfolioUrl: ['', Validators.pattern('https?://.+')],
      availabilityStatus: ['actively_looking'],
    });
  }

  ngOnInit(): void {
    // Load existing profile data
    const savedProfile = localStorage.getItem('jobSeekerProfile');
    if (savedProfile) {
      this.profileForm.patchValue(JSON.parse(savedProfile));
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
      console.log('Profile data:', profileData);
      // Save to localStorage for now (will be replaced with API call)
      localStorage.setItem('jobSeekerProfile', JSON.stringify(profileData));
      // TODO: Implement API call to save profile
    }
  }

  resetForm(): void {
    this.profileForm.reset({
      yearsOfExperience: 0,
      availabilityStatus: 'actively_looking',
    });
  }
}
