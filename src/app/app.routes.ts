import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseListComponent } from './components/expense/expense-list/expense-list.component';
import { ExpenseAddOrEditComponent } from './components/expense/expense-add-or-edit/expense-add-or-edit.component';
import { ExpenseTypeListComponent } from './components/expenseType/expense-type-list/expense-type-list.component';
import { ExpenseTypeAddOrEditComponent } from './components/expenseType/expense-type-add-or-edit/expense-type-add-or-edit.component';
import { ConfigsComponent } from './components/configs/configs.component'
import { CurrenciesListComponent } from './components/configs/Currencies/currencies-list/currencies-list.component';
import { CurrenciesAddOrEditComponent } from './components/configs/Currencies/currencies-add-or-edit/currencies-add-or-edit.component';


export const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent }, 

  // Expenses
  { path: 'Expense/List', component: ExpenseListComponent },
  { path: 'Expense/AddOrEdit', component: ExpenseAddOrEditComponent },
  { path: 'Expense/AddOrEdit/:id', component: ExpenseAddOrEditComponent },

  // expense types
  { path: 'ExpenseType/List', component: ExpenseTypeListComponent },
  { path: 'ExpenseType/AddOrEdit', component: ExpenseTypeAddOrEditComponent },
  { path: 'ExpenseType/AddOrEdit/:id', component: ExpenseTypeAddOrEditComponent },

  // configs
  {path: 'Configs', component: ConfigsComponent},
  {path: 'Configs/Currencies/List', component: CurrenciesListComponent},
  {path: 'Configs/Currencies/AddOrEdit', component: CurrenciesAddOrEditComponent},
  {path: 'Configs/Currencies/AddOrEdit/:id', component: CurrenciesAddOrEditComponent},

];
  