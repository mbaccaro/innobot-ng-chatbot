import { Component, OnInit } from "@angular/core";
import { InnobotService } from "../innobot.service";

@Component({
  selector: "app-yo",
  templateUrl: "./yo.component.html",
  styleUrls: ["./yo.component.css"]
})
export class YoComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public fullName: string;

  constructor(private innobot: InnobotService) { 

  }

  public ngOnInit() {

    this.firstName = "Marco";
    this.lastName = "Baccaro";
    this.fullName = "";

  }

  public printOut(): void {

    this.fullName = this.firstName + " " + this.lastName;
    this.innobot.calculate();
    
  }

}