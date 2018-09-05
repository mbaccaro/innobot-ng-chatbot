import { Component, Injector, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "../shared/common/app-base-component";
// import { FAQService } from "./faq-service";
import { CategoryDto } from "./category/category-model";
import { QueryParameters } from "../shared/helpers/QueryParameters";

@Component({
    selector: "qna-management",
    templateUrl: "./qna-management.component.html"
})

export class QnaManagementComponent extends AppComponentBase implements OnInit {

    //protected faqService: FAQService;
    public selectedCategoryId: number;
    public qnAsGrid: Array<any>;
    public agentId: number;

    // private get userId(): number {
    //     return this.appSession.userId || 1;
    // }

    // private get tenantId(): number {
    //     return this.appSession.tenantId || 1;
    // }

    public get selectedAgentName() {
        return "qna-tax";//this.projectAgentService.selectedAgent ? this.projectAgentService.selectedAgent.name : "";
    }

    public constructor(injector: Injector) {
        super(injector);

        //this.faqService = injector.get(FAQService);

    }

    public ngOnInit(): void {

        this.loadQnAGrid();

    }

    public onSelectCategory(category: CategoryDto): void {

        this.selectedCategoryId = category.id;
        this.loadQnAGrid();

    }

    public onUnselectCategory(category: CategoryDto): void {

        this.selectedCategoryId = undefined;
        this.loadQnAGrid();

    }

    private loadQnAGrid(): void {

        this.applyQueryParameters();
        this.onLoadGrid(this.queryParameters);

    }

    public onLoadGrid(queryParameters: QueryParameters): void {

        debugger;
        // const chatBotAgentQnaIntance =  this.faqService.getChatBotAgentQnAInstance();

        // chatBotAgentQnaIntance.getQnA(this.agentId, null, queryParameters.toString()).subscribe((result) => {
         
        //     debugger;
        //     this.qnAsGrid = result.result;
        //     this.dataGridConfig.totals = result.count;

        // });

    }

}

