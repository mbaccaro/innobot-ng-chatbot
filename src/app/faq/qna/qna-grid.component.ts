import { Component, Injector, Output, Input, OnInit, EventEmitter } from "@angular/core";
import { LazyLoadEvent } from "../../../../node_modules/mcapp.ng.components";
import { SortEvent } from "../../../../node_modules/primeng/api";
import { AppComponentBase } from "../../shared/common/app-base-component";
import { QnADto, AgentDto, QnAQuestionDto } from "./qna-model";
import { SortDirection } from "../../shared/helpers/QueryParameters";

@Component({
    selector: "qna-grid",
    templateUrl: "./qna-grid.component.html"
})

export class QnaGridComponent extends AppComponentBase implements OnInit {

    public currentTab = "answer";
    public searchString = "";
  
    @Output() public selectQnA: EventEmitter<QnADto> = new EventEmitter();
    @Output() public unselectQnA: EventEmitter<QnADto> = new EventEmitter();

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
    }

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

    public onSelectRow(event: QnADto): void {
        this.selectQnA.emit(event);
    }

    public onUnselectRow(event: QnADto): void {
        this.unselectQnA.emit(event);
    }

}
