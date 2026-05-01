import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  currentMonth: string = '';
  selectedPeriod: number = 30;

  // ── Pie Chart Data ───────────────────────────────────────────────────────────
  pieLabels = ['Medical', 'Supermarket', 'Transport', 'Investment', 'Other'];
  pieData   = [35, 28, 18, 12, 7];
  pieColors = ['#7c3aed', '#9d5ff5', '#38bdf8', '#f59e0b', '#6e6a8a'];

  // ── Recent Expenses (static for now — replace with API call) ─────────────────
  recentExpenses = [
    { title: 'SP500 Investment', type: 'Investment', date: '01 Apr 2026', amount: 200.00, badgeClass: 'badge-warning' },
    { title: 'Vodafone',         type: 'Utilities',  date: '05 Apr 2026', amount: 35.00,  badgeClass: 'badge-purple'  },
    { title: 'Continente',       type: 'Supermarket',date: '12 Apr 2026', amount: 87.50,  badgeClass: 'badge-success' },
    { title: 'Farmácia',         type: 'Medical',    date: '18 Apr 2026', amount: 22.00,  badgeClass: 'badge-danger'  },
    { title: 'Consulta Médica',  type: 'Medical',    date: '22 Apr 2026', amount: 60.00,  badgeClass: 'badge-danger'  },
    { title: 'Uber',             type: 'Transport',  date: '25 Apr 2026', amount: 14.80,  badgeClass: 'badge-purple'  },
  ];

  ngOnInit() {
    this.currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  ngAfterViewInit() {
    this.buildPieChart();
    this.buildBarChart();
  }

  private buildPieChart() {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: this.pieLabels,
        datasets: [{
          data: this.pieData,
          backgroundColor: this.pieColors,
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.label}: ${ctx.parsed}%`
            }
          }
        }
      }
    });
  }

  private buildBarChart() {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Spent (€)',
          data: [980, 1420, 870, 1650, 1100, 1240],
          backgroundColor: ['#2d1b6e', '#2d1b6e', '#2d1b6e', '#2d1b6e', '#2d1b6e', '#7c3aed'],
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#6e6a8a', font: { size: 11 } },
            grid: { display: false },
            border: { display: false }
          },
          y: {
            ticks: {
              color: '#6e6a8a',
              font: { size: 11 },
              callback: (v) => '€' + Number(v).toLocaleString()
            },
            grid: { color: 'rgba(255,255,255,0.05)' },
            border: { display: false }
          }
        }
      }
    });
  }
}