-- CreateTable
CREATE TABLE "public"."Folder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."File" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "folderId" INTEGER NOT NULL,
    "sizeBytes" INTEGER NOT NULL DEFAULT 0,
    "mimeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Folder_parentId_idx" ON "public"."Folder"("parentId");

-- CreateIndex
CREATE INDEX "Folder_name_idx" ON "public"."Folder"("name");

-- CreateIndex
CREATE INDEX "File_folderId_idx" ON "public"."File"("folderId");

-- CreateIndex
CREATE INDEX "File_name_idx" ON "public"."File"("name");

-- AddForeignKey
ALTER TABLE "public"."Folder" ADD CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
