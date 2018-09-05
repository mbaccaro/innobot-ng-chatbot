import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilsModule } from "../shared/utils/utils.module";
import { TriggerFaqBtnComponent } from "./utils/trigger-faq-btn/trigger-faq-btn.component";
import { QnaManagementComponent } from "./qna-management.component";
import { QnaGridComponent } from "./qna/qna-grid.component";
import { QnaFormComponent } from "./qna/qna-form.component";
import { QnaDetailComponent } from "./qna/qna-detail.component";
import { CategoryTreeComponent } from "./category/category-tree.component";
import { LayoutModule } from "./../layout/layout.module";
import { CategoryFormComponent } from "./category/category-form.component";
// import { FAQService } from "./faq-service";

import {
    TableModule,
    FileUploadModule,
    PanelModule,
    DropdownModule,
    ScrollPanelModule,
    DialogModule,
    DataListModule,
    OrderListModule,
    RadioButtonModule, 
    InputTextareaModule, 
    ChipsModule,
    TooltipModule,
    TabViewModule,
    TreeTableModule,
    EditorModule,
    SpinnerModule,
    TreeModule,
    ContextMenuModule,
    MultiSelectModule
} from "mcapp.ng.components";

@NgModule({
    imports: [
        LayoutModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        UtilsModule, 
        FileUploadModule,
        TableModule,
        PanelModule,
        DropdownModule,
        ScrollPanelModule,
        DialogModule,
        TooltipModule,
        EditorModule,
        InputTextareaModule,
        ChipsModule,
        DataListModule,
        OrderListModule,
        RadioButtonModule,
        InputTextareaModule,
        TabViewModule,
        TreeTableModule,
        SpinnerModule,
        TreeModule,
        ContextMenuModule,
        MultiSelectModule
    ],
    declarations: [
        QnaManagementComponent,
        QnaGridComponent,
        QnaFormComponent,
        QnaDetailComponent,
        CategoryTreeComponent,
        CategoryFormComponent,
        TriggerFaqBtnComponent
    ],
    exports: [
        QnaManagementComponent
    ],
    providers: [
        // FAQService
    ],
    entryComponents: [
        QnaManagementComponent
    ]
})
export class FAQModule { }
