import { Component, Injector, OnInit, Input, ViewChild } from "@angular/core";
import { AppComponentBase } from "../shared/common/app-base-component";
import { FAQService } from "./faq-service";
import { CategoryDto, QnAAgentCategoryDto } from "./category/category-model";
import { QueryParameters } from "../shared/helpers/QueryParameters";
import { QnADto, QnAQuestionDto } from "./qna/qna-model";
import { ChatBotAgentQnA } from "innobot-chat-api";
import { LayoutService } from "../layout/layout.service";
import { CategoryTreeComponent } from "./category/category-tree.component";

@Component({
    selector: "qna-management",
    templateUrl: "./qna-management.component.html",
})

export class QnaManagementComponent extends AppComponentBase implements OnInit {

    @ViewChild(CategoryTreeComponent) public categoryTreeComponent: CategoryTreeComponent;

    private faqService: FAQService;
    private chatBotAgentQnAInstance: ChatBotAgentQnA;
    public selectedCategory: any;
    public selectedQnA: any;
    public qnAsGrid: Array<any>;
    public agentId: number;
    public showDetailsQnA: boolean;
    public openQnAForm: boolean;
    public openCategoryForm: boolean;
    public isFullScreen: boolean;
    public selectedTab: string;
    public isFaqOpen: boolean;
    public displayStyle: string;

    @Input() public agentName: string;

    public constructor(injector: Injector, private layoutService: LayoutService) {
        super(injector);

        this.faqService = injector.get(FAQService);

    }

    public ngOnInit(): void {

        this.agentId = 1;
        this.chatBotAgentQnAInstance = this.faqService.getChatBotAgentQnAInstance();
        this.loadQnAGrid();
        this.showDetailsQnA = false;
        this.openQnAForm = false;
        this.openCategoryForm = false;
        this.selectedCategory = new CategoryDto();
        this.selectedQnA = new CategoryDto();
        this.selectedTab = "category";
        this.displayStyle = "side";

        this.layoutService.config.subscribe(layout => {
            this.isFullScreen = layout.isFullScreen;
            this.isFaqOpen = layout.isFaqOpen;
        });

    }

    private closeFullScreenDetails(): void {

        this.openQnAForm = false;
        this.showDetailsQnA = false;
        this.openCategoryForm = false;
    }

    public fullscreenToggle(): void {

        this.layoutService.toggleFullScreen();

        if (this.isFullScreen) {
            this.displayStyle = "fullscreen";
        } else {
            this.displayStyle = "side";
        }

        if (this.selectedTab === "commonQuestions") {

            this.onSelectQnA(this.selectedQnA);

        } else {

            if (this.selectedCategory.id === null || this.selectedCategory.id === undefined) {
                this.onSelectCategory(this.selectedCategory);

            } else if (this.selectedCategory != null) {

                this.onSelectQnA(this.selectedQnA);

            } else {
                this.onUnselectCategory(null);
            }

        }


    }

    public onSelectCategory(category: CategoryDto): void {

        this.closeFullScreenDetails();
        this.selectedCategory = category;
        this.selectedQnA = new QnADto();
        this.selectedQnA.id = 0;

        if (this.selectedCategory !== undefined) {
            this.loadQnAGrid();

        }

    }

    public onUnselectCategory(category: CategoryDto): void {

        this.closeFullScreenDetails();
        this.selectedCategory = new CategoryDto();
        this.selectedQnA = new QnADto();
        this.selectedQnA.id = 0;
        this.loadQnAGrid();

    }

    public createCategory(): void {

        this.closeFullScreenDetails();
        this.layoutService.openFullScreen();
        this.displayStyle = "fullscreen";
        this.isFullScreen = true;
        this.openCategoryForm = true;
        this.selectedCategory = new CategoryDto();
        this.selectedCategory.agentId = this.agentId;

    }

    public onSaveCategory(): void {

        this.closeFullScreenDetails();
        this.categoryTreeComponent.populateTree(undefined);

    }

    public onCancelCategory(): void {

        this.closeFullScreenDetails();
        this.layoutService.closeFullScreen();
        this.displayStyle = "side";

    }

    public onSelectQnA(qnA: QnADto): void {

        this.closeFullScreenDetails();

        if (!this.isFullScreen || (qnA.id && qnA.id !== 0)) {
            this.selectedQnA = qnA;
            this.showDetailsQnA = true;

        } else {

            if (this.selectedTab === "category") {
                this.loadQnAGrid();
            }

            this.selectedQnAGridrow();
            this.showDetailsQnA = true;
        }

    }

    public selectedQnAGridrow() {
        this.selectedQnA = this.qnAsGrid.length === 0 ? undefined : this.qnAsGrid[0];
    }

    public onUnselectQnA(qnA: QnADto): void {

        this.closeFullScreenDetails();
        this.selectedQnA = new QnADto();
        this.selectedQnA.id = 0;
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

        this.closeFullScreenDetails();

        this.chatBotAgentQnAInstance.deleteQnA(this.selectedQnA)
            .subscribe((result) => {

                if (result.value > 0) {
                    //this.notify.info(this.l("SavedSuccessfully"));
                    //this.goQnaGrid();
                    this.loadQnAGrid();

                } else {
                    this.checkResultError(result);
                }

            });

    }

    public createQnA(): void {

        this.isFullScreen = true;
        this.openQnAForm = true;
        this.selectedQnA = new QnADto();
        this.selectedQnA.id = 0;
        this.selectedQnA.agentId = this.agentId;
        this.selectedQnA.agentName = this.agentName;

        if (this.selectedCategory && this.selectedCategory.id > 0) {

            const qnAAgentCategoryDto: QnAAgentCategoryDto = new QnAAgentCategoryDto();
            qnAAgentCategoryDto.id = 0;
            qnAAgentCategoryDto.agentCategoryId = this.selectedCategory.id;
            qnAAgentCategoryDto.agentCategoryName = this.selectedCategory.name;

            this.selectedQnA.categories = [];
            this.selectedQnA.categories.push(qnAAgentCategoryDto);

        }

    }

    public onSaveQnA(): void {

        this.openQnAForm = false;
        this.showDetailsQnA = true;
        this.isFullScreen = true;
        this.layoutService.openFullScreen();
        this.loadQnAGrid();

    }

    public onCancelQnA(): void {

        this.openQnAForm = false;
        this.showDetailsQnA = true;
        this.selectedQnAGridrow();

    }

    public onLoadGrid(queryParameters: QueryParameters): void {

        const categoryName = (this.selectedCategory && this.selectedCategory.name !== '' && this.selectedCategory.id > 0) ? this.selectedCategory.name : null;

        this.chatBotAgentQnAInstance.getQnA(this.agentId, categoryName, queryParameters.toString()).subscribe((result) => {

            this.qnAsGrid = result.result;
            this.dataGridConfig.totals = result.count;

            if (this.isFullScreen && this.selectedCategory.id > 0) {

                this.selectedQnAGridrow();
                this.showDetailsQnA = !this.openQnAForm;

            }

        });

    }

    private loadCommonQuestionsGrid(): void {

        this.applyQueryParameters();
        this.onLoadCommonQuestions(this.queryParameters);

    }

    public onLoadCommonQuestions(queryParameters: QueryParameters): void {

        // Todo: need chatApi
        const categoryName = "Interest";

        this.chatBotAgentQnAInstance.getQnA(this.agentId, categoryName, queryParameters.toString()).subscribe((result) => {

            this.qnAsGrid = result.result;
            this.dataGridConfig.totals = result.count;

        });

    }

    public tabClick(tab): void {

        if (tab === "commonQuestions") {

            this.loadCommonQuestionsGrid();
            this.isFullScreen = false;
            this.selectedCategory = new CategoryDto();
            this.selectedQnA = new CategoryDto();
            this.showDetailsQnA = false;

        }

        this.selectedTab = tab;

    }

}

