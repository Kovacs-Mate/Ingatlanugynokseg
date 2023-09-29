import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { Ingatlan } from "../interfaces/ingatlan";
import { Kategoriak } from "../interfaces/kategoriak";

@Injectable({
    providedIn: "root"
})
export class BaseService {
    private ingatlanokRef: AngularFireList<Ingatlan>;
    private kategoriakRef: AngularFireList<Kategoriak>;

    constructor(private fireDB: AngularFireDatabase) {
        this.ingatlanokRef = this.fireDB.list("/ingatlan/ingatlanok");
        this.kategoriakRef = this.fireDB.list("/ingatlan/kategoriak");
    }

    public getIngatlanok(): AngularFireList<Ingatlan> {
        this.ingatlanokRef = this.fireDB.list("/ingatlan/ingatlanok");
        return this.ingatlanokRef;
    }

    public getKategoriak(): AngularFireList<Kategoriak> {
        this.kategoriakRef = this.fireDB.list("/ingatlan/kategoriak");
        return this.kategoriakRef;
    }

    public addIngatlan(item: Ingatlan): void {
        this.ingatlanokRef.push(item);
    }
}
