import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  imports: [MatTableModule, CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  expenses: any = [];
  pageSize: number = 10;
  pageNumber: number = 1;

  constructor(private apiService: ApiService) {}


  ngOnInit() {
    this.fetchExpenses();
  }

  fetchExpenses() {
    this.apiService.getAll('Expenses/GetAllExpenses', this.pageSize, this.pageNumber).subscribe(response => {
      this.expenses = response.result;
    });
  }

  nextPage() {
    this.pageNumber++;
    this.fetchExpenses();
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchExpenses();
    }
  }
}
