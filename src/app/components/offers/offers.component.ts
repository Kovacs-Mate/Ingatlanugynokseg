import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { Ingatlan } from "src/app/interfaces/ingatlan";
import { Kategoriak } from "src/app/interfaces/kategoriak";
import { BaseService } from "src/app/services/base.service";

@Component({
    selector: "app-offers",
    templateUrl: "./offers.component.html",
    styleUrls: ["./offers.component.css"]
})
export class OffersComponent implements OnInit {
    public error: boolean = false;
    public errorMessage: string = "";
    public ingatlanokList: Array<Ingatlan> = [];
    private kategoriakList: Array<Kategoriak> = [];

    constructor(private bs: BaseService) {}

    ngOnInit(): void {
        this.getIngatlanok();
        this.getkategotiak();
    }

    private getIngatlanok(): void {
        this.bs
            .getIngatlanok()
            .snapshotChanges()
            .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
            .subscribe({
                next: data => {
                    this.ingatlanokList = data;
                    this.error = false;
                },
                error: error => {
                    this.error = true;
                    this.errorMessage = error.message;
                }
            });
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

    public tehermentes(item: boolean): string {
        if (item) return "igen";
        else return "nem";
    }

    public kategoria(id: string): string {
        const result: Kategoriak = this.kategoriakList.find(kategoria => kategoria.key === id);
        return result.megnevezes;
    }
}
