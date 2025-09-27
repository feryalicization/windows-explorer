<script setup lang="ts">
import type { FolderNode, Id } from "@/types/folder";
import FolderTreeNode from "./FolderTreeNode.vue";

type Props = {
  tree: FolderNode[]; // COMPLETE folder tree (all levels)
  selectedId?: Id | null; // currently selected folder id
  defaultExpandedRoot?: boolean; // expand top-level by default (UI only)
};
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "select", node: FolderNode): void;
}>();
</script>

<template>
  <div class="tree-panel">
    <FolderTreeNode
      v-for="n in tree"
      :key="n.id"
      :node="n"
      :depth="0"
      :selected-id="selectedId"
      :default-expanded="defaultExpandedRoot"
      @select="emit('select', $event)"
    />
  </div>
</template>

<style scoped>
.tree-panel {
  font-size: 14px;
  line-height: 1.2;
  padding: 8px;
}
</style>
