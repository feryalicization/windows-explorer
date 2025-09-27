import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Reset tables & auto-increment IDs (Postgres)
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "File","Folder" RESTART IDENTITY CASCADE;`);

  const rootA = await prisma.folder.create({ data: { name: "Root A" } });
  const rootB = await prisma.folder.create({ data: { name: "Root B" } });

  const a1   = await prisma.folder.create({ data: { name: "A-1", parentId: rootA.id } });
  const a2   = await prisma.folder.create({ data: { name: "A-2", parentId: rootA.id } });
  const a1i  = await prisma.folder.create({ data: { name: "A-1-i",  parentId: a1.id } });
  const a1ii = await prisma.folder.create({ data: { name: "A-1-ii", parentId: a1.id } });

  const b1   = await prisma.folder.create({ data: { name: "B-1", parentId: rootB.id } });
  const b2   = await prisma.folder.create({ data: { name: "B-2", parentId: rootB.id } });

  await prisma.file.createMany({
    data: [
      { name: "notes.txt",  folderId: a1i.id, sizeBytes: 500,  mimeType: "text/plain" },
      { name: "todo.md",    folderId: a1i.id, sizeBytes: 200,  mimeType: "text/markdown" },
      { name: "readme.md",  folderId: b1.id,  sizeBytes: 550,  mimeType: "text/markdown" }
    ]
  });

  console.log("IDs:");
  console.table([
    { name: "Root A",  id: rootA.id },
    { name: "A-1",     id: a1.id },
    { name: "A-1-i",   id: a1i.id },
    { name: "A-1-ii",  id: a1ii.id },
    { name: "A-2",     id: a2.id },
    { name: "Root B",  id: rootB.id },
    { name: "B-1",     id: b1.id },
    { name: "B-2",     id: b2.id },
  ]);
}

main().finally(() => prisma.$disconnect());
