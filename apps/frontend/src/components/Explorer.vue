<script setup lang="ts">
import { computed, ref } from "vue";
import type { FolderNode, Id } from "@/types/folder";
import FolderTree from "./FolderTree.vue";
import SubfoldersPanel from "./SubfoldersPanel.vue";

type Props = {
  // FULL tree (all folders & nested subfolders)
  tree: FolderNode[];

  // optional: control which node is initially selected
  initialSelectedId?: Id | null;
};
const props = defineProps<Props>();

const selectedId = ref<Id | null>(props.initialSelectedId ?? null);
const selectedNode = computed<FolderNode | null>(() => {
  if (selectedId.value == null) return null;

  // DFS to find selected node
  const stack = [...props.tree];
  while (stack.length) {
    const n = stack.pop()!;
    if (n.id === selectedId.value) return n;
    if (n.children?.length) stack.push(...n.children);
  }
  return null;
});

// direct children of selected
const directSubfolders = computed<FolderNode[]>(() => {
  return selectedNode.value?.children ?? [];
});

function handleSelect(node: FolderNode) {
  selectedId.value = node.id;
}
function handleOpenOnRight(node: FolderNode) {
  // Clicking on right panel subfolder should also select it (to show its children on right)
  selectedId.value = node.id;
}
</script>

<template>
  <div class="explorer">
    <aside class="left">
      <div class="left-header">Folders</div>
      <div class="left-body">
        <FolderTree
          :tree="tree"
          :selected-id="selectedId"
          :default-expanded-root="true"
          @select="handleSelect"
        />
      </div>
    </aside>

    <section class="right">
      <SubfoldersPanel
        :selected="selectedNode"
        :subfolders="directSubfolders"
        @open="handleOpenOnRight"
      />
    </section>
  </div>
</template>

<style scoped>
.explorer {
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-auto-rows: 100%;
  height: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}
.left {
  border-right: 1px solid #e5e7eb;
  display: grid;
  grid-template-rows: 42px 1fr;
  min-width: 0;
}
.left-header {
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-weight: 600;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}
.left-body {
  overflow: auto;
}
.right {
  min-width: 0;
  overflow: hidden;
}
</style>
