<script lang="ts">
  interface Props {
    name: string;
    url?: string;
    size?: number;
  }

  let { name, url, size = 45 }: Props = $props();

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
</script>

<div
  class="avatar"
  style="width: {size}px; height: {size}px; font-size: {size * 0.27}px;"
>
  {#if url}
    <img class="image" src={url} alt={name} width={size} height={size} />
  {:else}
    {getInitials(name)}
  {/if}
</div>

<style>
  .avatar {
    border-radius: 1000px;
    background: linear-gradient(135deg, #c8a24e, #8b6914);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
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
