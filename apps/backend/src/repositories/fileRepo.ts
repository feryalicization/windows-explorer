import { PrismaClient } from "../generated/prisma/index.js";
import type { Id, Paginated, FileDTO } from "../domain/types.ts";

export class FileRepository {
  constructor(private prisma: PrismaClient) {}

  async getByFolder(folderId: Id, page = 1, pageSize = 50): Promise<Paginated<FileDTO>> {
    const where = { folderId };
    const [total, data] = await Promise.all([
      this.prisma.file.count({ where }),
      this.prisma.file.findMany({
        where,
        select: { id: true, name: true, folderId: true, sizeBytes: true, mimeType: true },
        orderBy: [{ id: "asc" }],
        skip: (page - 1) * pageSize,
        take: pageSize
      })
    ]);
    return { data, total, page, pageSize };
  }
}
