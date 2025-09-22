import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BankRoutingModule } from "../bank/bank-routing.module";
import { DashboardComponent } from "../bank/components/dashboard/dashboard.component";

const routes: Routes = [
  {path: "", redirectTo: "auth", pathMatch:"full" },
  {path: "auth", component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
