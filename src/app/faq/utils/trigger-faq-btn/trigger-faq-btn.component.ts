import { Component, OnInit, Output } from "@angular/core";
import { LayoutService } from "../../../layout/layout.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-trigger-faq-btn",
  templateUrl: "./trigger-faq-btn.component.html",
  styleUrls: ["./trigger-faq-btn.component.css"]
})
export class TriggerFaqBtnComponent implements OnInit {

  private isFaqOpen: boolean;

  constructor(private layoutService: LayoutService) {
    
    this.layoutService.config.subscribe(layout => {
      this.isFaqOpen = layout.isFaqOpen;
    });

  }

  ngOnInit() {

  }

  toggleFaq() {

    this.layoutService.toggleFAQ();

  }

}
