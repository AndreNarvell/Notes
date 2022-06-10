export interface IDoc {
  docId: number;
  userId: number;
  title?: string;
  context: string;
  created: Date;
  lastChanged?: Date;
}
