import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutChartComponent } from '../workout-chart/workout-chart.component';
import { Workout } from '../../shared/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, WorkoutChartComponent],
  template: `
    <app-workout-chart [workoutList]="workoutList"></app-workout-chart>

    <div *ngIf="workoutList && workoutList.length > 0; else noWorkouts">
      <table class="min-w-full table-auto shadow-lg rounded-lg overflow-hidden">
        <thead class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Type</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Minutes</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-gray-100">
          <tr *ngFor="let workout of workoutList; let i = index; trackBy: trackByIndex" class="border-t">
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ workout.personName }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ workout.type }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ workout.minutes }}</td>
            <td class="px-6 py-4 text-sm font-medium">
              <button (click)="deleteWorkout(i)" class="text-red-600 hover:text-red-800 transition-colors duration-200">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-center items-center mt-6">
        <button (click)="prevPage()" [disabled]="currentPage === 1" class="pagination-btn">
          Previous
        </button>

        <ng-container *ngFor="let page of pages">
          <button 
            (click)="goToPage(page)" 
            [attr.aria-current]="page === currentPage ? 'page' : null"
            class="pagination-btn"
            [ngClass]="{
              'bg-blue-600 text-white': page === currentPage,
              'bg-white text-gray-600': page !== currentPage
            }">
            {{ page }}
          </button>
        </ng-container>

        <button (click)="nextPage()" [disabled]="currentPage === totalPages" class="pagination-btn">
          Next
        </button>
      </div>
    </div>

    <ng-template #noWorkouts>
      <div class="mt-6 text-center p-6 bg-gray-200 rounded-lg shadow-md">
        <p class="text-gray-700 text-lg font-semibold">No workouts found.</p>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .pagination-btn {
        padding: 0.75rem 1.5rem;
        border: 2px solid #ddd;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: #4a4a4a;
        background-color: white;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .pagination-btn:hover:not(:disabled) {
        background-color: #edf2f7;
        color: #3182ce;
      }

      .pagination-btn:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `
  ]
})
export class WorkoutListComponent {
  @Input() workoutList: Workout[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() workoutDeleted = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  deleteWorkout(index: number) {
    this.workoutDeleted.emit(index);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  trackByIndex(index: number, item: Workout): number {
    return index;
  }
}
