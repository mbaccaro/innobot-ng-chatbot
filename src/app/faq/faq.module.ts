import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilsModule } from "../shared/utils/utils.module";
import { TriggerFaqBtnComponent } from "./utils/trigger-faq-btn/trigger-faq-btn.component";
import { QnaManagementComponent } from "./qna-management.component";
import { QnaGridComponent } from "./qna/qna-grid.component";
import { QnaFormComponent } from "./qna/qna-form.component";
import { QnaDetailComponent } from "./qna/qna-detail.component";
import { CategoryDropdownTreeComponent } from "./category/category-dropdown-tree/category-dropdown-tree.component";
import { CategoryTreeComponent } from "./category/category-tree.component";
import { SearchBoxComponent } from "../shared/common/search-box/search-box.component";
import { LayoutModule } from "./../layout/layout.module";
import { CategoryFormComponent } from "./category/category-form.component";
import { FAQService } from "./faq-service";
import { SafeHtmlPipe } from "../faq/utils/safe-html-pipe";
import { StripHtmlPipe } from "../faq/utils/strip-html-pipe";
import { BreadcrumbsComponent } from "../faq/breadcrumbs/breadcrumbs.component";
import { TreeviewModule } from "ngx-treeview";

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
    MultiSelectModule,
    MessagesModule,
    MessageModule
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
        MultiSelectModule,
        TreeviewModule.forRoot(), 
        MessageModule,
        MessagesModule
    ],
    declarations: [
        QnaManagementComponent,
        QnaGridComponent,
        QnaFormComponent,
        QnaDetailComponent,
        CategoryTreeComponent,
        CategoryFormComponent,
        CategoryFormComponent,
        SearchBoxComponent,
        TriggerFaqBtnComponent,
        SafeHtmlPipe,
        StripHtmlPipe,
        BreadcrumbsComponent,
        CategoryDropdownTreeComponent
    ],
    exports: [
        QnaManagementComponent,
        SearchBoxComponent,
        TriggerFaqBtnComponent
    ],
    providers: [
        FAQService
    ],
    entryComponents: [
        QnaManagementComponent,
        TriggerFaqBtnComponent
    ]
})
export class FAQModule { }
