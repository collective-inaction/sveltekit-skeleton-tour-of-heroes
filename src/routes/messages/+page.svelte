<script lang="ts">
  import { messages } from "$lib/stores/messages";
  // Function to clear messages
  function clearMessages() {
    messages.set([]);
  }
</script>

<div>
  <h2>Messages</h2>
  <button type="button" class="clear" on:click={clearMessages}
    >Clear messages</button
  >
  {#each $messages as message (message)}
    <div>{message}</div>
  {/each}
</div>
