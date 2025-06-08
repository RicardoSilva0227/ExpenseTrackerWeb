import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BaseChartDirective  } from 'ng2-charts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletSummary } from '../Models/WalletSummary';


export class TestComponent {
  amount: number = 2;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  monthlySummary: WalletSummary = new WalletSummary();
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  private _id!: number;

  constructor(private apiService: ApiService,
        private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadSummary();
    this.loadPieChart();
  }

  loadSummary() {

    this._id = 2;
    this.apiService.getById('Dashboard/GetWalletSummary', this._id).subscribe({
      next: (response) => {
        if (response.isSuccess){
          this.monthlySummary = response.result;
          
        }
      },
      error: (error) => {
        this.snackBar.open('Failed to fetch Wallets.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  loadPieChart() {
    // this.apiService.getAll('Dashboard/GetExpensesByType', {}).subscribe(res => {
    //   const data = res.result;
    //   this.pieChartLabels = data.map((x: any) => x.expenseType);
    //   this.pieChartData = data.map((x: any) => x.total);
    // });
  }
}