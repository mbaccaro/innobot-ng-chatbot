import { Component, Injector, Output, Input, OnInit, EventEmitter } from "@angular/core";
import { AppComponentBase } from "../../shared/common/app-base-component";

@Component({
    selector: "qna-detail",
    templateUrl: "./qna-detail.component.html"
})

export class QnaDetailComponent extends AppComponentBase implements OnInit {

    public constructor(injector: Injector) {
        super(injector);

    }

    public ngOnInit(): void {


    }

}
