import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { Workout } from '../../shared/workout.model'; // Import the Workout interface


@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #workoutChart></canvas>
  `,
  styles: []
})
export class WorkoutChartComponent implements AfterViewInit, OnChanges {
  @Input() workoutList: Workout[] = [];
  @ViewChild('workoutChart') workoutChart!: ElementRef;
  chart: any;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  createChart() {
    if (this.workoutChart && this.workoutChart.nativeElement) {
      const ctx = this.workoutChart.nativeElement.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar', // You can change this to 'line', 'pie', etc.
          data: {
            labels: this.workoutList.map(workout => `${workout.personName} - ${workout.type}`),
            datasets: [{
              label: 'Minutes',
              data: this.workoutList.map(workout => workout.minutes),
              backgroundColor: [ // Example of different colors per person
                'rgba(255, 99, 132, 0.2)', // Red
                'rgba(54, 162, 235, 0.2)', // Blue
                'rgba(255, 206, 86, 0.2)', // Yellow
                'rgba(75, 192, 192, 0.2)', // Teal
                'rgba(153, 102, 255, 0.2)', // Purple
                'rgba(255, 159, 64, 0.2)',  // Orange
                'rgba(255, 99, 132, 0.2)', // Red (repeat if needed)
                'rgba(54, 162, 235, 0.2)'  // Blue (repeat if needed)
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: { // Add a title to the y-axis
                  display: true,
                  text: 'Minutes'
                }
              },
              x: { // Add a title to the x-axis
                title: {
                  display: true,
                  text: 'Workout'
                }
              }
            },
            plugins: { // Add a title to the chart
              title: {
                display: true,
                text: 'Workout Progress',
                font: {
                  size: 16
                }
              }
            }
          }
        });
      }
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.workoutList.map(workout => `${workout.personName} - ${workout.type}`);
      this.chart.data.datasets[0].data = this.workoutList.map(workout => workout.minutes);
      this.chart.update();
    }
  }
}