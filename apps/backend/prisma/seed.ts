import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.file.deleteMany();
  await prisma.folder.deleteMany();

  const rootA = await prisma.folder.create({ data: { name: "Root A" } });
  const rootB = await prisma.folder.create({ data: { name: "Root B" } });

  const a1 = await prisma.folder.create({ data: { name: "A-1", parentId: rootA.id } });
  await prisma.folder.create({ data: { name: "A-2", parentId: rootA.id } });

  const a1i = await prisma.folder.create({ data: { name: "A-1-i", parentId: a1.id } });

  await prisma.file.createMany({
    data: [
      { name: "notes.txt", folderId: a1i.id, sizeBytes: 500, mimeType: "text/plain" },
      { name: "todo.md", folderId: a1i.id, sizeBytes: 200, mimeType: "text/markdown" }
    ]
  });
}

main().finally(() => prisma.$disconnect());
