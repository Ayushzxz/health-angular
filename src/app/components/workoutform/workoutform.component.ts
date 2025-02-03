import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../shared/workout.model';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white bg-opacity-50 backdrop-blur-lg border border-white/30 rounded-4xl mx-auto mt-6 max-w-md w-full p-6 shadow-lg transition-opacity duration-500 animate-fadeIn">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">🏋️ Add Your Workout</h2>

      <!-- Username -->
      <div class="mb-4">
        <label for="Username" class="block text-gray-700 font-medium mb-1">User Name:</label>
        <div class="relative">
          <input type="text" id="Username" [(ngModel)]="Username"
            class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-gray-400"
            placeholder="Enter your name">
          <span *ngIf="usernameError" class="text-red-500 text-sm absolute mt-1">{{ usernameError }}</span>
        </div>
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
        <span *ngIf="workoutTypeError" class="text-red-500 text-sm">{{ workoutTypeError }}</span>
      </div>

      <!-- Workout Duration -->
      <div class="mb-4">
        <label for="workoutMinutes" class="block text-gray-700 font-medium mb-1">Duration (Minutes):</label>
        <div class="relative">
          <input type="number" id="workoutMinutes" [(ngModel)]="workoutMinutes" min="1"
            class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            placeholder="Enter duration in minutes">
          <span *ngIf="workoutMinutesError" class="text-red-500 text-sm absolute mt-1">{{ workoutMinutesError }}</span>
        </div>
      </div>

      <!-- Add Workout Button -->
      <button (click)="addWorkout()"
        class="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
        Add Workout
      </button>

      <!-- Success Message -->
      <div *ngIf="successMessage" class="mt-4 text-green-600 text-center font-semibold">
        ✅ {{ successMessage }}
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
  `]
})
export class WorkoutFormComponent {
  @Output() workoutAdded = new EventEmitter<Workout>();

  Username: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;
  successMessage: string = '';

  usernameError: string = '';
  workoutTypeError: string = '';
  workoutMinutesError: string = '';

  addWorkout() {
    this.clearErrors();

    if (!this.Username.trim()) {
      this.usernameError = '⚠️ Name is required.';
    }
    if (!this.workoutType) {
      this.workoutTypeError = '⚠️ Please select a workout type.';
    }
    if (this.workoutMinutes <= 0 || isNaN(this.workoutMinutes)) {
      this.workoutMinutesError = '⚠️ Enter a valid number greater than 0.';
    }

    if (this.usernameError || this.workoutTypeError || this.workoutMinutesError) {
      return;
    }

    const workoutData: Workout = {
      personName: this.Username,
      type: this.workoutType,
      minutes: this.workoutMinutes
    };

    this.workoutAdded.emit(workoutData);

    this.successMessage = `Workout added for ${this.Username}! 💪`;
    setTimeout(() => this.successMessage = '', 3000);

    this.Username = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }

  clearErrors() {
    this.usernameError = '';
    this.workoutTypeError = '';
    this.workoutMinutesError = '';
  }
}
