import { Component, OnInit, Input, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";

@Component({
  selector: "app-innobot",
  template: ""
})

export class BootstrapComponent implements OnInit {

  private injector: Injector;

  constructor(injector: Injector) {

    this.injector = injector;
    
  }

  public ngOnInit() {
   
  }
}
