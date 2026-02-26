<script setup lang="ts">
interface Props {
  name: string;
  url?: string;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), { size: 45 });

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
</script>

<template>
  <div
    class="avatar"
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${props.size * 0.27}px`,
    }"
  >
    <img v-if="props.url" class="image" :src="props.url" :alt="props.name" />
    <template v-else>{{ getInitials(props.name) }}</template>
  </div>
</template>

<style scoped>
.avatar {
  border-radius: 1000px;
  background: linear-gradient(135deg, #c8a24e, #8b6914);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #ffffff;
  overflow: hidden;
  flex-shrink: 0;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
</style>
