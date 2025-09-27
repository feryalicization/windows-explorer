<script setup lang="ts">
import Explorer from "@/components/Explorer.vue";
import type { FolderNode } from "@/types/folder";

const mockTree: FolderNode[] = [
  {
    id: 1,
    name: "Root A",
    parentId: null,
    children: [
      {
        id: 2,
        name: "A-1",
        parentId: 1,
        children: [
          { id: 5, name: "A-1-i", parentId: 2 },
          { id: 6, name: "A-1-ii", parentId: 2 },
        ],
      },
      { id: 3, name: "A-2", parentId: 1 },
      {
        id: 4,
        name: "A-3",
        parentId: 1,
        children: [{ id: 7, name: "A-3-i", parentId: 4 }],
      },
    ],
  },
  {
    id: 10,
    name: "Root B",
    parentId: null,
    children: [
      { id: 11, name: "B-1", parentId: 10 },
      { id: 12, name: "B-2", parentId: 10 },
    ],
  },
];
</script>

<template>
  <main class="page">
    <Explorer :tree="mockTree" />
  </main>
</template>

<style scoped>
.page {
  height: 100vh;
  padding: 12px;
  background: #f3f4f6;
  box-sizing: border-box;
}
</style>
