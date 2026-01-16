<script setup lang="ts">
interface Button {
  key: string
  label: string
  icon: string
  type: "a" | "menu" | "default"
}

interface AButtonProps extends Button {
  type: "a"
  to: string
}

interface MenuButtonProps extends Button {
  type: "menu"
  items: Button[]
}

interface DefaultButtonProps extends Button {
  type: "default"
  callback?: () => void
}

type Props = AButtonProps | MenuButtonProps | DefaultButtonProps

const props = defineProps<Props>()

const handleClick = () => {
  if (props.type === "a") {
    window.open(props.to, "_blank")
  }
  else if (props.type === "menu") {
    // Emit an event to open the menu
    // This is a placeholder, actual implementation may vary
    console.log("Open menu with items:", props.items)
  }
  else {
    console.log("Open menu with items:", props)
  }
}
</script>

<template>
  <div
    class="container"
    @click="handleClick"
  >
    <Icon :name="icon" />
  </div>
</template>

<style scoped>
.container {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--bg-card);
  font-size: 1.5rem;
}
</style>
