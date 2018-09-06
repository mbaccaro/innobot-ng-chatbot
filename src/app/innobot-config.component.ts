import { Component, OnInit, Input, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { QnaManagementComponent } from "./faq/qna-management.component";
import { TriggerFaqBtnComponent } from "./faq/utils/trigger-faq-btn/trigger-faq-btn.component";

@Component({
  selector: "app-innobot-config",
  template: "<ng-content></ng-content>"
})

export class InnobotConfigComponent implements OnInit {
  
  // We do token validation and configuration etc.. in this component
  @Input() apiKey: string;
  @Input() agentName: string;

  private isTokenValidate = false;
  private injector: Injector;

  constructor(injector: Injector) {

    this.injector = injector;
    this.tokenValidation();
    this.activeFeatureByRole();
    
  }

  public ngOnInit() {
   console.log(this.apiKey);
  }

  public tokenValidation() {
    // TODO: do logic :)
    this.isTokenValidate = true;
  }

  public activeFeatureByRole() {

    // TODO: only active feature base on client or permission
    const canUseChat = true;
    const canUseFAQ = true;

    if (canUseFAQ) {
      customElements.define("qna-management", createCustomElement(QnaManagementComponent, { injector: this.injector }));
      customElements.define("app-trigger-faq-btn", createCustomElement(TriggerFaqBtnComponent, { injector: this.injector }));
    }

    if (canUseChat && this.isTokenValidate) {
      // TODO: define angular elements component for chat
    }

  }
  

}
