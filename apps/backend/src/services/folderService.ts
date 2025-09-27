import type { Id, FolderTreeNode, FolderDTO } from "../domain/types.js";
import { FolderRepository } from "../repositories/folderRepo.js";
import { FileRepository } from "../repositories/fileRepo.js";
import { buildTree } from "../utils/tree.js";

export class FolderService {
  constructor(
    private folders: FolderRepository,
    private files: FileRepository
  ) {}

  async getFullTree(): Promise<FolderTreeNode[]> {
    const all = await this.folders.getAll();
    return buildTree(all);
  }

  async getChildren(folderId: Id): Promise<FolderDTO[]> {
    return this.folders.getChildren(folderId);
  }

  async getFiles(folderId: Id, page = 1, pageSize = 50) {
    return this.files.getByFolder(folderId, page, pageSize);
  }
}
