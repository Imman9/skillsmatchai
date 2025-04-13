import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Skill {
  id: number;
  name: string;
  category: string;
  description?: string;
}

interface JobSeekerSkill {
  id: number;
  skillId: number;
  proficiencyLevel: number;
  isVerified: boolean;
  yearsOfExperience: number;
  lastUsedDate: Date;
  skill: Skill;
  endorsements: SkillEndorsement[];
}

interface SkillEndorsement {
  id: number;
  endorserId: number;
  endorserName: string;
  endorsementDate: Date;
  note?: string;
}

interface SkillCategory {
  name: string;
  skills: JobSeekerSkill[];
}

@Component({
  selector: 'app-skill-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <div class="skills-container">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>Skills Management</mat-card-title>
          <mat-card-subtitle
            >Track and improve your professional skills</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-actions align="end">
          <button
            mat-raised-button
            color="primary"
            (click)="openAddSkillDialog()"
          >
            Add New Skill
          </button>
        </mat-card-actions>
      </mat-card>

      <div class="skills-content">
        <mat-card class="assessment-card">
          <mat-card-header>
            <mat-card-title>Skill Assessment Overview</mat-card-title>
            <mat-card-subtitle
              >Track your skill verification progress</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="assessment-stats">
              <div class="stat-item">
                <div class="stat-value">{{ getTotalSkills() }}</div>
                <div class="stat-label">Total Skills</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ getVerifiedSkills() }}</div>
                <div class="stat-label">Verified Skills</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ getTotalEndorsements() }}</div>
                <div class="stat-label">Endorsements</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">
                  {{ getAverageProficiency() | number : '1.1-1' }}
                </div>
                <div class="stat-label">Avg. Proficiency</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="skills-grid">
          <mat-expansion-panel
            *ngFor="let category of skillCategories"
            class="category-panel"
          >
            <mat-expansion-panel-header>
              <mat-panel-title>{{ category.name }}</mat-panel-title>
              <mat-panel-description>
                {{ category.skills.length }} skills
              </mat-panel-description>
            </mat-expansion-panel-header>

            <div class="skill-list">
              <div *ngFor="let jobSkill of category.skills" class="skill-item">
                <div class="skill-header">
                  <div class="skill-info">
                    <div class="skill-name">
                      {{ jobSkill.skill.name }}
                      <mat-icon
                        *ngIf="jobSkill.isVerified"
                        matTooltip="Verified Skill"
                        class="verified-icon"
                        >verified</mat-icon
                      >
                    </div>
                    <div class="skill-meta">
                      {{ jobSkill.yearsOfExperience }} years · Last used
                      {{ jobSkill.lastUsedDate | date }}
                    </div>
                  </div>
                  <mat-chip-set>
                    <mat-chip
                      [class]="getProficiencyClass(jobSkill.proficiencyLevel)"
                    >
                      {{ getProficiencyLabel(jobSkill.proficiencyLevel) }}
                    </mat-chip>
                  </mat-chip-set>
                </div>

                <div class="skill-progress">
                  <mat-progress-bar
                    mode="determinate"
                    [value]="jobSkill.proficiencyLevel * 20"
                    [class]="getProficiencyClass(jobSkill.proficiencyLevel)"
                  ></mat-progress-bar>
                </div>

                <div class="skill-details">
                  <span
                    class="endorsements"
                    [matTooltip]="getEndorsementTooltip(jobSkill)"
                  >
                    <mat-icon>recommend</mat-icon>
                    {{ jobSkill.endorsements.length }} endorsements
                  </span>
                  <span class="skill-actions">
                    <button
                      mat-button
                      color="primary"
                      *ngIf="!jobSkill.isVerified"
                      (click)="startSkillAssessment(jobSkill)"
                    >
                      <mat-icon>assessment</mat-icon>
                      Verify Skill
                    </button>
                    <button mat-button (click)="updateSkill(jobSkill)">
                      Update
                    </button>
                    <button
                      mat-button
                      color="warn"
                      (click)="removeSkill(jobSkill)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </span>
                </div>

                <mat-divider></mat-divider>
              </div>
            </div>
          </mat-expansion-panel>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .skills-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .header-card {
        margin-bottom: 20px;
      }

      .skills-content {
        display: grid;
        gap: 20px;
      }

      .assessment-card {
        margin-bottom: 20px;
      }

      .assessment-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .stat-item {
        text-align: center;
        padding: 16px;
        background-color: #f5f5f5;
        border-radius: 8px;
      }

      .stat-value {
        font-size: 24px;
        font-weight: 500;
        color: #1976d2;
        margin-bottom: 4px;
      }

      .stat-label {
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
      }

      .category-panel {
        margin-bottom: 16px;
      }

      .skill-list {
        margin-top: 16px;
      }

      .skill-item {
        padding: 16px 0;
      }

      .skill-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }

      .skill-info {
        flex: 1;
      }

      .skill-name {
        font-weight: 500;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .skill-meta {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        margin-top: 4px;
      }

      .verified-icon {
        color: #388e3c;
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .skill-progress {
        margin: 12px 0;
      }

      .skill-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0;
      }

      .endorsements {
        display: flex;
        align-items: center;
        gap: 4px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
      }

      .skill-actions {
        display: flex;
        gap: 8px;
      }

      .beginner {
        color: #fb8c00 !important;
      }

      .intermediate {
        color: #1976d2 !important;
      }

      .advanced {
        color: #388e3c !important;
      }

      .expert {
        color: #7b1fa2 !important;
      }

      .master {
        color: #c62828 !important;
      }
    `,
  ],
})
export class SkillManagementComponent implements OnInit {
  skillCategories: SkillCategory[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    // TODO: Replace with actual API call
    this.skillCategories = [
      {
        name: 'Programming Languages',
        skills: [
          {
            id: 1,
            skillId: 1,
            proficiencyLevel: 5,
            isVerified: true,
            yearsOfExperience: 5,
            lastUsedDate: new Date(),
            skill: {
              id: 1,
              name: 'TypeScript',
              category: 'Programming Languages',
              description:
                'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
            },
            endorsements: [
              {
                id: 1,
                endorserId: 2,
                endorserName: 'John Doe',
                endorsementDate: new Date(),
                note: 'Excellent TypeScript skills demonstrated in recent project',
              },
            ],
          },
          // Add more skills...
        ],
      },
      // Add more categories...
    ];
  }

  getTotalSkills(): number {
    return this.skillCategories.reduce(
      (total, category) => total + category.skills.length,
      0
    );
  }

  getVerifiedSkills(): number {
    return this.skillCategories.reduce(
      (total, category) =>
        total + category.skills.filter((skill) => skill.isVerified).length,
      0
    );
  }

  getTotalEndorsements(): number {
    return this.skillCategories.reduce(
      (total, category) =>
        total +
        category.skills.reduce(
          (sum, skill) => sum + skill.endorsements.length,
          0
        ),
      0
    );
  }

  getAverageProficiency(): number {
    const totalSkills = this.getTotalSkills();
    if (totalSkills === 0) return 0;

    const sumProficiency = this.skillCategories.reduce(
      (total, category) =>
        total +
        category.skills.reduce((sum, skill) => sum + skill.proficiencyLevel, 0),
      0
    );

    return sumProficiency / totalSkills;
  }

  getProficiencyClass(level: number): string {
    if (level <= 1) return 'beginner';
    if (level <= 2) return 'intermediate';
    if (level <= 3) return 'advanced';
    if (level <= 4) return 'expert';
    return 'master';
  }

  getProficiencyLabel(level: number): string {
    if (level <= 1) return 'Beginner';
    if (level <= 2) return 'Intermediate';
    if (level <= 3) return 'Advanced';
    if (level <= 4) return 'Expert';
    return 'Master';
  }

  getEndorsementTooltip(jobSkill: JobSeekerSkill): string {
    if (jobSkill.endorsements.length === 0) return 'No endorsements yet';

    return jobSkill.endorsements
      .map((e) => `${e.endorserName} - ${e.note || 'Endorsed your skill'}`)
      .join('\n');
  }

  openAddSkillDialog(): void {
    // TODO: Implement add skill dialog
  }

  startSkillAssessment(jobSkill: JobSeekerSkill): void {
    // TODO: Implement skill assessment
  }

  updateSkill(jobSkill: JobSeekerSkill): void {
    // TODO: Implement skill update
  }

  removeSkill(jobSkill: JobSeekerSkill): void {
    // TODO: Implement skill removal
  }
}
