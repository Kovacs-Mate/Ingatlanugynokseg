import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { Kategoriak } from "src/app/interfaces/kategoriak";
import { BaseService } from "src/app/services/base.service";

@Component({
    selector: "app-newad",
    templateUrl: "./newad.component.html",
    styleUrls: ["./newad.component.css"]
})
export class NewadComponent implements OnInit {
    public error: boolean = false;
    public errorMessage: string = "";
    public kategoriakList: Array<Kategoriak>;
    public adat: FormGroup;
    public currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "/") as string;

    constructor(private bs: BaseService, private formBuilder: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.adat = this.formBuilder.group({
            hirdetesDatuma: [this.currentDate, [Validators.required]],
            kategoriaid: ["", [Validators.required]],
            kepUrl: ["", [Validators.required]],
            leiras: ["", [Validators.required]],
            tehermentes: [false, [Validators.required]]
        });

        this.getkategotiak();
    }

    private getkategotiak(): void {
        this.bs
            .getKategoriak()
            .snapshotChanges()
            .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
            .subscribe({
                next: data => {
                    this.kategoriakList = data;
                    this.error = false;
                },
                error: error => {
                    this.error = true;
                    this.errorMessage = error.message;
                }
            });
    }

    sendData(): void {
        if (this.adat.valid) {
            this.bs.addIngatlan(this.adat.value);
            this.router.navigate(["/offers"]);
        } else {
            alert("Minden mezőz ki kell tölteni!");
            console.log(this.adat.value);
        }
    }
}
