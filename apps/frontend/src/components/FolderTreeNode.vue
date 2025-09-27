<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { FolderNode, Id } from "@/types/folder";

type Props = {
  node: FolderNode;
  depth?: number;
  selectedId?: Id | null;
  defaultExpanded?: boolean;
};
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "select", node: FolderNode): void;
}>();

const depth = computed(() => props.depth ?? 0);
const isSelected = computed(() => props.selectedId === props.node.id);

const expanded = ref<boolean>(props.defaultExpanded ?? false);

watch(
  () => props.selectedId,
  (id) => {
    if (id === props.node.id && !expanded.value) expanded.value = true;
  }
);

function onToggle() {
  expanded.value = !expanded.value;
}
function onSelect() {
  emit("select", props.node);
}

const hasChildren = computed(() => (props.node.children?.length ?? 0) > 0);
</script>

<template>
  <div class="tree-node">
    <div
      class="row"
      :class="{ selected: isSelected }"
      :style="{ paddingLeft: `${depth * 16 + 8}px` }"
    >
      <button
        class="caret"
        v-if="hasChildren"
        @click.stop="onToggle"
        :aria-label="expanded ? 'Collapse' : 'Expand'"
        :title="expanded ? 'Collapse' : 'Expand'"
      >
        <span class="caret-icon" :class="{ open: expanded }">▸</span>
      </button>
      <span v-else class="caret placeholder" />
      <button class="label" @click="onSelect">
        <span class="folder-icon">📁</span>
        <span class="name">{{ node.name }}</span>
      </button>
    </div>

    <div v-show="expanded" class="children">
      <FolderTreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        :selected-id="selectedId"
        @select="emit('select', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  border-radius: 6px;
  user-select: none;
}
.row:hover {
  background: #f5f7fb;
}
.selected {
  background: #e8f0ff;
  outline: 1px solid #cfe0ff;
}
.caret {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.caret.placeholder {
  visibility: hidden;
}
.caret-icon {
  display: inline-block;
  transition: transform 0.12s ease-in-out;
}
.caret-icon.open {
  transform: rotate(90deg);
}
.label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  padding: 2px 6px 2px 2px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}
.folder-icon {
  width: 18px;
}
.children {
  margin-top: 2px;
}
.name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
