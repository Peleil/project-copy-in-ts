<template>
  <section>List</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <RouterLink to="/register">Register as Coach</RouterLink>
    </div>
    <ul>
      List of Coaches
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
