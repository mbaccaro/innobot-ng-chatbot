import { Component, Injector, Output, Input, OnInit, EventEmitter } from "@angular/core";
import { AppComponentBase } from "../../shared/common/app-base-component";
import { QnADto } from "./qna-model";

@Component({
    selector: "qna-detail",
    templateUrl: "./qna-detail.component.html",
    styleUrls: ["./qna-detail.scss"]
})

export class QnaDetailComponent extends AppComponentBase implements OnInit {

    @Output() public delete: EventEmitter<QnADto> = new EventEmitter();
    @Output() public edit: EventEmitter<QnADto> = new EventEmitter();
    @Output() public unselectQnA: EventEmitter<QnADto> = new EventEmitter();
    @Input() public qna: QnADto;
    @Input() public selectedQnA: QnADto;
    @Input() public set model(model: QnADto) {        
        
        this.qna = model;
    }

    public get model() {
        return this.qna;
    }

    public constructor(injector: Injector) {
        super(injector);

    }

    public ngOnInit(): void {

      //  this.qna = new QnADto();

    }

    public onEditQnA(): void {
        this.edit.emit(this.qna);
    }

    public onDeleteQnA(): void {
        this.edit.emit(this.qna);
    }
    
}
