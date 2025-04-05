import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-expense-add-or-edit',
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './expense-add-or-edit.component.html',
  styleUrl: './expense-add-or-edit.component.css'
})

export class ExpenseAddOrEditComponent implements OnInit {
  model: any;
  expenseForm!: FormGroup; //the "!" tells angular to ignore if the class is already initialized or not
  expenseTypes: any[] = [];

  private _id!: number;

  @Input()
  set id(expenseId: number) {
    this._id = expenseId;
  }

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar) {      
    }

  ngOnInit() {
    if (this._id) {
      this.apiService.getById('Expenses/GetExpense', this._id).subscribe({
        next: (response) => {
          if (response.isSuccess){

            this.expenseForm =  this.fb.group({
              Title: [response.result.title, [Validators.required, Validators.minLength(3)]],
              Amount: [response.result.amount, [Validators.required, Validators.min(1)]],
              DateOfEmission: [this.formatDateForInput(response.result.dateOfEmission), [Validators.required]],
              ExpenseTypeId: [response.result.expenseTypeId, Validators.required],
              Code: ['a'] // make code not required on the backend
            });
            
          }
        },
        error: (error) => {
          this.snackBar.open('Failed to fetch expenses.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.expenseForm = this.fb.group({
        Title: ['', [Validators.required, Validators.minLength(3)]],
        Amount: ['', [Validators.required, Validators.min(1)]],
        DateOfEmission: ['', [Validators.required]],
        ExpenseTypeId: ['', Validators.required],
        Code: ['a'] // make code not required on the backend
      });
    }

    this.loadExpenseType();
  }


  loadExpenseType(){
    this.apiService.getAll('ExpensesTypes/GetAllExpenseTypes').subscribe({
      next: (response) => {
        if (response.isSuccess){
          this.expenseTypes = response.result;
        }
      },
      error: (error) => {
        this.snackBar.open('Failed to fetch expenses.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  private formatDateForInput(dateString: string | null): string {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  }

  goBack(){
    this.router.navigate(['Expense/List']);
  }

  onSubmit(model:any) {
    this.apiService.create('Expenses/CreateExpense', model).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.snackBar.open('Expense added successfully!', 'Close', {
            duration: 4000,
            panelClass: ['success-snackbar']
          });
        }
      },
      error: (error) => {
        this.snackBar.open('Failed to add expense.', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}