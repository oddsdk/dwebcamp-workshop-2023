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
  class="min-h-[calc(100vh-190px)] overflow-hidden"
>
  
    <FileUploadCard />
  
</section>
