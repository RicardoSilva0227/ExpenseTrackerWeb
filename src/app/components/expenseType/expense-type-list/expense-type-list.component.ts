import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-type-list',
  imports: [MatTableModule, CommonModule],
  templateUrl: './expense-type-list.component.html',
  styleUrl: './expense-type-list.component.css'
})
export class ExpenseTypeListComponent {

  expenseTypes: any = [];
  pageSize: number = 10;
  pageNumber: number = 1;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchExpenseTypes();
  }

  fetchExpenseTypes() {
    this.apiService.getAll('ExpensesTypes/GetAllExpenseTypes', this.pageSize, this.pageNumber).subscribe(response => {
      this.expenseTypes = response.result;
    });
  }
  
  SetEditExpenseType(id?:number){
    if(typeof id === 'undefined'){
      this.router.navigate(['/ExpenseType/AddOrEdit']);  
    } else {
      this.router.navigate(['/ExpenseType/AddOrEdit/', id]);  
    }
  }

  nextPage() {
    this.pageNumber++;
    this.fetchExpenseTypes();
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchExpenseTypes();
    }
  }
}
