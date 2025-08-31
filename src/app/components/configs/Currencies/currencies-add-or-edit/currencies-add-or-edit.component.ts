import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-currencies-add-or-edit',
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './currencies-add-or-edit.component.html',
  styleUrl: './currencies-add-or-edit.component.css'
})
export class CurrenciesAddOrEditComponent {
  model: any;
  currencyForm!: FormGroup; //the "!" tells angular to ignore if the class is already initialized or not
  private _id!: number;

  @Input()
  set id(currencyId: number) {
    this._id = currencyId;
  }

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this._id) {
      this.apiService.getById('Configs/Currency/GetCurrency/', this._id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.currencyForm = this.fb.group({
              id: [response.result.id],
              name: [response.result.name, [Validators.required]],
              acronym: [response.result.acronym, [Validators.required]],
              symbol: [response.result.symbol, [Validators.required]],
              decimalPlaces: [response.result.decimalPlaces, [Validators.required]],
              cultureCode: [response.result.cultureCode, [Validators.required]],
              exchangeRateToBase: [response.result.exchangeRateToBase],
              isDefault: [response.result.isDefault ?? false],
              isCrypto: [response.result.isCrypto ?? false],
              country: [response.result.country]
            });

          }
        },
        error: (error) => {
          this.snackBar.open('Failed to fetch currency.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.currencyForm = this.fb.group({
        name: ['', [Validators.required]],
        acronym: ['', [Validators.required]],
        symbol: ['', [Validators.required]],
        decimalPlaces: ['', [Validators.required]],
        cultureCode: ['', [Validators.required]],
        exchangeRateToBase: [''],
        isDefault: [false],
        isCrypto: [false],
        country: ['']
      });
    }
  }

    goBack(){
    this.router.navigate(['Configs/Currencies/List']);
  }

  onSubmit(model:any) {
    if (this._id){
      this.apiService.update('Configs/Currency/UpdateCurrency', this._id, model).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.snackBar.open('Currency type updated successfully!', 'Close', {
              duration: 4000,
              panelClass: ['success-snackbar']
            });
          }
        },
        error: (error) => {
          this.snackBar.open('Failed to update currency.', 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.apiService.create('Configs/Currency/CreateCurrency', model).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.snackBar.open('Currency added successfully!', 'Close', {
              duration: 4000,
              panelClass: ['success-snackbar']
            });
          }
        },
        error: (error) => {
          this.snackBar.open('Failed to add currency.', 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

}
