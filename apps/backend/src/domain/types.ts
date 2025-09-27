export type Id = number;

export interface FolderDTO {
  id: Id;
  name: string;
  parentId: Id | null;
}

export interface FileDTO {
  id: Id;
  name: string;
  folderId: Id;
  sizeBytes: number;
  mimeType?: string | null;
}

export interface FolderTreeNode {
  id: Id;
  name: string;
  parentId: Id | null;
  children?: FolderTreeNode[];
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
