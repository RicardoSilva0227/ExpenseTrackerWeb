import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RedirectCommand } from '@angular/router';

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

  constructor(
    private apiService: ApiService,
    private _router: Router,
  ) {}


  ngOnInit() {
    this.fetchExpenses();
  }

  fetchExpenses() {
    this.apiService.getAll('Expenses/GetAllExpenses', this.pageSize, this.pageNumber).subscribe(response => {
      this.expenses = response.result;
    });
  }
  
  SetExpense(id?:number){
    if(typeof id === 'undefined'){
      this._router.navigate(['/Expense/AddOrEdit']);  
    } else {
      this._router.navigate(['/Expense/AddOrEdit', id]);  
    }
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
