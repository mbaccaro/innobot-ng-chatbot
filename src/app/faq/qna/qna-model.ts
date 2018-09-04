import { QnAAgentCategoryDto } from "../category/category-model";

export class QnADto implements IQnADto {
    id: number;
    identifier: string;
    answer: string;
    isDeleted: boolean;
    agentId: number;
    agentName: string;
    categories: QnAAgentCategoryDto[];
    questions: QnAQuestionDto[];

    constructor(data?: IQnADto) {
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
            this.identifier = data["identifier"];
            this.answer = data["answer"];
            this.isDeleted = data["isDeleted"];
            this.agentId = data["agentId"];
            this.agentName = data["agentName"];
            if (data["categories"] && data["categories"].constructor === Array) {
                this.categories = [];
                for (let item of data["categories"])
                    this.categories.push(QnAAgentCategoryDto.fromJS(item));
            }
            if (data["questions"] && data["questions"].constructor === Array) {
                this.questions = [];
                for (let item of data["questions"])
                    this.questions.push(QnAQuestionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QnADto {
        data = typeof data === 'object' ? data : {};
        let result = new QnADto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["identifier"] = this.identifier;
        data["answer"] = this.answer;
        data["isDeleted"] = this.isDeleted;
        data["agentId"] = this.agentId;
        data["agentName"] = this.agentName;
        if (this.categories && this.categories.constructor === Array) {
            data["categories"] = [];
            for (let item of this.categories)
                data["categories"].push(item.toJSON());
        }
        if (this.questions && this.questions.constructor === Array) {
            data["questions"] = [];
            for (let item of this.questions)
                data["questions"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IQnADto {
    id: number;
    identifier: string;
    answer: string;
    isDeleted: boolean;
    agentId: number;
    agentName: string;
    categories: QnAAgentCategoryDto[];
    questions: QnAQuestionDto[];
}


export class QnAQuestionDto implements IQnAQuestionDto {
    id: number;
    qnAId: number;
    question: string;
    isDeleted: boolean;
    isPrimary: boolean;

    constructor(data?: IQnAQuestionDto) {
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
            this.qnAId = data["qnAId"];
            this.question = data["question"];
            this.isDeleted = data["isDeleted"];
            this.isPrimary = data["isPrimary"];
        }
    }

    static fromJS(data: any): QnAQuestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new QnAQuestionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["qnAId"] = this.qnAId;
        data["question"] = this.question;
        data["isDeleted"] = this.isDeleted;
        data["isPrimary"] = this.isPrimary;
        return data; 
    }
}

export interface IQnAQuestionDto {
    id: number;
    qnAId: number;
    question: string;
    isDeleted: boolean;
    isPrimary: boolean;
}


export class AgentDto implements IAgentDto {
    messageHandling: MessageHandlingDto;
    keywordTypes: KeywordTypeAgentDto[];
    id: number;
    name: string;
    description: string;
    configuration: string;
    sessionTimeout: number;
    statusType: number;
    agentType: number;
    postsCount: number;
    categoryCount: number;
    intentCount: number;
    projectId: number;
    projectName: string;
    userId: number;
    outputVoiceType: number;
    isDeleted: boolean;
    thresholdNumber: number;
    creationTime: moment.Moment;
    messageHandlingId: number;

    constructor(data?: IAgentDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.messageHandling = data["messageHandling"] ? MessageHandlingDto.fromJS(data["messageHandling"]) : <any>undefined;
            if (data["keywordTypes"] && data["keywordTypes"].constructor === Array) {
                this.keywordTypes = [];
                for (let item of data["keywordTypes"])
                    this.keywordTypes.push(KeywordTypeAgentDto.fromJS(item));
            }
            this.id = data["id"];
            this.name = data["name"];
            this.description = data["description"];
            this.configuration = data["configuration"];
            this.sessionTimeout = data["sessionTimeout"];
            this.statusType = data["statusType"];
            this.agentType = data["agentType"];
            this.postsCount = data["postsCount"];
            this.categoryCount = data["categoryCount"];
            this.intentCount = data["intentCount"];
            this.projectId = data["projectId"];
            this.projectName = data["projectName"];
            this.userId = data["userId"];
            this.outputVoiceType = data["outputVoiceType"];
            this.isDeleted = data["isDeleted"];
            this.thresholdNumber = data["thresholdNumber"];
            this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
            this.messageHandlingId = data["messageHandlingId"];
        }
    }

    static fromJS(data: any): AgentDto {
        data = typeof data === 'object' ? data : {};
        let result = new AgentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["messageHandling"] = this.messageHandling ? this.messageHandling.toJSON() : <any>undefined;
        if (this.keywordTypes && this.keywordTypes.constructor === Array) {
            data["keywordTypes"] = [];
            for (let item of this.keywordTypes)
                data["keywordTypes"].push(item.toJSON());
        }
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["configuration"] = this.configuration;
        data["sessionTimeout"] = this.sessionTimeout;
        data["statusType"] = this.statusType;
        data["agentType"] = this.agentType;
        data["postsCount"] = this.postsCount;
        data["categoryCount"] = this.categoryCount;
        data["intentCount"] = this.intentCount;
        data["projectId"] = this.projectId;
        data["projectName"] = this.projectName;
        data["userId"] = this.userId;
        data["outputVoiceType"] = this.outputVoiceType;
        data["isDeleted"] = this.isDeleted;
        data["thresholdNumber"] = this.thresholdNumber;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["messageHandlingId"] = this.messageHandlingId;
        return data; 
    }
}

export interface IAgentDto {
    messageHandling: MessageHandlingDto;
    keywordTypes: KeywordTypeAgentDto[];
    id: number;
    name: string;
    description: string;
    configuration: string;
    sessionTimeout: number;
    statusType: number;
    agentType: number;
    postsCount: number;
    categoryCount: number;
    intentCount: number;
    projectId: number;
    projectName: string;
    userId: number;
    outputVoiceType: number;
    isDeleted: boolean;
    thresholdNumber: number;
    creationTime: moment.Moment;
    messageHandlingId: number;
}

export class MessageHandlingDto implements IMessageHandlingDto {
    id: number;
    isDeleted: boolean;
    agentId: number;
    agentName: string;
    maxNumberOfRetries: number;
    messages: MessageHandlingDetailDto[];

    constructor(data?: IMessageHandlingDto) {
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
            this.agentId = data["agentId"];
            this.agentName = data["agentName"];
            this.maxNumberOfRetries = data["maxNumberOfRetries"];
            if (data["messages"] && data["messages"].constructor === Array) {
                this.messages = [];
                for (let item of data["messages"])
                    this.messages.push(MessageHandlingDetailDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): MessageHandlingDto {
        data = typeof data === 'object' ? data : {};
        let result = new MessageHandlingDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["isDeleted"] = this.isDeleted;
        data["agentId"] = this.agentId;
        data["agentName"] = this.agentName;
        data["maxNumberOfRetries"] = this.maxNumberOfRetries;
        if (this.messages && this.messages.constructor === Array) {
            data["messages"] = [];
            for (let item of this.messages)
                data["messages"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IMessageHandlingDto {
    id: number;
    isDeleted: boolean;
    agentId: number;
    agentName: string;
    maxNumberOfRetries: number;
    messages: MessageHandlingDetailDto[];
}

export class KeywordTypeAgentDto implements IKeywordTypeAgentDto {
    id: number;
    keywordType: KeywordTypeDto;
    keywordTypeId: number;
    agentId: number;
    isDeleted: boolean;

    constructor(data?: IKeywordTypeAgentDto) {
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
            this.keywordType = data["keywordType"] ? KeywordTypeDto.fromJS(data["keywordType"]) : <any>undefined;
            this.keywordTypeId = data["keywordTypeId"];
            this.agentId = data["agentId"];
            this.isDeleted = data["isDeleted"];
        }
    }

    static fromJS(data: any): KeywordTypeAgentDto {
        data = typeof data === 'object' ? data : {};
        let result = new KeywordTypeAgentDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["keywordType"] = this.keywordType ? this.keywordType.toJSON() : <any>undefined;
        data["keywordTypeId"] = this.keywordTypeId;
        data["agentId"] = this.agentId;
        data["isDeleted"] = this.isDeleted;
        return data; 
    }
}

export interface IKeywordTypeAgentDto {
    id: number;
    keywordType: KeywordTypeDto;
    keywordTypeId: number;
    agentId: number;
    isDeleted: boolean;
}

export class MessageHandlingDetailDto implements IMessageHandlingDetailDto {
    id: number;
    message: string;
    messageHandlingType: MessageHandlingDetailDtoMessageHandlingType;
    messageHandlingId: number;
    isDeleted: boolean;

    constructor(data?: IMessageHandlingDetailDto) {
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
            this.message = data["message"];
            this.messageHandlingType = data["messageHandlingType"];
            this.messageHandlingId = data["messageHandlingId"];
            this.isDeleted = data["isDeleted"];
        }
    }

    static fromJS(data: any): MessageHandlingDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new MessageHandlingDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["message"] = this.message;
        data["messageHandlingType"] = this.messageHandlingType;
        data["messageHandlingId"] = this.messageHandlingId;
        data["isDeleted"] = this.isDeleted;
        return data; 
    }
}

export interface IMessageHandlingDetailDto {
    id: number;
    message: string;
    messageHandlingType: MessageHandlingDetailDtoMessageHandlingType;
    messageHandlingId: number;
    isDeleted: boolean;
}

export class KeywordTypeDto implements IKeywordTypeDto {
    id: number;
    values: KeywordTypeValueDto[];
    name: string;
    isDeleted: boolean;

    constructor(data?: IKeywordTypeDto) {
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
            if (data["values"] && data["values"].constructor === Array) {
                this.values = [];
                for (let item of data["values"])
                    this.values.push(KeywordTypeValueDto.fromJS(item));
            }
            this.name = data["name"];
            this.isDeleted = data["isDeleted"];
        }
    }

    static fromJS(data: any): KeywordTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new KeywordTypeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        if (this.values && this.values.constructor === Array) {
            data["values"] = [];
            for (let item of this.values)
                data["values"].push(item.toJSON());
        }
        data["name"] = this.name;
        data["isDeleted"] = this.isDeleted;
        return data; 
    }
}

export interface IKeywordTypeDto {
    id: number;
    values: KeywordTypeValueDto[];
    name: string;
    isDeleted: boolean;
}

export class KeywordTypeValueDto implements IKeywordTypeValueDto {
    id: number;
    isDeleted: boolean;
    value: string;

    constructor(data?: IKeywordTypeValueDto) {
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
            this.value = data["value"];
        }
    }

    static fromJS(data: any): KeywordTypeValueDto {
        data = typeof data === 'object' ? data : {};
        let result = new KeywordTypeValueDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["isDeleted"] = this.isDeleted;
        data["value"] = this.value;
        return data; 
    }
}

export interface IKeywordTypeValueDto {
    id: number;
    isDeleted: boolean;
    value: string;
}

