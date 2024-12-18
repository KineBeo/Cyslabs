// Employee interface
export interface Employee {
  id: number;
  documentId: string;
  name: string;
  position: string | null;
  background: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
