import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class InnobotService {

  constructor() { }

  public calculate(): void {
    console.log("calculation");
  }

}