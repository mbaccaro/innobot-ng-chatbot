import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "../shared/common/app-base-component";
import { FAQService } from "./faq-service";
import { CategoryDto } from "./category/category-model";
import { QueryParameters } from "../shared/helpers/QueryParameters";
import { QnADto, QnAQuestionDto } from "./qna/qna-model";
import { ChatBotAgentQnA } from "innobot-chat-api";

@Component({
    selector: "qna-management",
    templateUrl: "./qna-management.component.html"
})

export class QnaManagementComponent extends AppComponentBase implements OnInit {

    private faqService: FAQService;
    private chatBotAgentQnAInstance: ChatBotAgentQnA;
    public selectedCategory: any;
    public selectedQnAId: number;
    public qnAsGrid: Array<any>;
    public agentId: number;
    public showDetailsQnA: boolean;
    public showCategoryTree: boolean;
    public openQnAForm: boolean;

    public constructor(injector: Injector) {
        super(injector);

        this.faqService = injector.get(FAQService);

    }

    public ngOnInit(): void {

        this.agentId = 3;
        this.chatBotAgentQnAInstance = this.faqService.getChatBotAgentQnAInstance();
        this.loadQnAGrid();
        this.showDetailsQnA = false;
        this.selectedCategory = new CategoryDto();

    }

    public onSelectCategory(category: CategoryDto): void {

        this.selectedCategory = category;
        this.loadQnAGrid();

    }

    public onUnselectCategory(category: CategoryDto): void {

        this.selectedCategory = new CategoryDto();
        this.loadQnAGrid();

    }

    public onSelectQnA(qnA: QnADto): void {

        this.selectedQnAId = qnA.id;
        this.showDetailsQnA = true;
    }

    public onUnselectQnA(category: CategoryDto): void {

        this.selectedQnAId = undefined;
        this.showDetailsQnA = true;

    }

    private loadQnAGrid(): void {

        this.applyQueryParameters();
        this.onLoadGrid(this.queryParameters);

    }

    public onLoadGrid(queryParameters: QueryParameters): void {

        const categoryName = (this.selectedCategory && this.selectedCategory.name !== '' && this.selectedCategory.id > 0) ? this.selectedCategory.name : null;

        this.chatBotAgentQnAInstance.getQnA(this.agentId, categoryName, queryParameters.toString()).subscribe((result) => {

            this.qnAsGrid = result.result;
            this.dataGridConfig.totals = result.count;

        });

    }

}

