import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { WorkoutFormComponent } from './components/workoutform/workoutform.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { Workout } from './shared/workout.model';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, WorkoutFormComponent, WorkoutListComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex flex-col items-center justify-center py-6">
      <app-header></app-header>
      <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mt-6">
        <app-workout-form (workoutAdded)="addWorkoutToList($event)"></app-workout-form>
      </div>

      <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Workout List</h2>

  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
    <input type="text" id="search" placeholder="Search by name" [(ngModel)]="searchTerm" 
      class="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200">

    <select id="filterType" [(ngModel)]="filterType" 
      class="w-full md:w-1/3 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200">
      <option value="">All Workout Types</option>
      <option value="Running">Running</option>
      <option value="Cycling">Cycling</option>
      <option value="Swimming">Swimming</option>
      <option value="Yoga">Yoga</option>
      <option value="Weightlifting">Weightlifting</option>
    </select>
  </div>

  <app-workout-list 
    [workoutList]="paginatedWorkouts" 
    (workoutDeleted)="deleteWorkout($event)" 
    [currentPage]="currentPage"  
    [totalPages]="totalPages"   
    (pageChange)="goToPage($event)">  
  </app-workout-list>
</div>

    </div>
  `,
  styles: []
})
export class AppComponent {
  workoutList: Workout[] = [
    { personName: 'John Doe', type: 'Running', minutes: 30 },
    { personName: 'Jane Smith', type: 'Swimming', minutes: 60 },
    { personName: 'Mike Johnson', type: 'Yoga', minutes: 50 },
    { personName: 'Emily Davis', type: 'Cycling', minutes: 45 },
    { personName: 'David Lee', type: 'Weightlifting', minutes: 75 },
    { personName: 'Sarah Jones', type: 'Running', minutes: 25 },
    { personName: 'Michael Brown', type: 'Swimming', minutes: 35 },
    { personName: 'Ashley Green', type: 'Yoga', minutes: 60 },
  ];

  searchTerm: string = '';
  filterType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  get filteredWorkouts(): Workout[] {
    return this.workoutList.filter(workout =>
      workout.personName.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterType === '' || workout.type === this.filterType)
    );
  }

  get paginatedWorkouts(): Workout[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredWorkouts.length);
    this.totalPages = Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
    return this.filteredWorkouts.slice(startIndex, endIndex);
  }

  addWorkoutToList(workoutData: Workout) {
    this.workoutList.push(workoutData);
  }

  deleteWorkout(index: number) {
    this.workoutList.splice(index, 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
}
