import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarningComponent } from './warning.component';

const routes: Routes = [
    { path: '', component: WarningComponent },
    { path: ':code', component: WarningComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WarningRoutingModule { }