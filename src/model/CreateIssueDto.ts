export interface CreateIssueDto {
    title: string;
    description: string;
    category: string;
    priority: 1|2|3|4|5;
    email: string;
}