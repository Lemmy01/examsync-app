<script>
import SidebarLink from './SidebarLink.vue'


export default {
  props: {},
  components: { SidebarLink },
  setup() {
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span>Vue Sidebar</span>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>


   
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}


.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>