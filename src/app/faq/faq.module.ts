import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilsModule } from "../shared/utils/utils.module";

import { QnaManagementComponent } from "./qna-management.component";
import { QnaGridComponent } from "./qna/qna-grid.component";
import { QnaFormComponent } from "./qna/qna-form.component";
import { CategoryTreeComponent } from "./category/category-tree.component";
import { CategoryFormComponent } from "./category/category-form.component";
import { FAQService } from "./faq-service";



@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        UtilsModule
    ],
    declarations: [

        QnaManagementComponent,
        QnaGridComponent,
        QnaFormComponent,
        CategoryTreeComponent,
        CategoryFormComponent

    ],
    exports: [
    ],
    providers: [
        FAQService
    ]
})
export class FAQModule { }
