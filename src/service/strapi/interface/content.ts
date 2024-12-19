import { title } from "process";

export interface Tag {
  text: string;
  url: string | null;
}

export interface Meta_pair {
  title: string;
  description: string;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes?: number; // Nếu có trường này.
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small?: ImageFormat; // Dạng nhỏ, nếu tồn tại
    thumbnail?: ImageFormat; // Dạng thumbnail, nếu tồn tại
    [key: string]: ImageFormat | undefined; // Nếu có thêm format khác
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null; // Hoặc interface riêng nếu có định nghĩa
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
