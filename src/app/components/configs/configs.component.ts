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
    Currencies: any[] = [];



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
        CurrencyId: ['', [Validators.required]],
      });
    }

    this.loadCurrencies();
  }


    loadCurrencies(){
    this.apiService.getAll('Configs/Currency/GetAllCurrencies').subscribe({
      next: (response) => {
        if (response.isSuccess){
          this.Currencies = response.result;
        }
      },
      error: (error) => {
        this.snackBar.open('Failed to fetch currencies.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }


  onSubmit(model:any) {
    // if (this._id){
    //   this.apiService.update('Expenses/UpdateExpense', this._id, model).subscribe({
    //     next: (response) => {
    //       if (response.isSuccess) {
    //         this.snackBar.open('Expense updated successfully!', 'Close', {
    //           duration: 4000,
    //           panelClass: ['success-snackbar']
    //         });
    //       }
    //     },
    //     error: (error) => {
    //       this.snackBar.open('Failed to update expense.', 'Close', {
    //         duration: 4000,
    //         panelClass: ['error-snackbar']
    //       });
    //     }
    //   });
    // } else {
    //   this.apiService.create('Expenses/CreateExpense', model).subscribe({
    //     next: (response) => {
    //       if (response.isSuccess) {
    //         this.snackBar.open('Expense added successfully!', 'Close', {
    //           duration: 4000,
    //           panelClass: ['success-snackbar']
    //         });
    //       }
    //     },
    //     error: (error) => {
    //       this.snackBar.open('Failed to add expense.', 'Close', {
    //         duration: 4000,
    //         panelClass: ['error-snackbar']
    //       });
    //     }
    //   });
    // }
  }


  // onFolderSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const firstFile = input.files[0] as any;
  //     const relativePath: string = firstFile.webkitRelativePath;
  //     const folderName = relativePath.split('/')[0]; // take top-level folder name

  //     // Update the form control with the folder name
  //     this.configsForm.get('InvoicePath')?.setValue(folderName);
  //   }
  // }
}
