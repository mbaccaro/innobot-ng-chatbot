import { NgModule } from "@angular/core";
import { EqualValidator } from "./validation/equal-validator.directive";
import { MinValueValidator } from "./validation/min-value-validator.directive";
import { FormFieldValidationDirective } from "./validation/form-field-validation.directive";

@NgModule({
    declarations: [
        EqualValidator,
        MinValueValidator,
        FormFieldValidationDirective
    ],
    exports: [
        EqualValidator,
        MinValueValidator,
        FormFieldValidationDirective
    ]
})
export class UtilsModule { }
