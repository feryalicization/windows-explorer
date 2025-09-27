import type { FolderDTO, FolderTreeNode, Id } from "../domain/types.ts";

/** O(n) flat → tree */
export function buildTree(folders: FolderDTO[]): FolderTreeNode[] {
  const byId = new Map<Id, FolderTreeNode>();
  const roots: FolderTreeNode[] = [];

  for (const f of folders) {
    byId.set(f.id, { id: f.id, name: f.name, parentId: f.parentId, children: [] });
  }
  for (const f of folders) {
    const node = byId.get(f.id)!;
    if (f.parentId == null) roots.push(node);
    else byId.get(f.parentId)?.children!.push(node);
  }
  return roots;
}
