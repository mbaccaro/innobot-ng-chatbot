import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { InnobotService } from "./innobot.service";
import { FAQModule } from "./faq/faq.module";
import { QnaManagementComponent } from "./faq/qna-management.component";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    FAQModule
  ],
  providers: [
    InnobotService
  ],
})
export class AppModule {

  private injector: Injector;

  constructor(injector: Injector) {
    
    this.injector = injector;

  }

  public ngDoBootstrap(): void {
    
    customElements.define("qna-management", createCustomElement(QnaManagementComponent, { injector: this.injector }));

  }

}