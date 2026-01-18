<script setup lang="ts">
interface Props {
  label: string
  icon: string
  activeIcon?: string
  type: "a" | "menu" | "default"
  to?: string
  items?: Props[]
  callback?: () => void
}

// TODO(移动端适配): 添加展开方向属性, 目前只支持环形展开, 后续添加向下展开; 添加 slot

const props = defineProps<Props>()

const itemsCount = props.items ? props.items.length : 0
const isActived = ref(false)

const handleClick = () => {
  switch (props.type) {
    case "a":
      window.open(props.to, "_blank")
      break
    case "default":
      if (props.callback) props.callback()
      break
    case "menu":
      handleMenuToggle()
      break
    default:
      console.error(props.to)
  }
}

const handleMenuToggle = () => {
  isActived.value = !isActived.value
}
</script>

<template>
  <div
    class="container"
    :class="{ active: isActived }"
    @click="handleClick"
  >
    <Icon :name="activeIcon && isActived ? activeIcon : icon" />
    <template v-if="props.type === 'menu'">
      <BaseMenuButton
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :icon="item.icon"
        :type="item.to ? 'a' : item.type"
        :to="item.to"
        :items="item.items"
        :callback="item.callback"
        class="item"
        :style="{
          '--angle': `${(90 / (itemsCount - 1)) * index}deg`,
          '--delay': `${isActived ? index * 0.05 : (itemsCount - index) * 0.05}s`,
        }"
        :class="{ expand: isActived }"
      />
    </template>
    <div
      class="content"
      :style="{ '--width': `${props.label.length}rem` }"
      :class="{ disabled: isActived }"
    >
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--rounded-full);
  background-color: var(--bg-button);
  font-size: 1.5rem;
  transition: background-color var(--duration) ease;
  cursor: pointer;

  .active,
  :hover {
    background-color: var(--bg-button-hover);
  }

  :active {
    background-color: var(--bg-button-active);
    transform: scale(0.9);
    transition: transform var(--duration) ease;
  }
}

.item {
  --angle: 0deg;
  --radius: 0rem;
  --delay: 0s;

  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  transform: translate(-50%, -50%) scale(0);
  transition: transform var(--duration) ease var(--delay);

  & .content {
    --radius: 2rem;

    transform: translate(
      calc(-100% - var(--radius) * cos(var(--angle))),
      calc(-50% + var(--radius) * sin(var(--angle)))
    );
  }

  &.expand {
    --radius: 4rem;
    transform: translate(
      calc(-50% - var(--radius) * cos(var(--angle))),
      calc(-50% + var(--radius) * sin(var(--angle)))
    );
  }
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  font-size: 1rem;
  transform: translate(calc(-100% - 2rem), -50%);
  pointer-events: none;
  transition: width var(--duration) ease;
}

.container:hover > .content:not(.disabled) {
  --width: 0rem;
  width: var(--width);
}
</style>
