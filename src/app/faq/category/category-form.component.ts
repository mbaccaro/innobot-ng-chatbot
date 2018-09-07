import { Component, Input, ViewEncapsulation, Injector, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AppComponentBase } from "../../shared/common/app-base-component";
import { CategoryDto } from "./category-model";
import { ChatBotAgentCategory } from "innobot-chat-api";
import { FAQService } from "../faq-service";

@Component({
  selector: "category-form",
  templateUrl: "./category-form.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CategoryFormComponent extends AppComponentBase implements OnInit {

  private faqService: FAQService;
  private chatBotAgentCategoryIntance: ChatBotAgentCategory;
  @Output() public save: EventEmitter<CategoryDto> = new EventEmitter();
  @Output() public cancel: EventEmitter<CategoryDto> = new EventEmitter();

  @Input() public set model(model: CategoryDto) {

    this.category = model;
    this.active = !(this.category === undefined);
    this.validate = false;

  }

  public get model() {
    return this.category;
  }

  public category: CategoryDto;
  public active: boolean;
  public saving: boolean;
  public formValidation: FormGroup;
  public validate: any = false;
  private formBuilder: FormBuilder;

  public constructor(injector: Injector) {
    super(injector);

    this.formBuilder = injector.get(FormBuilder);
    this.faqService = injector.get(FAQService);

  }

  public ngOnInit(): void {

    this.active = false;
    this.saving = false;
    this.validate = false;
    this.createValidationModel();
    this.chatBotAgentCategoryIntance = this.faqService.getChatBotAgentCategory();

  }

  public createValidationModel(): void {

    // this.formValidation = this.formBuilder.group({
    //   Name: [{ value: null }, [Validators.maxLength(100), Validators.required]]
    // });

  }

  public onCancel(): void {
    this.close();
  }

  public close(): void {

    this.active = false;
    this.cancel.emit();

  }

  public onSave(): void {

    debugger;
    this.validate = true;

   // if (this.formValidation.valid) {


      if (this.category.id > 0) {
        this.updateCategory(this.category);
      } else {
        this.createCategory(this.category);
      }

      this.save.emit(this.category);

   // }

  }

  private createCategory(category: CategoryDto): void {

    this.chatBotAgentCategoryIntance.addCategory(category)
      .subscribe((result) => {

        if (result.value > 0) {
          //this.notify.info(this.l("SavedSuccessfully"));
        } else {
          this.checkResultError(result);
        }

      });

  }

  private updateCategory(category: CategoryDto): void {

    this.chatBotAgentCategoryIntance.editCategory(category)
      .subscribe((result) => {

        if (result.value > 0) {
          //this.notify.info(this.l("SavedSuccessfully"));
         
        } else {
          this.checkResultError(result);
        }

      });

  }

}