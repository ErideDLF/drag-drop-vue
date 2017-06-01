<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </section>
    <section>
      <div class="columns box">
        <div class="column">
          <div class="field">
            <label class="label">Name</label>
            <p class="control">
              <input class="input" type="text" placeholder="nombre del zip">
            </p>
          </div>
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary">Submit</button>
            </p>
            <p class="control">
              <button class="button is-link">Cancel</button>
            </p>
          </div>
        </div>
        <div class="column is-three-quarters">
          Second column
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'main-container',
  };
</script>

<style scoped>
</style>
