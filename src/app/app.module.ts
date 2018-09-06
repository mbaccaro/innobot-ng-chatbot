import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, Injector } from "@angular/core";
import { InnobotService } from "./innobot.service";
import { FAQModule } from "./faq/faq.module";
import { InnobotConfigComponent } from "./innobot-config.component";
import { createCustomElement } from "@angular/elements";

@NgModule({
  declarations: [
    InnobotConfigComponent,
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    FAQModule
  ],
  providers: [
    InnobotService
  ],
  bootstrap: [],
  entryComponents: [
    InnobotConfigComponent
  ]
})

export class AppModule {

  private injector: Injector;

  constructor(injector: Injector) {

    this.injector = injector;
    
  }

  public ngDoBootstrap(): void {
    customElements.define("app-innobot-config", createCustomElement(InnobotConfigComponent, { injector: this.injector }));
  }
}