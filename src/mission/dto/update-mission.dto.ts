export class UpdateMissionDto {
    readonly missionID: number;
    readonly title:string;
    readonly description: string;
    readonly workflowID: number;
    readonly active: boolean;

}