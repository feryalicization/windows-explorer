import { PrismaClient } from "../generated/prisma/index.js";
import type { Id, FolderDTO } from "../domain/types.ts";

export class FolderRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<FolderDTO[]> {
    return this.prisma.folder.findMany({
      select: { id: true, name: true, parentId: true },
      orderBy: [{ parentId: "asc" }, { id: "asc" }]
    });
  }

  async getChildren(parentId: Id | null): Promise<FolderDTO[]> {
    return this.prisma.folder.findMany({
      where: { parentId },
      select: { id: true, name: true, parentId: true },
      orderBy: [{ id: "asc" }]
    });
  }

  async getById(id: Id): Promise<FolderDTO | null> {
    return this.prisma.folder.findUnique({
      where: { id },
      select: { id: true, name: true, parentId: true }
    });
  }
}
