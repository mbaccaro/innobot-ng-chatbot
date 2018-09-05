import { Component, Injector, Output, Input, OnInit, EventEmitter } from "@angular/core";
import { LazyLoadEvent } from "../../../../node_modules/mcapp.ng.components";
import { SortEvent } from "../../../../node_modules/primeng/api";
import { AppComponentBase } from "../../shared/common/app-base-component";
import { QnADto, AgentDto, QnAQuestionDto } from "./qna-model";
import { SortDirection } from "../../shared/helpers/QueryParameters";
import {ChatBotClientConfig, ChatBotAgentQnA} from "innobot-chat-api";
@Component({
    selector: "qna-grid",
    templateUrl: "./qna-grid.component.html"
})

export class QnaGridComponent extends AppComponentBase implements OnInit {

    // protected projectAgentService: ProjectAgentService;
    // protected qnAServiceProxy: QnAServiceProxy;
    public currentTab = "answer";
    public searchString = "";
    //  public qna: QnADto;
    //  public qnaQuestion: QnAQuestionDto;
    //  public qnaQuestions: Array<QnAQuestionDto>;
    @Output() public searchLazyLoad: EventEmitter<any> = new EventEmitter();
    @Output() public reloadGrid: EventEmitter<any> = new EventEmitter();
    @Input() public set totals(totals: number) {
        this.dataGridConfig.totals = totals;
    }
    @Input() agent: AgentDto;
    @Input() public qnAs: Array<QnADto>;
    @Input() public hideActionButtons: boolean;
    @Input() public enableLazyLoad: boolean;

    
    public constructor(injector: Injector) {
        super(injector);

        // this.projectAgentService = injector.get(ProjectAgentService);
        // this.qnAServiceProxy = injector.get(QnAServiceProxy);
        // this.router = injector.get(Router);
        // this.route = injector.get(ActivatedRoute);

    }
//     public config(): ChatBotClientConfig {
// debugger
//         const config = new ChatBotClientConfig();
//         config.innobotUri = "http://dev.app.innobot.internal.epeinnovations.com";
    
//         return config;
    
//     }

    // public getChatBotAgentQnAInstance(): ChatBotAgentQnA {
    
    //     const chatbotAgentQnA = new ChatBotAgentQnA(this.config());
    //     return chatbotAgentQnA;
    
    // }

    public ngOnInit(): void {

        this.qnAs = [];
      
        this.totals = 0;
        this.setupGrid();

    }

    private setupGrid(): void {

        this.configureGridComponent();
        this.dataGridConfig.take = 10;

    }

    private getQnAs(): void {

        this.applyQueryParameters();
        // this.qna = new QnADto();
        // this.qna.id = 1;
        // this.qna.agentId = 3;
        // this.qna.answer = " no way";
        // this.qnaQuestion = new QnAQuestionDto();
        // this.qnaQuestion.id = 1;
        // this.qnaQuestion.isPrimary = true;
        // this.qnaQuestion.question = "what is this?";
        // this.qnaQuestions = [];
        // this.qnaQuestions.push(this.qnaQuestion);
        // this.qna.questions = this.qnaQuestions;
        // this.qnAs.push(this.qna);
        // const chatbotAgentQnA = this.getChatBotAgentQnAInstance();
   
        //   chatbotAgentQnA.getQnA(3, "rental",  this.queryParameters.toString()).subscribe((data) => {
        //     const items = [];
        //     console.log(data);
        //   }, (error => console.log("error"))
        // );
        //   this.reloadGrid.emit(this.queryParameters);
        this.reloadGrid.emit(this.queryParameters);

    }

    public onChange(event: LazyLoadEvent): void {

        this.dataGridConfig.state = event;
        const skip = event.first;

        if (this.dataGridConfig.take !== event.rows) {

            this.dataGridConfig.skip = 0;
            this.dataGridConfig.take = event.rows;

        } else if (skip !== this.dataGridConfig.skip) {
            this.dataGridConfig.skip = skip;
        }

        this.getQnAs();

    }
    
    public onChange2(event: LazyLoadEvent): void {

        this.dataGridConfig.state = event;
        const skip = event.first;

        if (this.dataGridConfig.take !== event.rows) {

            this.dataGridConfig.skip = 0;
            this.dataGridConfig.take = event.rows;

        } else if (skip !== this.dataGridConfig.skip) {
            this.dataGridConfig.skip = skip;
        }

        this.getQnAs();

    }

    public onSearch(searchValue): void {

        this.dataGridConfig.skip = 0;
        this.dataGridConfig.filter = searchValue;
        this.applyQueryParameters();
        this.searchLazyLoad.emit(this.queryParameters);

    }

    public  onSort(event: SortEvent): void {

        this.dataGridConfig.skip = 0;
        this.dataGridConfig.sortField = event.field;
        this.dataGridConfig.sortOrder = event.order === 1 ? SortDirection.ascending : SortDirection.descending;
        this.getQnAs();

    }

    public onEdit(event: any): void {

        // this.router.navigate(["/app/admin/qna"], {
        //     queryParams: {
        //         id: btoa(this.agent.id.toString()),
        //         name: btoa(this.agent.name),
        //         qna: btoa(event.id.toString())
        //     }
        // });

    }

    protected onDelete(qnA: QnADto): void {

        // this.message.confirm("", this.l("AreYouSureToDeleteTheQnA"), (isConfirmed) => {

        //     if (isConfirmed) {

        //         this.qnAServiceProxy.deleteQnA(qnA, API_VERSION)
        //             .subscribe(result => {

        //                 if (!result.hasError) {

        //                     this.dataGridConfig.skip = 0;
        //                     this.getQnAs();
        //                     this.notify.info(this.l("SuccessfullyDeleted"));

        //                 }

        //             });

        //     }

        // });

    }

    public createQna(): void {

        // this.router.navigate(["/app/admin/qna"], {
        //     queryParams: {
        //         id: btoa(this.agent.id.toString()),
        //         name: btoa(this.agent.name),
        //         qna: btoa("0")
        //     }
        // });

    }

}
