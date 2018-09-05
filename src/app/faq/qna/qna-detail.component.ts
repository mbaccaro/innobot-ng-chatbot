import { Component, Injector, Output, Input, OnInit, EventEmitter } from "@angular/core";
import { AppComponentBase } from "../../shared/common/app-base-component";
import { QnADto } from "./qna-model";

@Component({
    selector: "qna-detail",
    templateUrl: "./qna-detail.component.html"
})

export class QnaDetailComponent extends AppComponentBase implements OnInit {

    @Output() public delete: EventEmitter<QnADto> = new EventEmitter();
    @Output() public edit: EventEmitter<QnADto> = new EventEmitter();
    public qnA: QnADto;

    @Input() public set model(model: QnADto) {
        this.qnA = model;
    }

    public get model() {
        return this.qnA;
    }

    public constructor(injector: Injector) {
        super(injector);

    }

    public ngOnInit(): void {

        this.qnA = new QnADto();

    }

    public onEditQnA(): void {
        this.edit.emit(this.qnA);
    }

    public onDeleteQnA(): void {
        this.edit.emit(this.qnA);
    }
    
}
