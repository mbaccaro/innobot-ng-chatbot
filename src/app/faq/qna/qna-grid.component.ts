// import { Component, Injector, Output, Input, OnInit, EventEmitter } from "@angular/core";
// import { Router, ActivatedRoute } from "@angular/router";
// import { QnAServiceProxy, QnADto, AgentDto } from "@shared/service-proxies/service-proxies";
// import { AppComponentBase } from "@shared/common/app-component-base";
// import { ProjectAgentService } from "@app/shared/services/project-agent.service";
// import { API_VERSION } from "environments/environment";
// import { LazyLoadEvent } from "../../../../node_modules/mcapp.ng.components";
// import { SortEvent } from "../../../../node_modules/primeng/api";
// import { SortDirection } from "@shared/helpers/QueryParameters";

// @Component({
//     selector: "qna-grid",
//     templateUrl: "./qna-grid.component.html"
// })

// export class QnaGridComponent extends AppComponentBase implements OnInit {

//     protected projectAgentService: ProjectAgentService;
//     protected qnAServiceProxy: QnAServiceProxy;
//     protected router: Router;
//     protected route: ActivatedRoute;
//     public currentTab = "answer";
//     public searchString = "";
   
//     @Output() public searchLazyLoad: EventEmitter<any> = new EventEmitter();
//     @Output() public reloadGrid: EventEmitter<any> = new EventEmitter();
//     @Input() public set totals(totals: number) {
//         this.dataGridConfig.totals = totals;
//     }
//     @Input() agent: AgentDto;
//     @Input() public qnAs: Array<QnADto>;
//     @Input() public hideActionButtons: boolean;
//     @Input() public enableLazyLoad: boolean;

    
//     public constructor(injector: Injector) {
//         super(injector);

//         this.projectAgentService = injector.get(ProjectAgentService);
//         this.qnAServiceProxy = injector.get(QnAServiceProxy);
//         this.router = injector.get(Router);
//         this.route = injector.get(ActivatedRoute);

//     }

//     public ngOnInit(): void {

//         this.qnAs = [];
//         this.totals = 0;
//         this.setupGrid();

//     }

//     private setupGrid(): void {

//         this.configureGridComponent();
//         this.dataGridConfig.take = 10;

//     }

//     private getQnAs(): void {

//         this.applyQueryParameters();
//         this.reloadGrid.emit(this.queryParameters);

//     }

//     protected onChange(event: LazyLoadEvent): void {

//         this.dataGridConfig.state = event;
//         const skip = event.first;

//         if (this.dataGridConfig.take !== event.rows) {

//             this.dataGridConfig.skip = 0;
//             this.dataGridConfig.take = event.rows;

//         } else if (skip !== this.dataGridConfig.skip) {
//             this.dataGridConfig.skip = skip;
//         }

//         this.getQnAs();

//     }

//     protected onSearch(searchValue): void {

//         this.dataGridConfig.skip = 0;
//         this.dataGridConfig.filter = searchValue;
//         this.applyQueryParameters();
//         this.searchLazyLoad.emit(this.queryParameters);

//     }

//     protected onSort(event: SortEvent): void {

//         this.dataGridConfig.skip = 0;
//         this.dataGridConfig.sortField = event.field;
//         this.dataGridConfig.sortOrder = event.order === 1 ? SortDirection.ascending : SortDirection.descending;
//         this.getQnAs();

//     }

//     protected onEdit(event: any): void {

//         this.router.navigate(["/app/admin/qna"], {
//             queryParams: {
//                 id: btoa(this.agent.id.toString()),
//                 name: btoa(this.agent.name),
//                 qna: btoa(event.id.toString())
//             }
//         });

//     }

//     protected onDelete(qnA: QnADto): void {

//         this.message.confirm("", this.l("AreYouSureToDeleteTheQnA"), (isConfirmed) => {

//             if (isConfirmed) {

//                 this.qnAServiceProxy.deleteQnA(qnA, API_VERSION)
//                     .subscribe(result => {

//                         if (!result.hasError) {

//                             this.dataGridConfig.skip = 0;
//                             this.getQnAs();
//                             this.notify.info(this.l("SuccessfullyDeleted"));

//                         }

//                     });

//             }

//         });

//     }

//     public importQna(): void {

//         this.router.navigate(["/app/admin/qna-import"], {
//             queryParams: {
//                 id: btoa(this.agent.id.toString())
//             }
//         });

//     }

//     public createQna(): void {

//         this.router.navigate(["/app/admin/qna"], {
//             queryParams: {
//                 id: btoa(this.agent.id.toString()),
//                 name: btoa(this.agent.name),
//                 qna: btoa("0")
//             }
//         });

//     }

// }
