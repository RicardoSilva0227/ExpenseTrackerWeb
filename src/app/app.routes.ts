import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseListComponent } from './components/expense/expense-list/expense-list.component';
import { ExpenseAddOrEditComponent } from './components/expense/expense-add-or-edit/expense-add-or-edit.component';

export const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent }, 

  // Expenses
  { path: 'Expense/List', component: ExpenseListComponent },
  { path: 'Expense/AddOrEdit', component: ExpenseAddOrEditComponent },
];
  