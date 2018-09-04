import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { YoComponent } from "./yo/yo.component";
import { InnobotService } from "./innobot.service";

@NgModule({
  declarations: [
    YoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    InnobotService
  ],
  entryComponents: [
    YoComponent
  ]

})
export class AppModule {

  private injector: Injector;

  constructor(injector: Injector) {
    this.injector = injector;
  }

  public ngDoBootstrap(): void {

    customElements.define("app-yo", createCustomElement(YoComponent, { injector: this.injector }));

  }

}