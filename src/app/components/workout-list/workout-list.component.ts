import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutChartComponent } from '../workout-chart/workout-chart.component'; // Import the chart component
import { Workout } from '../../shared/workout.model'; // Import the Workout interface


@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, WorkoutChartComponent], // Import the chart component
  template: `
    <app-workout-chart [workoutList]="workoutList"></app-workout-chart>

    <table class="min-w-full divide-y divide-gray-200" *ngIf="workoutList && workoutList.length > 0">
  <thead class="bg-gray-50">
    <tr>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minutes</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr *ngFor="let workout of workoutList; let i = index">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ workout.personName }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ workout.type }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ workout.minutes }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button (click)="deleteWorkout(i)" class="text-red-500 hover:text-red-700">Delete</button>
      </td>
    </tr>
  </tbody>
</table>

<div *ngIf="!workoutList || workoutList.length === 0" class="mt-4 text-center p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
  <p class="text-gray-700 text-lg font-medium">No workouts found.</p>
</div>


<div class="mt-4 flex justify-center items-center space-x-2" *ngIf="workoutList && workoutList.length > 0">
  <!-- Previous Button -->
  <button (click)="prevPage()" [disabled]="currentPage === 1" class="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50">
    Previous
  </button>

  <!-- Page Number Buttons -->
  <button *ngFor="let page of pages" (click)="goToPage(page)" 
    class="px-4 py-2 border rounded-md text-sm font-medium" 
    [class.bg-blue-500]="page === currentPage" 
    [class.text-white]="page === currentPage" 
    [class.text-gray-700]="page !== currentPage" 
    [class.hover:bg-blue-600]="page !== currentPage">
    {{ page }}
  </button>

  <!-- Next Button -->
  <button 
  (click)="nextPage()" 
  [disabled]="currentPage === totalPages" 
  class="px-5 py-2.5 border rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md transition-all">
  Next
</button>

</div>

  `,
  styles: []
})
export class WorkoutListComponent {
  @Input() workoutList: Workout[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Output() workoutDeleted = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    const pageCount = Math.ceil(this.totalPages);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  deleteWorkout(index: number) {
    this.workoutDeleted.emit(index);
  }

  prevPage() {
    this.pageChange.emit(this.currentPage - 1);
  }

  nextPage() {
    this.pageChange.emit(this.currentPage + 1);
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }
}