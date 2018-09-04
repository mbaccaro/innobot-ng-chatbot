import { Component, Input, ViewEncapsulation, Injector, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AppComponentBase } from "../../shared/common/app-base-component";

@Component({
  selector: "category-form",
  templateUrl: "./category-form.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CategoryFormComponent extends AppComponentBase implements OnInit {

  // @Output() public save: EventEmitter<CategoryDto> = new EventEmitter();
  // @Output() public cancel: EventEmitter<CategoryDto> = new EventEmitter();

  // @Input() public set model(model: CategoryDto) {

  //   this.category = model;
  //   this.active = !(this.category === undefined);
  //   this.validate = false;

  // }

  // public get model() {
  //   return this.category;
  // }

  // public category: CategoryDto;
  // public active: boolean;
  // public saving: boolean;
  // public formValidation: FormGroup;
  // public validate: any = false;
  // private formBuilder: FormBuilder;

  // public constructor(injector: Injector) {

  //   super(injector);
  //   this.formBuilder = injector.get(FormBuilder);

  // }

  public ngOnInit(): void {

    // this.active = false;
    // this.saving = false;
    // this.validate = false;
    // this.category = new CategoryDto();
    // this.createValidationModel();

  }

  // public createValidationModel(): void {

  //   this.formValidation = this.formBuilder.group({
  //     Name: [{ value: null }, [Validators.maxLength(100), Validators.required]]
  //   });

  // }

  // public onCancel(): void {
  //   this.close();
  // }

  // public close(): void {

  //   this.active = false;
  //   this.cancel.emit();

  // }

  // public onSave(): void {

  //   this.validate = true;

  //   if (this.formValidation.valid) {
  //     this.save.emit(this.category);
  //   }

  // }

}