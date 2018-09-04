import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { YoComponent } from "./yo/yo.component";
import { Yo2Component } from "./yo2/yo2.component";
import { InnobotService } from "./innobot.service";

@NgModule({
  declarations: [
    YoComponent,
    Yo2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [InnobotService],
  bootstrap: [YoComponent, Yo2Component],
  entryComponents: [YoComponent, Yo2Component]

})
export class AppModule {

  private injector: Injector;

  constructor(injector: Injector) {
    this.injector = injector;
  }

  public ngDoBootstrap(): void {

    customElements.define("app-yo", createCustomElement(YoComponent, { injector: this.injector }));
    customElements.define("app-yo2", createCustomElement(Yo2Component, { injector: this.injector }));

  }

}