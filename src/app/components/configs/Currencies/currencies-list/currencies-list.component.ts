import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-currencies-list',
  imports: [MatTableModule, CommonModule],
  templateUrl: './currencies-list.component.html',
  styleUrl: './currencies-list.component.css'
})
export class CurrenciesListComponent {

  currencies: any = [];
  pageSize: number = 10;
  pageNumber: number = 1;

  constructor(
     private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

   ngOnInit() {
    this.fetchCurrencies();
  }

  
  fetchCurrencies() {
    this.apiService.getAll('Configs/Currency/GetAllCurrencies', this.pageSize, this.pageNumber).subscribe(response => {
      this.currencies = response.result;
    });
  }

    SetEditCurrency(id?:number){
    if(typeof id === 'undefined'){
      this.router.navigate(['Configs/Currencies/AddOrEdit']);  
    } else {
      this.router.navigate(['Configs/Currencies/AddOrEdit/', id]);  
    }
  }

   DeleteCurrency(id?:number){
    if(id) {
       this.apiService.delete('Configs/Currency/DeleteCurrency', id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.snackBar.open('Currency deleted successfully!', 'Close', {
              duration: 4000,
              panelClass: ['success-snackbar']
            });
          }
          this.fetchCurrencies();
        },
        error: (error) => {
          this.snackBar.open('Failed to delete Currency.', 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Id does not exist.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
    }
  }


  nextPage() {
    this.pageNumber++;
    this.fetchCurrencies();
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchCurrencies();
    }
  }
}
