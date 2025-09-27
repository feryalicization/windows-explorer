export type Id = string | number;

export interface FolderNode {
  id: Id;
  name: string;
  parentId: Id | null;
  // direct children (unlimited levels)
  children?: FolderNode[];
}
