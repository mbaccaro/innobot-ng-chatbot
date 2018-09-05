import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "../shared/common/app-base-component";
// import { FAQService } from "./faq-service";
import { CategoryDto } from "./category/category-model";
import { QueryParameters } from "../shared/helpers/QueryParameters";
import { QnADto, QnAQuestionDto } from "./qna/qna-model";

@Component({
    selector: "qna-management",
    templateUrl: "./qna-management.component.html"
})

export class QnaManagementComponent extends AppComponentBase implements OnInit {

    //protected faqService: FAQService;
    public selectedCategoryId: number;
    public selectedQnAId: number;
    public qnAsGrid: Array<any>;
    public agentId: number;
    public showDetailsQnA: boolean;
    public showCategoryTree: boolean;
    public openQnAForm: boolean;

    public get selectedAgentName() {
        return "qna-tax";//this.projectAgentService.selectedAgent ? this.projectAgentService.selectedAgent.name : "";
    }

    public constructor(injector: Injector) {
        super(injector);

        //this.faqService = injector.get(FAQService);

    }

    public ngOnInit(): void {

        this.loadQnAGrid();
        this.showDetailsQnA = false;

    }

    public onSelectCategory(category: CategoryDto): void {

        this.selectedCategoryId = category.id;
        this.loadQnAGrid();

    }

    public onUnselectCategory(category: CategoryDto): void {

        this.selectedCategoryId = undefined;
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

        //debugger;

        this.qnAsGrid = [];
        const qnaDto: QnADto = new QnADto();

        qnaDto.agentId = 3;
        qnaDto.agentName = 'qnatax';
        qnaDto.categories = [];
        qnaDto.answer = 'I am good';
        qnaDto.questions = [];
        const question = new QnAQuestionDto();
        question.isPrimary = true;
        question.isDeleted = false;
        question.question = "how are you?"
        qnaDto.questions.push(question);
        this.qnAsGrid.push(qnaDto);
        this.dataGridConfig.totals = 1;

        // const chatBotAgentQnaIntance =  this.faqService.getChatBotAgentQnAInstance();

        // chatBotAgentQnaIntance.getQnA(this.agentId, null, queryParameters.toString()).subscribe((result) => {

        //     debugger;
        //     this.qnAsGrid = result.result;
        //     this.dataGridConfig.totals = result.count;

        // });

    }

}

