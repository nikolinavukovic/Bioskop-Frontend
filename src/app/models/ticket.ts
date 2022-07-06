export interface ISession {
    sessionId: string;
    publicKey: string;
  }
  
  export interface ITicket {
    id: string;
    priceId: string;
    name: string;
    price: string;
    features: string[];
  }