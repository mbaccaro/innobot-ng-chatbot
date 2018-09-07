import { Component, Injector, Output, Input, OnInit, EventEmitter } from "@angular/core";
import { AppComponentBase } from "../../shared/common/app-base-component";
import { CategoryDto } from "../category/category-model";


@Component({
    selector: "breadcrumbs",
    templateUrl: "./breadcrumbs.component.html",
    styleUrls: ["./breadcrumbs.scss"]
})

export class BreadcrumbsComponent extends AppComponentBase implements OnInit {

    @Input() public selectedCategory: CategoryDto;
    
    public constructor(injector: Injector) {
        super(injector);

    }

    public ngOnInit(): void {

      //  this.qna = new QnADto();

    }

  
    
}
