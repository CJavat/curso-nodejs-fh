export interface Ticket {
  id: string;
  number: number;
  createdAt: Date;
  handleAtDesk?: string; // Escritorio 1, etc...
  handleAt?: Date;
  done: boolean;
}