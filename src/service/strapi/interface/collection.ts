import { Image } from "./content";

// Employee interface
export interface Employee {
  id?: number;
  documentId?: string;
  name: string;
  avatar: Image;
  position?: string;
  background: string | null;
  // createdAt: string;
  // updatedAt: string;
  // publishedAt: string;
}

export interface Service {
  id?: number;
  documentId?: string;
  title: string;
  description: string;
  icon: string;
  // createdAt: string;
  // updatedAt: string;
  // publishedAt: string;
}

export interface Customer {
  id?: number;
  documentId?: string;
  name: string;
  url?: string;
  type: string;
}
