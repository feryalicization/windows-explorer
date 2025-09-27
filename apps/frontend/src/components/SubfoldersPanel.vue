<script setup lang="ts">
import type { FolderNode } from "@/types/folder";

type Props = {
  selected?: FolderNode | null;
  subfolders: FolderNode[]; // direct children only
};
defineProps<Props>();

const emit = defineEmits<{
  (e: "open", node: FolderNode): void; // when clicking a subfolder in right panel
}>();
</script>

<template>
  <div class="right-panel">
    <div class="header">
      <h3 v-if="selected">
        Subfolders of: <span class="path">{{ selected.name }}</span>
      </h3>
      <h3 v-else>Pick a folder on the left</h3>
    </div>

    <div v-if="!selected" class="placeholder">
      <p>Select a folder in the tree to view its direct subfolders here.</p>
    </div>

    <div v-else-if="subfolders.length === 0" class="placeholder">
      <p>No subfolders.</p>
    </div>

    <div v-else class="grid">
      <button
        v-for="f in subfolders"
        :key="f.id"
        class="card"
        @click="emit('open', f)"
        :title="f.name"
      >
        <div class="icon">📁</div>
        <div class="name">{{ f.name }}</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.right-panel {
  padding: 12px;
  height: 100%;
  overflow: auto;
}
.header {
  margin-bottom: 10px;
}
.path {
  color: #2563eb;
}
.placeholder {
  padding: 16px;
  color: #6b7280;
  background: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 8px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}
.card {
  height: 90px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
}
.card:hover {
  background: #f8fafc;
  border-color: #cdd5df;
}
.icon {
  font-size: 20px;
}
.name {
  font-size: 14px;
  white-space: nowrap;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
