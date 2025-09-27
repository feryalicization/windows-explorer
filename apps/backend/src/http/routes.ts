import type { Elysia } from "elysia";
import { PrismaClient } from "../generated/prisma/index.js";
import { FolderRepository } from "../repositories/folderRepo.js";
import { FileRepository } from "../repositories/fileRepo.js";
import { FolderService } from "../services/folderService.js";

export function registerRoutes(app: Elysia) {
  const prisma = new PrismaClient();
  const folders = new FolderRepository(prisma);
  const files   = new FileRepository(prisma);
  const svc     = new FolderService(folders, files);

  app.get("/api/v1/health", () => ({ status: "ok" }), {
    detail: { tags: ["system"], summary: "Health check" }
  });

  app.get("/api/v1/folders/tree", async () => {
    return svc.getFullTree();
  }, {
    detail: { tags: ["folders"], summary: "Get full folder tree (all levels)" }
  });

  app.get("/api/v1/folders/:id/children", async ({ params }) => {
    const id = Number(params.id);
    return svc.getChildren(id);
  }, {
    detail: { tags: ["folders"], summary: "Get direct subfolders of a folder" }
  });

  app.get("/api/v1/folders/:id/files", async ({ params, query }) => {
    const id = Number(params.id);
    const page = query?.page ? Number(query.page) : 1;
    const pageSize = query?.pageSize ? Number(query.pageSize) : 50;
    return svc.getFiles(id, page, pageSize);
  }, {
    detail: { tags: ["files"], summary: "Get files inside a folder (paginated)" }
  });

  return app;
}
