<script lang="ts">
  import { onDestroy } from 'svelte'
  import * as odd from '@oddjs/odd'
  import FileUploadCard from '$routes/avatars/components/upload/FileUploadCard.svelte'

  import { filesystemStore, themeStore } from '$src/stores'

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
  <div
    class="grid grid-flow-row grid-rows-[6rem_auto] gap-6 w-full min-h-[calc(100vh-190px)] p-6 md:p-8 pb-6"
  >
    <FileUploadCard />
  </div>
</section>
