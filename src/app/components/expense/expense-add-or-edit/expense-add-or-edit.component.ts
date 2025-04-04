import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-expense-add-or-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-add-or-edit.component.html',
  styleUrl: './expense-add-or-edit.component.css'
})
export class ExpenseAddOrEditComponent implements OnInit {
  model: any;
  expenseForm!: FormGroup; //the "!" tells angular to ignore if the class is already initialized or not
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar) {
      
    }

  ngOnInit() {
    this.expenseForm = this.fb.group({
      Title: ['', [Validators.required, Validators.minLength(3)]],
      Amount: ['', [Validators.required, Validators.min(1)]],
      DateOfEmission: ['', [Validators.required]],
      ExpenseTypeId: ['', Validators.required],
      Code: ['a']
    });
  }

  onSubmit(model:any) {
    this.apiService.create('Expenses/CreateExpense', model).subscribe(response => {
      if (response.isSuccess){
        this.snackBar.open('Expense added successfully!', 'Close', {
          duration: 3000, // Auto-close after 3s
          panelClass: ['success-snackbar']
        });
      } else {
        this.snackBar.open('Failed to add expense.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}