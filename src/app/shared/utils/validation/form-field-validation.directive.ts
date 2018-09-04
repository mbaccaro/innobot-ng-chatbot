import { Directive, ElementRef, HostListener, Input, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "../../common/app-base-component";

@Directive({
    selector: "[formFieldValidation]"
})
export class FormFieldValidationDirective extends AppComponentBase implements OnInit {

    private element: any;
    private el: ElementRef;
    private validate: boolean;
    private errorBorderClass = "border-danger";
    private errorTextClass = "text-danger";
    private invalidClass = "ng-invalid";
    private pristineClass = "ng-pristine";
    @Input("formFieldValidation") public formFieldValidation: any;
    @Input("name") public name: string;
    @Input("formControlName") public formControlName: string;
    @Input("fieldValidate") public set fieldValidate(value: boolean) {

        this.validate = value;

        if (this.validate) {
            this.checkValidation();
        } else {
            this.clearErrors();
        }
    }

    constructor(injector: Injector, el: ElementRef) {

        super(injector);
        this.el = el;

    }

    public ngOnInit() {

        // this.element = $(this.el.nativeElement);

        // if (this.validate === undefined) {
        //     $(this.el.nativeElement.form ? this.el.nativeElement.form : "[name=form]").submit(this.checkValidation.bind(this));
        // }

        // if (!this.name) {
        //     this.name = this.formControlName;

        //     if (!this.name) {
        //         throw new Error("Name or FormControlName is not defined - FormFieldValidationDirective");
        //     }
        // }

    }

    @HostListener("blur", ["$event"])
    public blurEvent() {
        this.checkValidationEvent();
    }

    @HostListener("keyup", ["$event"])
    public keyupEvent() {
        this.checkValidationEvent();
    }

    @HostListener("click", ["$event"])
    public clickEvent() {
        this.checkValidationEvent();
    }

    private checkValidationEvent(): void {

        if (this.validate || !this.element.hasClass(this.pristineClass)) {
            this.checkValidation();
        }

    }

    private checkValidation(): void {

        this.clearErrors();

        if (this.element) {

            if (this.element.hasClass(this.invalidClass)) {

                const fieldMessageValidation = this.getFieldMessageValidation();
                this.element.addClass(this.errorBorderClass);
                const inputGroup = this.element.closest(".input-group");
                const messageElement = `<span formFieldValidationTarget="` + this.name + `"  class="m-form__help text-danger">` + fieldMessageValidation + `</span>`;

                if (inputGroup.length === 1) {
                    inputGroup.after(messageElement);
                } else {
                    this.element.after(messageElement);
                }

            }
        }

    }

    private getFieldMessageValidation(): string {

        return null;
        // if (this.formFieldValidation && this.formFieldValidation.errors) {

        //     if (this.formFieldValidation.errors.required) {
        //         return this.l("RequiredFieldError");
        //     } else if (this.formFieldValidation.errors.min) {
        //         return this.l("MinInvalid").replace("{0}", this.formFieldValidation.errors.min.min);
        //     } else if (this.formFieldValidation.errors.max) {
        //         return this.l("MaxInvalid").replace("{0}", this.formFieldValidation.errors.max.max);
        //     } else if (this.formFieldValidation.errors.minlength) {
        //         return this.l("MinLengthInvalid").replace("{0}", this.formFieldValidation.errors.minlength.requiredLength);
        //     } else if (this.formFieldValidation.errors.maxlength) {
        //         return this.l("MaxLengthInvalid").replace("{0}", this.formFieldValidation.errors.maxlength.requiredLength);
        //     } else if (this.formFieldValidation.errors.restrictedWords) {
        //         return this.l("InvalidChars").replace("{0}", this.formFieldValidation.errors.restrictedWords);
        //     } else if (this.formFieldValidation.errors.patternError) {
        //         return this.l("InvalidInputValue").replace("{0}", this.el.nativeElement.parentElement.children[0].innerText);
        //     } else if (this.formFieldValidation.errors.message) {
        //         return this.l(this.formFieldValidation.errors.message);
        //     } else {
        //         return this.l("InvalidField");
        //     }

        // } else {
        //     return this.l("InvalidField");
        // }

    }

    private clearErrors(): void {

        // $("[formFieldValidationTarget=" + this.name + "]").remove();

        // if (this.element) {
        //     this.element.removeClass(this.errorBorderClass);
        // }

    }

}