import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilsModule } from "../shared/utils/utils.module";
import { RouterModule, Router } from "@angular/router";

import {
    TableModule as McAppTableModule,
    FileUploadModule as McAppUploadFile,
    PanelModule as McAppPanelModule,
    DropdownModule as McAppDropdownModule,
    ScrollPanelModule as McAppScrollPanelModule,
    DialogModule as McAppDialog,
    DataListModule as McAppDataListModule,
    OrderListModule,
    RadioButtonModule, InputTextareaModule, ChipsModule,
    TooltipModule as McAppTooltip,
    TabViewModule,
    TreeTableModule,
    EditorModule,
    SpinnerModule,
    TreeModule,
    ContextMenuModule,
    MultiSelectModule
} from "mcapp.ng.components";

import { QnaManagementComponent } from "./qna-management.component";
import { QnaGridComponent } from "./qna/qna-grid.component";
// import { QnaFormComponent } from "./qna/qna-form.component";
// import { CategoryTreeComponent } from "./category/category-tree.component";
// import { CategoryFormComponent } from "./category/category-form.component";
// import { FAQService } from "./faq-service";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
              { path: "", component: QnaGridComponent}
            ]
          ),//TODO- remove this part 
         FormsModule,
         ReactiveFormsModule,
         CommonModule,
         UtilsModule, 
         McAppUploadFile,
         McAppTableModule,
         McAppPanelModule,
         McAppDropdownModule,
         McAppScrollPanelModule,
         McAppDialog,
         McAppTooltip,
         EditorModule,
         InputTextareaModule,
         ChipsModule,
         McAppDataListModule,
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
         QnaGridComponent
        // QnaFormComponent,
        // CategoryTreeComponent,
        // CategoryFormComponent

    ],
    exports: [
        QnaManagementComponent
    ],
    providers: [
        //FAQService
    ]
})
export class FAQModule { }
