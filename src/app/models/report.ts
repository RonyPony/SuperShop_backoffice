import { Locacion } from "./location";

export interface Report {
    assignedAuthorityId: boolean
    creationDate: Date
    description: string
    id: number
    isCompleted: boolean
    isDeleted: boolean
    reportType: number
    reporterUserId: string
    ubicacion: Locacion
}
