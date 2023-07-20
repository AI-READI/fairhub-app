<template>
  <div class="column">
    <div class="row">
      <h1 class="not-found">Page Not Found</h1>
      <div class="subitem">We could not find what you were looking for.</div>
      <div class="subitem">
        Please contact the owner of the site that linked you to the original URL and let them know
        their link is broken.
      </div>
    </div>
  </div>
</template>

<style>
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.not-found {
  font-size: 3rem;
  margin-bottom: 2rem;
  margin-top: 5rem;
}
.subitem {
  margin-bottom: 1rem;
}
.row {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
