export interface ChatRoomResponse {
  destinataire: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
  };
  chatRoomMessages: [
    {
      contenu: string;
      dateEnvoi: string;
      expediteurId: string;
      destinatiareId: string;
    }
  ];
}

export interface ChatMessage {
  contenu: string;
  dateEnvoi: string;
  expediteurId: string;
  destinataireId: string;
}
export interface Destinataire {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}
