import { Component, Injector, OnInit, Input, EventEmitter, Output, AfterViewInit } from "@angular/core";
import { AppComponentBase } from "../../../shared/common/app-base-component";
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { FAQService } from "../../faq-service";
import { CategoryDto, QnAAgentCategoryDto } from "../category-model";
import * as underscore from "lodash";

@Component({
    selector: 'category-dropdown-tree',
    templateUrl: './category-dropdown-tree.component.html'
})

export class CategoryDropdownTreeComponent extends AppComponentBase implements OnInit, AfterViewInit {

    public config: TreeviewConfig;
    public items: TreeviewItem[];
    private nodes: TreeviewItem[];
    private faqService: FAQService;
    private rendered: boolean;
    @Input() public agentId: number;
    @Input() public selectedQnaCategories: QnAAgentCategoryDto[];
    @Output() public selectNode: EventEmitter<CategoryDto> = new EventEmitter();
    @Output() public unselectNode: EventEmitter<CategoryDto> = new EventEmitter();

    public constructor(injector: Injector) {
        super(injector);

        this.faqService = injector.get(FAQService);

    }

    public ngOnInit(): void {

        this.initConfigTreeview();
        this.loadTreeview();

    }

    public ngAfterViewInit(): void {
        this.rendered = true;
    }

    private initConfigTreeview(): void {

        this.config = TreeviewConfig.create({
            hasAllCheckBox: true,
            hasFilter: true,
            hasCollapseExpand: false,
            decoupleChildFromParent: false,
            maxHeight: 800
        });

    }

    private loadTreeview(): void {

        this.items = [];
        this.nodes = [];

        this.faqService.getCategories(this.agentId, undefined).subscribe((result) => {

            const categories = result;

            if (categories && categories.length > 0) {

                categories.forEach(category => {
                    this.loadTreeNode(category, null);
                });

                this.loadNodesSelected();
                this.items = this.nodes;

            }

        });

    }

    private loadNodesSelected(): void {

        if (!this.selectedQnaCategories) {
            return;
        }

        this.selectedQnaCategories.forEach(category => {

            const index = this.nodes.findIndex(x => x.value === category.agentCategoryId);

            if (index) {

                const node = this.nodes[index];
                this.nodes[index] = new TreeviewItem({ text: node.text, value: node.value, children: node.children, checked: true });

            }

        });

    }

    private loadTreeNode(category: any, treeNode: any): void {

        const node = this.mapperCategoryToNode(category);

        if (category.children && category.children.length > 0) {
            category.children.forEach(child => this.loadTreeNode(child, node));
        }

        if (treeNode !== null) {
            treeNode.children.push(node);
        } else {
            this.nodes.push(new TreeviewItem(node));
        }

    }

    private mapperCategoryToNode(category: CategoryDto): any {

        const node = {
            text: category.name, value: category.id, checked: false, children: []
        };

        return node;

    }

    public selectItem(items: any): void {

        if (this.rendered === false && items === 0) {
            return;
        }

        const selectedCategories: any = this.selectedQnaCategories.map(x => { return x.agentCategoryId });

        if (items.length < selectedCategories.length) {
            this.onEventHandler(selectedCategories, items, this.unselectNode);
        } else {
            this.onEventHandler(items, selectedCategories, this.selectNode);
        } 

    }

    private onEventHandler(source, target, eventEmitter): void {

        const elements: any = underscore.difference(source, target);

        if (elements && elements.length > 0) {

            elements.forEach(element => {

                const categorySelected = this.getCategory(element);
                eventEmitter.emit(categorySelected);

            });

        }

    }

    private getCategory(id: number): CategoryDto {

        const category = new CategoryDto();
        category.id = id;
        category.agentId = this.agentId;
        return category;

    }

}
