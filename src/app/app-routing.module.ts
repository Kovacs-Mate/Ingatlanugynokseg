import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { OffersComponent } from "./components/offers/offers.component";
import { NewadComponent } from "./components/newad/newad.component";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "offers", component: OffersComponent },
    { path: "newad", component: NewadComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
