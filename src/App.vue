<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html {
    height: 75%;
    box-sizing: border-box;
  }

  body {
    position: relative;
    margin: 1rem;
    padding-bottom: 11rem;
    min-height: 100%;
    font-family: "Helvetica Neue", Arial, sans-serif;
    background-color: #f8f1da;
  }

  /* Formatting for the list */
  ul {
    list-style: none;
  }

  li {
    background: #bbbbbb;
    width: 500px;
    min-height: 30px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 1em;
    display: flex;
    align-items: center;
  }

  label {
    width: 400px;
  }

  /* Form */

  input[type=text] {
    font-size: 1em;
    padding: .5em;
  }

  select{
    font-size: 1em;
  }

  button {
    font-size: 1em;
    background: #5c9eff;
    padding: .5em;
  }

  /* Controls */

  .controls {
    margin-top: 20px;
  }

  footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background-color: #cccccc;

  }
</style>
