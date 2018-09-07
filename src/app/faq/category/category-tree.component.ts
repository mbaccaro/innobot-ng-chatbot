
import { Component, Injector, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TreeNodeClass } from "./category-tree.model";
import { MenuItem } from "mcapp.ng.components";
import * as underscore from "lodash";
import { AppComponentBase } from "../../shared/common/app-base-component";
import { QnAAgentCategoryDto, CategoryDto } from "./category-model";
import { FAQService } from "../faq-service";
import { ChatBotAgentCategory } from "innobot-chat-api";

@Component({
    selector: "category-tree",
    templateUrl: "./category-tree.component.html"
})

export class CategoryTreeComponent extends AppComponentBase implements OnInit {

    private faqService: FAQService;
    public categoryTree: TreeNodeClass[];
    public selectedFiles: any;
    public parentNodes: TreeNodeClass[] = [];
    public items: MenuItem[];
    public previousSingleSelect: TreeNodeClass;
    public previousSelectNodes: TreeNodeClass[];
    private pSelectedQnaCategories: QnAAgentCategoryDto[];
    public isTreeReady = false;
    public categoryModel: CategoryDto;
    public contextSelectNode: TreeNodeClass;
    private chatBotAgentCategoryIntance: ChatBotAgentCategory;
    private generalCategory: CategoryDto;

    @Output() public selectNode: EventEmitter<CategoryDto> = new EventEmitter();
    @Output() public unselectNode: EventEmitter<CategoryDto> = new EventEmitter();
    @Input() public agentId: number;
    @Input() public selectionMode: string;


    @Input() public set selectedQnaCategories(value: QnAAgentCategoryDto[]) {

        this.pSelectedQnaCategories = value;

        if (this.isTreeReady) {
            this.findSelectedNodes();
        }

    }

    public get selectedQnaCategories(): QnAAgentCategoryDto[] {
        return this.pSelectedQnaCategories;
    }

    public constructor(injector: Injector) {
        super(injector);

        this.faqService = injector.get(FAQService);

    }

    public ngOnInit(): void {

        this.previousSelectNodes = [];
        this.categoryTree = [];
        this.items = [
            { label: "Edit", icon: "la la-edit", command: (event) => this.editCategoryModel() },
            { label: "Add Sub Category", icon: "la la-plus", command: (event) => this.createCategoryModel(false) },
            { label: "Delete", icon: "la la-close", command: (event) => this.deleteCategory() }
        ];
        this.previousSingleSelect = new TreeNodeClass();
        this.contextSelectNode = new TreeNodeClass();
        this.chatBotAgentCategoryIntance = this.faqService.getChatBotAgentCategory();
        this.initGeneralCategory();
        this.populateTree("");

    }

    public initGeneralCategory(): void {

        if (this.selectionMode === "checkbox") {
            return;
        }

        this.generalCategory = new CategoryDto();
        this.generalCategory.id = -1;
        this.generalCategory.name = "General";
        this.generalCategory.parentId = null;
        this.generalCategory.agentId = this.agentId;
        this.creatTreeNode(this.generalCategory, null);

    }

    public populateTree(searchValue: string): void {

        this.chatBotAgentCategoryIntance.getCategories(this.agentId, searchValue).subscribe((result) => {

            const categories = result;
            debugger
            if (categories && categories.length > 0) {

                categories.forEach(category => {
                    this.creatTreeNode(category, null);
                });

            }

            if (this.selectionMode === "checkbox") {
                this.findSelectedNodes();
            }

            this.isTreeReady = true;

        });

    }

    public creatTreeNode(category: any, treeNodeClass: TreeNodeClass): void {

        const newNode = this.dtoToNode(category);
        newNode.parent = treeNodeClass;

        if (category.children && category.children.length > 0) {
            category.children.forEach(child => this.creatTreeNode(child, newNode));
        }

        if (treeNodeClass !== null) {
            treeNodeClass.children.push(newNode);
        } else {
            this.categoryTree.push(newNode);
        }

    }

    public findSelectedNodes(): void {

        this.selectedFiles = [];

        if (this.categoryTree && this.selectedQnaCategories) {
            this.categoryTree.forEach(node => this.populateSelectedNode(node));
        }

        this.previousSelectNodes = this.selectedFiles;

    }

    public populateSelectedNode(node: TreeNodeClass): void {

        const category = this.selectedQnaCategories.find(x => x.agentCategoryId === node.id);

        if (category) {

            node.expanded = true;
            node.isSelectLeaf = true;
            this.selectedFiles.push(node);

            if (node.parent) {
                this.getParentSelected(node.parent);
            }

        }

        if (node.children && node.children.length > 0) {
            node.children.forEach(child => this.populateSelectedNode(child));
        }

    }

    public getParentSelected(node: TreeNodeClass): void {

        const selectedNode = this.selectedFiles.find(x => x.id === node.id);

        if (!selectedNode) {

            node.expanded = true;
            this.selectedFiles.push(node);

            if (node.parent) {
                this.getParentSelected(node.parent);
            }

        }

    }

    public addNewTreeNode(category: CategoryDto): void {

        const newNode = this.dtoToNode(category);

        if (!category.parentId) {

            newNode.parent = null;
            this.categoryTree.push(newNode);

        } else {

            newNode.parent = this.contextSelectNode;
            if (!this.contextSelectNode.children) {
                this.contextSelectNode.children = [];
            }

            this.contextSelectNode.children.push(newNode);
            this.contextSelectNode.expanded = true;

        }

    }

    public createCategoryModel(isRoot: boolean): void {

        this.categoryModel = new CategoryDto();
        this.categoryModel.id = 0;
        this.categoryModel.agentId = this.agentId;
        this.categoryModel.parentId = isRoot ? null : this.contextSelectNode.id;

    }

    public editCategoryModel(): void {
        this.categoryModel = this.nodeToDto(this.contextSelectNode);
    }

    public onCategorySaved(category: CategoryDto): void {

        if (category.id === 0) {
            this.createCategory(category);
        } else {
            this.updateCategory(category);
        }

    }

    public onCancelCategory(): void {
        this.categoryModel = null;
    }

    public createCategory(category: CategoryDto): void {

        this.chatBotAgentCategoryIntance.addCategory(category)
            .subscribe((result) => {

                if (result.value > 0) {

                    //this.notify.info(this.l("SavedSuccessfully"));
                    this.categoryModel = null;
                    category.id = result.value;
                    this.addNewTreeNode(category);

                } else {
                    this.checkResultError(result);
                }

            });

    }

    public updateCategory(category: CategoryDto): void {

        this.chatBotAgentCategoryIntance.editCategory(category)
            .subscribe((result) => {

                if (result.value > 0) {

                    //this.notify.info(this.l("SavedSuccessfully"));
                    this.categoryModel = null;
                    this.contextSelectNode.label = category.name;

                    if (this.selectionMode === "single") {

                        // this.categoryServiceProxy.isCategoryUsedByQnA(this.contextSelectNode.id, API_VERSION).subscribe((re) => {

                        //     if (re) {
                        //         this.selectNode.emit(category);
                        //     }

                        // });

                    }

                } else {
                    this.checkResultError(result);
                }

            });

    }

    public deleteCategory(): void {

        if (this.contextSelectNode.children && this.contextSelectNode.children.length) {
            //this.message.info(this.l("CategoryChildrenRelate"));
        } else {

            // this.categoryServiceProxy.isCategoryUsedByQnA(this.contextSelectNode.id, API_VERSION).subscribe((result) => {

            //     if (!result) {
            //         this.deleteCategoryProcess();
            //     } else {
            //         //this.message.info(this.l("CategoryUsed"));
            //     }

            // });

        }

    }

    public deleteCategoryProcess(): void {

        // this.message.confirm("", this.l("AreYouSureToDeleteTheElement", this.contextSelectNode.id),
        //     isConfirmed => {

        //         if (isConfirmed) {

        //             const category = this.nodeToDto(this.contextSelectNode);
        //             this.categoryServiceProxy.deleteCategory(category, API_VERSION).subscribe(() => {

        //                 this.notify.info(this.l("SuccessfullyDeleted"));
        //                 if (this.contextSelectNode.parent) {
        //                     this.contextSelectNode.parent.children = this.contextSelectNode.parent.children.filter(x => x.id !== this.contextSelectNode.id);
        //                 } else {
        //                     this.categoryTree = this.categoryTree.filter(x => x.id !== this.contextSelectNode.id);
        //                 }

        //                 this.contextSelectNode = null;
        //                 this.unselectNode.emit(category);

        //             });

        //         }

        //     });

    }

    public nodeSelect(e: any): void {

        if (this.selectionMode === "checkbox") {

            this.checkBoxSelection();
            this.checkPartialSelect();

        } else {

            if (this.previousSingleSelect && this.previousSingleSelect.id === e.node.id) {

                this.selectedFiles = new TreeNodeClass();
                this.previousSingleSelect = new TreeNodeClass();
                const unselectCategory = this.nodeToDto(e.node);
                this.unselectNode.emit(unselectCategory);
                return;

            }

            this.previousSingleSelect = this.selectedFiles;

        }

        const category = this.nodeToDto(e.node);
        this.selectNode.emit(category);

        if (e.node.parent) {
            this.changeSelectLeaf(e.node.parent);
        }

    }

    public checkBoxSelection(): void {

        this.selectedFiles = underscore.uniqBy(this.selectedFiles, "id");
        this.selectedFiles.forEach(node => this.checkParent(node));
        this.parentNodes = underscore.uniqBy(this.parentNodes, "id");
        this.selectedFiles = this.selectedFiles.concat(this.parentNodes);
        this.parentNodes = [];
        this.previousSelectNodes = this.selectedFiles;

    }

    public checkParent(node: TreeNodeClass): void {

        if (node.parent) {

            const selectedNode = this.selectedFiles.find(x => x.id === node.parent.id);

            if (selectedNode == null) {

                this.parentNodes.push(node.parent);
                this.checkParent(node.parent);

            }

        }

    }

    public changeSelectLeaf(node: TreeNodeClass): void {

        if (node.isSelectLeaf) {

            node.isSelectLeaf = false;
            const category = this.nodeToDto(node);
            this.unselectNode.emit(category);

        } else {

            if (node.parent) {
                this.changeSelectLeaf(node.parent);
            }

        }

    }

    public nodeUnselect(e: any): void {

        if (this.selectionMode === "checkbox") {

            let isError = false;
            let childrenNodes: TreeNodeClass[];
            childrenNodes = e.node.children;

            if (childrenNodes.length && this.selectedFiles.length) {

                const selectedChildren = underscore.intersectionBy(childrenNodes, this.selectedFiles, "id");

                if (selectedChildren.length) {

                    //this.notify.warn(this.l("UnselectFromLeaf"));
                    isError = true;

                }

            }

            this.checkBoxSelection();
            this.checkPartialSelect();

            if (!isError) {

                e.node.isSelectLeaf = false;
                const category = this.nodeToDto(e.node);
                this.unselectNode.emit(category);

            }

        }

    }

    public checkPartialSelect(): void {

        if (this.selectedFiles) {
            this.selectedFiles.forEach(node => node.partialSelected = false);
        }

    }

    public contextSelect(e: any) {

        this.contextSelectNode = e.node;

        if (this.selectionMode === "single") {

            if (this.selectedFiles.id !== this.previousSingleSelect.id) {

                const category = this.nodeToDto(e.node);
                this.selectNode.emit(category);
                this.previousSingleSelect = this.selectedFiles;

            }

        } else {

            if (this.selectedFiles.length === 1 && (!this.previousSelectNodes.find(x => x.id === this.selectedFiles[0].id))) {
                this.selectedFiles = this.previousSelectNodes;
            }

        }

    }

    public nodeToDto(node: TreeNodeClass): CategoryDto {

        const category = new CategoryDto();
        category.id = node.id;
        category.children = [];
        category.agentId = this.agentId;
        category.name = node.label;
        category.parentId = node.parent ? node.parent.id : null;
        return category;

    }

    public dtoToNode(category: CategoryDto): TreeNodeClass {

        const newNode = new TreeNodeClass();
        newNode.children = [];
        newNode.collapsedIcon = "la la-folder";
        newNode.expandedIcon = "la la-folder-open";
        newNode.label = category.name;
        newNode.id = category.id;
        return newNode;

    }

    public onSearch($event) {
      
        this.categoryTree = [];     
        this.populateTree($event);
    }

}


