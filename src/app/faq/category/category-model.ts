export class CategoryDto implements ICategoryDto {
    id: number;
    name: string;
    isDeleted: boolean;
    description: string;
    children: CategoryDto[];
    parentId: number;
    agentId: number;

    constructor(data?: ICategoryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.isDeleted = data["isDeleted"];
            this.description = data["description"];
            if (data["children"] && data["children"].constructor === Array) {
                this.children = [];
                for (let item of data["children"])
                    this.children.push(CategoryDto.fromJS(item));
            }
            this.parentId = data["parentId"];
            this.agentId = data["agentId"];
        }
    }

    static fromJS(data: any): CategoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new CategoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["isDeleted"] = this.isDeleted;
        data["description"] = this.description;
        if (this.children && this.children.constructor === Array) {
            data["children"] = [];
            for (let item of this.children)
                data["children"].push(item.toJSON());
        }
        data["parentId"] = this.parentId;
        data["agentId"] = this.agentId;
        return data; 
    }
}

export interface ICategoryDto {
    id: number;
    name: string;
    isDeleted: boolean;
    description: string;
    children: CategoryDto[];
    parentId: number;
    agentId: number;
}


export class QnAAgentCategoryDto implements IQnAAgentCategoryDto {
    id: number;
    isDeleted: boolean;
    agentCategoryId: number;
    agentCategoryName: string;
    qnAId: number;

    constructor(data?: IQnAAgentCategoryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.isDeleted = data["isDeleted"];
            this.agentCategoryId = data["agentCategoryId"];
            this.agentCategoryName = data["agentCategoryName"];
            this.qnAId = data["qnAId"];
        }
    }

    static fromJS(data: any): QnAAgentCategoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new QnAAgentCategoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["isDeleted"] = this.isDeleted;
        data["agentCategoryId"] = this.agentCategoryId;
        data["agentCategoryName"] = this.agentCategoryName;
        data["qnAId"] = this.qnAId;
        return data; 
    }
}

export interface IQnAAgentCategoryDto {
    id: number;
    isDeleted: boolean;
    agentCategoryId: number;
    agentCategoryName: string;
    qnAId: number;
}