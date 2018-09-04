// import { Component, Injector, OnInit } from "@angular/core";
// import { Router, ActivatedRoute } from "@angular/router";
// import { AppComponentBase } from "@shared/common/app-component-base";
// import { API_VERSION } from "environments/environment";
// import { FormGroup, Validators, FormBuilder } from "@angular/forms";
// import * as underscore from "lodash";

// @Component({
//     selector: "qna-form",
//     templateUrl: "./qna-form.component.html"
// })

// export class QnaFormComponent extends AppComponentBase implements OnInit {

//     protected projectAgentService: ProjectAgentService;
//     protected qnAServiceProxy: QnAServiceProxy;
//     private router: Router;
//     private route: ActivatedRoute;
//     protected qnA: QnADto;
//     public newQuestion: QnAQuestionDto;
//     public primaryQuestion: QnAQuestionDto;
//     protected formValidation: FormGroup;
//     protected validate: boolean;
//     protected validateQuestions: boolean;
//     protected saving: boolean;
//     private formBuilder: FormBuilder;


//     public constructor(injector: Injector) {
//         super(injector);

//         this.projectAgentService = injector.get(ProjectAgentService);
//         this.qnAServiceProxy = injector.get(QnAServiceProxy);
//         this.router = injector.get(Router);
//         this.route = injector.get(ActivatedRoute);
//         this.formBuilder = injector.get(FormBuilder);

//     }

//     public get checkEmptyQuestions(): boolean {
//         return this.validateQuestions;
//     }

//     public ngOnInit(): void {

//         this.saving = false;
//         this.validate = false;
//         this.validateQuestions = false;
//         this.loadQnAParameters();
//         this.createValidationModel();

//     }

//     private createValidationModel(): void {

//         this.formValidation = this.formBuilder.group({
//             question: [{ value: null }, [Validators.required]],
//             answer: [{ value: null }, [Validators.required]]
//         });

//     }

//     private loadQnAParameters(): void {

//         this.qnA = new QnADto();
//         this.qnA.questions = [];
//         this.primaryQuestion = new QnAQuestionDto();

//         this.route.queryParams
//             .subscribe(params => {

//                 this.qnA.id = +atob(params.qna);
//                 this.qnA.agentId = +atob(params.id);
//                 this.qnA.agentName = atob(params.name);

//                 if (this.qnA.id > 0) {
//                     this.getQnA(this.qnA.id);
//                 }

//             });

//     }

//     private updateQnA(qnA: QnADto): void {

//         this.qnAServiceProxy.updateQnA(qnA, API_VERSION)
//             .finally(() => { this.saving = false; })
//             .subscribe((result) => {

//                 if (result.value > 0) {

//                     this.notify.info(this.l("SavedSuccessfully"));
//                     this.goQnaGrid();

//                 } else {
//                     this.checkResultError(result);
//                 }

//             });

//     }

//     private insertQnA(qnA: QnADto): void {

//         this.qnAServiceProxy.createQnA(qnA, API_VERSION)
//             .finally(() => { this.saving = false; })
//             .subscribe((result) => {

//                 if (result.value > 0) {

//                     this.notify.info(this.l("SavedSuccessfully"));
//                     this.goQnaGrid();

//                 } else {
//                     this.checkResultError(result);
//                 }

//             });

//     }

//     private getQnA(qnAId: number): void {

//         this.qnAServiceProxy.getQnA(qnAId, API_VERSION)
//             .subscribe((result) => {

//                 this.qnA = result;
//                 this.primaryQuestion = this.qnA.questions.find(x => x.isPrimary === true);

//             });

//     }

//     private loadPrimaryQuestion(): void {

//         const primaryQuestionIndex: number = this.qnA.questions.findIndex(x => x.isPrimary === true);

//         if (primaryQuestionIndex > -1) {
//             this.qnA.questions[primaryQuestionIndex].question = this.primaryQuestion.question;
//         } else {

//             this.primaryQuestion.isPrimary = true;
//             this.qnA.questions.push(this.primaryQuestion);

//         }

//     }

//     public saveQnA(): void {

//         this.loadPrimaryQuestion();

//         if (this.checkAlternativeQuestion(null) === true) {
//             this.notify.warn(this.l("QuestionDuplicated"));
//             return;
//         }

//         this.saving = true;

//         if (this.qnA.id > 0) {
//             this.updateQnA(this.qnA);
//         } else {
//             this.insertQnA(this.qnA);
//         }

//     }

//     private setValidateAlternativeQuestions(): void {
//         this.validateQuestions = this.qnA !== null && this.qnA.questions !== null && this.qnA.questions.findIndex(x => x.question === "" && x.isDeleted === false) > -1;
//     }

//     private checkAlternativeQuestion(question: string): boolean {

//         if (question !== null) {

//             const alternativeQuestion: QnAQuestionDto = this.qnA.questions.find(x => x.question.toLowerCase() === question.toLowerCase());
//             return alternativeQuestion !== null && alternativeQuestion !== undefined;

//         } else {

//             const counts: any = underscore.countBy(this.qnA.questions, "question");
//             const questionsDuplicated = underscore.map(counts, (value: number, key: string) => {
//                 return { question: key, value: value };
//             });

//             const checkQuestionDuplicated = questionsDuplicated.find(x => x.value > 1);
//             return checkQuestionDuplicated !== null && checkQuestionDuplicated !== undefined;

//         }


//     }

//     public onBlurAlternativeQuestion(): void {
//         this.setValidateAlternativeQuestions();
//     }

//     public addQuestion(question: any): void {

//         if (this.newQuestion && this.newQuestion.question !== "") {

//             if (this.checkAlternativeQuestion(question) === true) {
//                 this.notify.warn(this.l("QuestionDuplicated"));
//             } else {

//                 this.newQuestion = new QnAQuestionDto();
//                 this.newQuestion.question = question;
//                 this.newQuestion.isPrimary = false;
//                 this.newQuestion.isDeleted = false;
//                 this.newQuestion.id = 0;

//                 if (!this.qnA.questions) {
//                     this.qnA.questions = [];
//                 }

//                 this.qnA.questions.push(this.newQuestion);
//                 this.newQuestion = null;

//             }

//             this.setValidateAlternativeQuestions();

//         }

//     }

//     public deleteQuestion(index: number): void {

//         this.message.confirm("", this.l("AreYouSure"), isConfirmed => {

//             if (isConfirmed) {

//                 if (this.qnA.questions[index].id > 0) {
//                     this.qnA.questions[index].isDeleted = true;
//                 } else {
//                     this.qnA.questions.splice(index, 1);
//                 }

//                 this.setValidateAlternativeQuestions();

//             }

//         });

//     }

//     public onSelectCategory(category: CategoryDto): void {

//         if (!this.qnA.categories) {
//             this.qnA.categories = [];
//         }

//         const index: number = this.qnA.categories.findIndex(x => x.agentCategoryId === category.id);

//         if (index > -1) {
//             this.qnA.categories[index].isDeleted = false;
//         } else {

//             const qnAAgentCategoryDto: QnAAgentCategoryDto = new QnAAgentCategoryDto();
//             qnAAgentCategoryDto.id = 0;
//             qnAAgentCategoryDto.agentCategoryId = category.id;
//             qnAAgentCategoryDto.agentCategoryName = category.name;

//             this.qnA.categories.push(qnAAgentCategoryDto);

//         }

//     }

//     public onUnselectCategory(category: CategoryDto): void {

//         const index: number = this.qnA.categories.findIndex(x => x.agentCategoryId === category.id);

//         if (this.qnA.categories[index].id > 0) {
//             this.qnA.categories[index].isDeleted = true;
//         } else {
//             this.qnA.categories.splice(index, 1);
//         }

//     }

//     public goQnaGrid(): void {
//         this.router.navigate(["/app/admin/qna-admin"], { queryParams: { id: btoa(this.qnA.agentId.toString()) } });
//     }

// }
