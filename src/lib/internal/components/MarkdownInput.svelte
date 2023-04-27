<script lang="ts">
	import type { Carta } from "../carta";
  import hljs from 'highlight.js';

  export let carta: Carta;
  export let value = "";
  export let theme: string;

  let highlighted: string;
  $: {
    highlighted = hljs.highlight(value, { language: 'md' }).value;
    console.log(highlighted)
  }

  let textarea: HTMLTextAreaElement;
  const focus = () => {
    // Allow text selection
    const selectedText = window.getSelection()?.toString();
    if (selectedText) return;

    textarea.focus();
  };
  const resize = () => {
    textarea.style.height = textarea.scrollHeight + "px";
  };
</script>

<div
  on:click={focus}
  on:keydown={focus}
  class="carta-input carta-input__{theme}"
>
  <pre class="hljs" aria-hidden="true">{@html highlighted}</pre>

  <textarea
    name="md"
    id="md"
    bind:value
    bind:this={textarea}
    on:input={resize}
    spellcheck=false
  />
</div>

<style>
  .carta-input {
    position: relative;
    width: 50%;
  }

  textarea {
    position: relative;
    width: 100%;
    min-height: 600px;

    overflow-y: hidden;
    resize: none;
    
    padding: 0;
    margin: 0;
    border: 0;

    color: transparent;
    background: transparent;

    font-size: inherit;
    font-family: inherit;

    outline: none;
  }

  pre {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0;
    user-select: none;

    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-word;

    font-family: inherit;
  }
</style>