export interface StageResponse {
    id:number
    dateDebut:string
    dateFin:string
    tuteur:string
    sujet:string
    description:string
    etablissement:string
}

export interface StageRequest {
    dateDebut:string
    dateFin:string
    tuteur:string
    sujet:string
    description:string
    etablissement:string
}