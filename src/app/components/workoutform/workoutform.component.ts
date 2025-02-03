import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../shared/workout.model'; // Import the Workout interface


@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white bg-opacity-50 backdrop-blur-lg border border-white/30 rounded-4x1 mx-auto mt-6 max-w-md w-full p-6">
  <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">🏋️ Add Your Workout</h2>

  <!-- Workout Name -->
  <div class="mb-4">
    <label for="Username" class="block text-gray-700 font-medium mb-1">User Name:</label>
    <input type="text" id="Username" [(ngModel)]="Username"
      class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-gray-400">
  </div>

  <!-- Workout Type Dropdown -->
  <div class="mb-4">
    <label for="workoutType" class="block text-gray-700 font-medium mb-1">Workout Type:</label>
    <select id="workoutType" [(ngModel)]="workoutType"
      class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm">
      <option value="" disabled selected>Select Workout Type</option>
      <option value="Cardio">🏃‍♂️ Cardio</option>
      <option value="Strength">💪 Strength</option>
      <option value="Yoga">🧘 Yoga</option>
      <option value="Flexibility">🤸 Flexibility</option>
      <option value="HIIT">🔥 HIIT</option>
    </select>
  </div>

  <!-- Workout Duration -->
  <div class="mb-4">
    <label for="workoutMinutes" class="block text-gray-700 font-medium mb-1">Duration (Minutes):</label>
    <input type="number" id="workoutMinutes" [(ngModel)]="workoutMinutes" min="1"
      class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm">
  </div>

  <!-- Add Workout Button -->
  <button (click)="addWorkout()"
    class="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
    Add Workout
  </button>
</div>

  `,
  styles: []
})
export class WorkoutFormComponent {
  @Output() workoutAdded = new EventEmitter<Workout>();

  Username: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  addWorkout() {
    if (!this.Username || !this.workoutType || this.workoutMinutes <= 0) {
      alert('⚠️ Please fill out all fields correctly.');
      return;
    }

    const workoutData: Workout = {
      personName: this.Username,
      type: this.workoutType,
      minutes: this.workoutMinutes
    };

    this.workoutAdded.emit(workoutData);

    this.Username = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
