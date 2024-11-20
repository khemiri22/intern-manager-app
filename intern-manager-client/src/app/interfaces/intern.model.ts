export interface InternRequest {
    email: string,
    nom: string,
    prenom:string,
    password: string,
    confirmPassword: string,
    image : any
  }
  export interface InternResponse {
    id : number
    email: string,
    nom: string,
    prenom:string,
    password: string,
    image : string
  }