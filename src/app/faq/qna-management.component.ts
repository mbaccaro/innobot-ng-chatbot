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
    public selectedQnA: any;
    public qnAsGrid: Array<any>;
    public agentId: number;
    public showDetailsQnA: boolean;
    public openQnAForm: boolean;
    public isFullScreen: boolean;

    public constructor(injector: Injector) {
        super(injector);

        this.faqService = injector.get(FAQService);

    }

    public ngOnInit(): void {

        this.agentId = 3;
        this.chatBotAgentQnAInstance = this.faqService.getChatBotAgentQnAInstance();
        this.loadQnAGrid();
        this.showDetailsQnA = false;
        this.isFullScreen = false;
        this.openQnAForm = false;
        this.selectedCategory = new CategoryDto();
        this.selectedQnA = new CategoryDto();
        
    }

    private closeFullScreenDetails(): void {

        this.openQnAForm = false;
        this.showDetailsQnA = false;

    }

    public toggle(): void {

        this.isFullScreen = !this.isFullScreen;
        
    }

    public onSelectCategory(category: CategoryDto): void {

        this.closeFullScreenDetails();
        this.selectedCategory = category;
        this.loadQnAGrid();

    }

    public onUnselectCategory(category: CategoryDto): void {

        this.closeFullScreenDetails();
        this.selectedCategory = new CategoryDto();
        this.loadQnAGrid();

    }

    public onSelectQnA(qnA: QnADto): void {

        this.closeFullScreenDetails();
        this.selectedQnA = qnA;
        this.showDetailsQnA = true;
    }

    public onUnselectQnA(qnA: QnADto): void {

        this.closeFullScreenDetails();
        this.selectedQnA = new QnADto();
        this.showDetailsQnA = true;

    }

    private loadQnAGrid(): void {

        this.applyQueryParameters();
        this.onLoadGrid(this.queryParameters);

    }

    public editQnA(): void {

        this.isFullScreen = true;
        this.openQnAForm = true; 
        this.showDetailsQnA = false;

    }
    
    public deleteQnA(): void {

        this.isFullScreen = false;
        this.openQnAForm = false; 
        this.showDetailsQnA = false;
        //routine to delete the selected qna here.
        this.loadQnAGrid();

    }

    public createQnA(): void {

        this.isFullScreen = true;
        this.openQnAForm = true;
        this.selectedQnA = new QnADto();
        this.selectedQnA.id = 0;
        this.selectedQnA.agentId = this.agentId;

    }

    public onLoadGrid(queryParameters: QueryParameters): void {

        const categoryName = (this.selectedCategory && this.selectedCategory.name !== '' && this.selectedCategory.id > 0) ? this.selectedCategory.name : null;

        this.chatBotAgentQnAInstance.getQnA(this.agentId, categoryName, queryParameters.toString()).subscribe((result) => {

            this.qnAsGrid = result.result;
            this.dataGridConfig.totals = result.count;

        });

    }

}

