import { Customer, Employee, Service } from "./collection";
import { Meta_pair, Tag } from "./content";

export interface Content {
  __component: string;
  id: number;
}

export interface HeroSection extends Content {
  title: string;
  description: string;
  tags: Tag[];
}

// Questions component interface
export interface Questions extends Content {
  question: string;
  answers: Meta_pair[];
}

// Team component interface
export interface Team extends Content {
  title: string;
  employees: Employee[];
}

// Services component interface
export interface ServicesSection extends Content {
  title: string;
  services: Service[];
}

export interface CustomersSection extends Content {
  title: string;
  customers: Customer[];
}
