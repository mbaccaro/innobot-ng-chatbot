import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { YoComponent } from "./yo/yo.component";
import { InnobotService } from "./innobot.service";
import { Yo2Component } from "./yo2/yo2.component";
import { FAQModule } from "./faq/faq.module";
import { LayoutModule } from "./layout/layout.module";

@NgModule({
  declarations: [
    YoComponent, 
    Yo2Component
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    LayoutModule,
    FAQModule
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