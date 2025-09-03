import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-configs',
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatSlideToggleModule],
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

  initializeForm() {
    this.apiService.getSingleton('Configs/GetConfig').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.configsForm = this.fb.group({
            id: [response.result.id],
            useFtp: [response.result.useFtp ?? false],
            ftpServer: [response.result.ftpServer],
            ftpUsername: [response.result.ftpUsername],
            ftpPassword: [response.result.ftpPassword],
            ftpPort: [response.result.ftpPort],
            smtpServer: [response.result.smtpServer],
            smtpPort: [response.result.smtpPort],
            smtpUsername: [response.result.smtpUsername],
            smtpPassword: [response.result.smtpPassword],
            timezone: [response.result.timezone],
            dateFormat: [response.result.dateFormat],
            enableMultiCurrency: [response.result.enableMultiCurrency ?? true],
            enableDiscounts: [response.result.enableDiscounts ?? false]
          });
        }
      },
      error: (error) => {
        this.snackBar.open('Failed to fetch config.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });

    this.loadCurrencies();
  }


  loadCurrencies() {
    this.apiService.getAll('Configs/Currency/GetAllCurrencies').subscribe({
      next: (response) => {
        if (response.isSuccess) {
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
      this.apiService.updateSingleton('Configs/UpdateConfig', model).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.snackBar.open('Configs updated successfully!', 'Close', {
              duration: 4000,
              panelClass: ['success-snackbar']
            });
          }
        },
        error: (error) => {
          this.snackBar.open('Failed to update Configs.', 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
}
