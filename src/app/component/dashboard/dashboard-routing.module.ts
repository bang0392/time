import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatDialogModule } from "@angular/material/dialog";

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatDialogModule
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
