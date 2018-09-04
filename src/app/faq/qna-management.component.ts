// import { Component, Injector, OnInit } from "@angular/core";
// import { Router, ActivatedRoute } from "@angular/router";
// import { AppComponentBase } from "@shared/common/app-component-base";
// import { appModuleAnimation } from "@shared/animations/routerTransition";
// import { ProjectAgentService } from "@app/shared/services/project-agent.service";
// import { CategoryDto, QnAServiceProxy, QnADto } from "@shared/service-proxies/service-proxies";
// import { API_VERSION } from "environments/environment";
// import { QueryParameters } from "@shared/helpers/QueryParameters";
// import { QnAService } from "@app/admin/qna/qna-service";

// @Component({
//     selector: "qna-management",
//     templateUrl: "./qna-management.component.html",
//     animations: [appModuleAnimation()]
// })

// export class QnaManagementComponent extends AppComponentBase implements OnInit {

//     protected qnaService: QnAService;
//     protected projectAgentService: ProjectAgentService;
//     protected qnAServiceProxy: QnAServiceProxy;
//     private router: Router;
//     private route: ActivatedRoute;
//     public selectedCategoryId: number;
//     public qnAsGrid: Array<any>;
//     public agentId: number;

//     private get userId(): number {
//         return this.appSession.userId || 1;
//     }

//     private get tenantId(): number {
//         return this.appSession.tenantId || 1;
//     }

//     public get selectedAgentName() {
//         return this.projectAgentService.selectedAgent ? this.projectAgentService.selectedAgent.name : "";
//     }

//     public constructor(injector: Injector) {
//         super(injector);

//         this.projectAgentService = injector.get(ProjectAgentService);
//         this.router = injector.get(Router);
//         this.qnAServiceProxy = injector.get(QnAServiceProxy);
//         this.route = injector.get(ActivatedRoute);
//         this.router = injector.get(Router);
//         this.qnaService = injector.get(QnAService);

//     }

//     public ngOnInit(): void {

//         this.setProjectAgentParameters();
//         this.loadQnAGrid();

//     }

//     private setProjectAgentParameters(): void {

//         this.route.queryParams
//             .filter(params => params.id)
//             .subscribe(params => {

//                 this.agentId = +atob(params.id);

//                 if (!this.projectAgentService.selectedAgent || this.projectAgentService.selectedAgent.id !== this.agentId) {
//                     this.projectAgentService.initialParameters(this.agentId, this.userId, this.tenantId);
//                 }

//             });

//     }

//     public goBack(): void {
//         this.router.navigate(["/app/admin/projects-bots"]);
//     }

//     public onSelectCategory(category: CategoryDto): void {

//         this.selectedCategoryId = category.id;
//         this.loadQnAGrid();

//     }

//     public onUnselectCategory(category: CategoryDto): void {

//         this.selectedCategoryId = undefined;
//         this.loadQnAGrid();

//     }

//     private loadQnAGrid(): void {

//         this.applyQueryParameters();
//         this.onLoadGrid(this.queryParameters);

//     }

//     public onLoadGrid(queryParameters: QueryParameters): void {

//         debugger;
//         const chatBotAgentQnaIntance =  this.qnaService.getChatBotAgentQnAInstance();

//         chatBotAgentQnaIntance.getQnA(this.agentId, null, queryParameters.toString()).subscribe((result) => {
         
//             debugger;
//             this.qnAsGrid = result.result;
//             this.dataGridConfig.totals = result.count;

//         });

//         // this.qnAServiceProxy.getQnAs(queryParameters.toString(), this.agentId, this.selectedCategoryId, API_VERSION)
//         //     .subscribe((result) => {

//         //         this.qnAsGrid = result.result;
//         //         this.dataGridConfig.totals = result.count;

//         //     });

//     }

// }

