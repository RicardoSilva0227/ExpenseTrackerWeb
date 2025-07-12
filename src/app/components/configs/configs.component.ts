import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-configs',
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './configs.component.html',
  styleUrl: './configs.component.css'
})
export class ConfigsComponent implements OnInit {
    model: any;
    configsForm!: FormGroup; //the "!" tells angular to ignore if the class is already initialized or not
    private _id!: number;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    if (this._id) {
      this.apiService.getById('Expenses/GetExpense', this._id).subscribe({
        next: (response) => {
          if (response.isSuccess){
            this.configsForm =  this.fb.group({
              Id: [response.result.id],
              CurrencyId: [response.result.CurrencyId, [Validators.required]],
              InvoicePath: [response.result.InvoicePath, [Validators.required]],              
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
      this.configsForm = this.fb.group({
        Id: [''],
        CurrencyId: ['', [Validators.required]],
        InvoicePath: ['', [Validators.required]],
      });
    }
  }
}

