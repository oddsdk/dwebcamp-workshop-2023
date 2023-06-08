<script lang="ts">
  import { onDestroy } from 'svelte'
  import * as odd from '@oddjs/odd'

  import { filesystemStore, themeStore } from '$src/stores'
  import { avatarsStore } from '$routes/avatars/stores'
  import AvatarCard from '$routes/avatars/components/summon/AvatarCard.svelte'

  let fs: odd.FileSystem

  const unsubscribeFileSystemStore = filesystemStore.subscribe(fileSystem => {
    fs = fileSystem
  })

  onDestroy(unsubscribeFileSystemStore)
</script>

<section
  class="min-h-[calc(100vh-190px)] overflow-hidden {$themeStore.selectedTheme ===
  'light'
    ? 'text-gray-800'
    : 'text-gray-200'}"
>
  <div class="pt-8 p-6 md:p-8 mx-auto">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:lg:grid-cols-6 gap-4"
    >
      {#each $avatarsStore.images as image}
        <AvatarCard {image} />
      {/each}
    </div>
  </div>
</section>
