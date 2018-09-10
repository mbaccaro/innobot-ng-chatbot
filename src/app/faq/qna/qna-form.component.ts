import { Component, Injector, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as underscore from "lodash";
import { QnADto, QnAQuestionDto } from "./qna-model";
import { AppComponentBase } from "../../shared/common/app-base-component";
import { CategoryDto, QnAAgentCategoryDto } from "../category/category-model";
import { FAQService } from "../faq-service";
import { ChatBotAgentQnA } from "innobot-chat-api";

@Component({
    selector: "qna-form",
    templateUrl: "./qna-form.component.html"
})

export class QnaFormComponent extends AppComponentBase implements OnInit {

    @Output() public cancel: EventEmitter<any> = new EventEmitter();
    @Output() public save: EventEmitter<QnADto> = new EventEmitter();

    public faqService: FAQService;
    private chatBotAgentQnAInstance: ChatBotAgentQnA;
    public qnA: QnADto;
    public newQuestion: QnAQuestionDto;
    public primaryQuestion: QnAQuestionDto;
    public formValidation: FormGroup;
    public validate: boolean;
    public validateQuestions: boolean;
    public saving: boolean;
    private formBuilder: FormBuilder;

    public constructor(injector: Injector) {
        super(injector);

        this.formBuilder = injector.get(FormBuilder);
        this.faqService = injector.get(FAQService);

    }

    @Input() public set model(model: QnADto) {

        this.qnA = model;

        if (this.qnA.id > 0 && this.qnA.questions && this.qnA.questions.length > 0) {
            this.primaryQuestion = this.qnA.questions.find(x => x.isPrimary === true);
        } else {
            this.primaryQuestion = new QnAQuestionDto();
        }

    }

    public get model() {
        return this.qnA;
    }

    public get checkEmptyQuestions(): boolean {
        return this.validateQuestions;
    }

    public ngOnInit(): void {

        this.saving = false;
        this.validate = false;
        this.validateQuestions = false;
        this.loadQnAParameters();
        this.createValidationModel();
        this.chatBotAgentQnAInstance = this.faqService.getChatBotAgentQnAInstance();

    }

    private createValidationModel(): void {

        this.formValidation = this.formBuilder.group({
            question: [{ value: null }, [Validators.required]],
            answer: [{ value: null }, [Validators.required]]
        });

    }

    private loadQnAParameters(): void {

        if (!this.qnA) {

            this.qnA = new QnADto();
            this.qnA.questions = [];
            this.primaryQuestion = new QnAQuestionDto();

        }

    }

    private updateQnA(qnA: any): void {

        this.chatBotAgentQnAInstance.editQnA(qnA)
            .subscribe((result) => {

                if (result.value > 0) {
                    
                    this.save.emit(this.qnA);
                    //this.notify.info(this.l("SavedSuccessfully"));
                    //this.goQnaGrid();

                } else {
                    this.checkResultError(result);
                }

            });

    }

    private insertQnA(qnA: any): void {

        this.chatBotAgentQnAInstance.addQnA(qnA)
            .subscribe((result) => {

                if (result.value > 0) {

                    //this.notify.info(this.l("SavedSuccessfully"));
                    //this.goQnaGrid();

                    this.qnA.id = result.value;
                    this.save.emit(this.qnA);

                } else {
                    this.checkResultError(result);
                }

            });

    }

    private loadPrimaryQuestion(): void {

        if (this.qnA.questions === undefined) {
            this.qnA.questions = [];
        }

        const primaryQuestionIndex: number = this.qnA.questions.findIndex(x => x.isPrimary === true);

        if (primaryQuestionIndex > -1) {
            this.qnA.questions[primaryQuestionIndex].question = this.primaryQuestion.question;
        } else {

            this.primaryQuestion.isPrimary = true;
            this.qnA.questions.push(this.primaryQuestion);

        }

    }

    public saveQnA(): void {

        debugger;
        this.loadPrimaryQuestion();

        if (this.checkAlternativeQuestion(null) === true) {
            //this.notify.warn(this.l("QuestionDuplicated"));
            return;
        }

        this.saving = true;

        if (this.qnA.id > 0) {
            this.updateQnA(this.qnA);
        } else {
            this.insertQnA(this.qnA);
        }



    }

    public cancelQnA(): void {

        this.cancel.emit(this.qnA);

    }

    public deleteQnA(): void {

        // this.message.confirm("", this.l("AreYouSure"), isConfirmed => {

        //     if (isConfirmed) {

        const qnA: any = this.qnA;

        this.chatBotAgentQnAInstance.deleteQnA(qnA)
            .subscribe((result) => {

                if (result.value > 0) {
                    this.save.emit(this.qnA);
                    //this.notify.info(this.l("SavedSuccessfully"));
                    //this.goQnaGrid();

                } else {
                    this.checkResultError(result);
                }

            });
        // }

        // });
    }


    private setValidateAlternativeQuestions(): void {
        this.validateQuestions = this.qnA !== null && this.qnA.questions !== null && this.qnA.questions.findIndex(x => x.question === "" && x.isDeleted === false) > -1;
    }

    private checkAlternativeQuestion(question: string): boolean {

        if (question !== null) {

            const alternativeQuestion: QnAQuestionDto = this.qnA.questions.find(x => x.question.toLowerCase() === question.toLowerCase());
            return alternativeQuestion !== null && alternativeQuestion !== undefined;

        } else {

            const counts: any = underscore.countBy(this.qnA.questions, "question");
            const questionsDuplicated = underscore.map(counts, (value: number, key: string) => {
                return { question: key, value: value };
            });

            const checkQuestionDuplicated = questionsDuplicated.find(x => x.value > 1);
            return checkQuestionDuplicated !== null && checkQuestionDuplicated !== undefined;

        }


    }

    public onBlurAlternativeQuestion(): void {
        this.setValidateAlternativeQuestions();
    }

    public addQuestion(question: any): void {

        if (this.qnA.questions === undefined) {
            this.qnA.questions = [];
        }

        if (this.newQuestion && this.newQuestion.question !== "") {

            if (this.checkAlternativeQuestion(question) === true) {
                //this.notify.warn(this.l("QuestionDuplicated"));
            } else {

                this.newQuestion = new QnAQuestionDto();
                this.newQuestion.question = question;
                this.newQuestion.isPrimary = false;
                this.newQuestion.isDeleted = false;
                this.newQuestion.id = 0;

                if (!this.qnA.questions) {
                    this.qnA.questions = [];
                }

                this.qnA.questions.push(this.newQuestion);
                this.newQuestion = null;

            }

            this.setValidateAlternativeQuestions();

        }

    }

    public deleteQuestion(index: number): void {

        // this.message.confirm("", this.l("AreYouSure"), isConfirmed => {

        //     if (isConfirmed) {

        if (this.qnA.questions[index].id > 0) {
            this.qnA.questions[index].isDeleted = true;
        } else {
            this.qnA.questions.splice(index, 1);
        }

        this.setValidateAlternativeQuestions();

        // }

        // });

    }

    public onSelectCategory(category: CategoryDto): void {

        if (!this.qnA.categories) {
            this.qnA.categories = [];
        }

        const index: number = this.qnA.categories.findIndex(x => x.agentCategoryId === category.id);

        if (index > -1) {
            this.qnA.categories[index].isDeleted = false;
        } else {

            const qnAAgentCategoryDto: QnAAgentCategoryDto = new QnAAgentCategoryDto();
            qnAAgentCategoryDto.id = 0;
            qnAAgentCategoryDto.agentCategoryId = category.id;
            qnAAgentCategoryDto.agentCategoryName = category.name;

            this.qnA.categories.push(qnAAgentCategoryDto);

        }

    }

    public onUnselectCategory(category: CategoryDto): void {

        const index: number = this.qnA.categories.findIndex(x => x.agentCategoryId === category.id);

        if (this.qnA.categories[index].id > 0) {
            this.qnA.categories[index].isDeleted = true;
        } else {
            this.qnA.categories.splice(index, 1);
        }

    }

}
