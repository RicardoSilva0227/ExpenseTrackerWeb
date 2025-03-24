import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-add-or-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-add-or-edit.component.html',
  styleUrl: './expense-add-or-edit.component.css'
})
export class ExpenseAddOrEditComponent {
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }

  onSubmit() {

  }
}