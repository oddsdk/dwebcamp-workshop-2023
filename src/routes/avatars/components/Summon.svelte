<script lang="ts">
  import { onDestroy } from 'svelte'
  import * as odd from '@oddjs/odd'

  import type { Image } from '$routes/avatars/lib/avatars'
  import { filesystemStore, themeStore } from '$src/stores'
  import { avatarsStore } from '$routes/avatars/stores'
  import AvatarCard from '$routes/avatars/components/summon/AvatarCard.svelte'
  import AvatarModal from '$routes/avatars/components/summon/AvatarModal.svelte'

  let fs: odd.FileSystem
  let cidQuery = ''
  let isModalOpen: boolean
  let selectedImage: Image

  const unsubscribeFileSystemStore = filesystemStore.subscribe(fileSystem => {
    fs = fileSystem
  })

  /**
   * Open the ImageModal and pass it the selected `image` from the gallery
   * @param image
   */
  function setSelectedImage(image: Image) {
    selectedImage = image
  }

  function clearSelectedImage() {
    selectedImage = null
  }

  function addAvatar() {
    // TODO Add avatar by CID from HTTP Gateway
  }

  $: {
    isModalOpen = !!selectedImage
  }

  onDestroy(unsubscribeFileSystemStore)
</script>

<section
  class="min-h-[calc(100vh-190px)] overflow-hidden {$themeStore.selectedTheme ===
  'light'
    ? 'text-gray-800'
    : 'text-gray-200'}"
>
  <div
    class="grid grid-flow-row grid-rows-[2rem_auto] gap-6 w-full min-h-[calc(100vh-190px)] p-6 md:p-8 pb-6"
  >
    <div class="grid grid-flow-col grid-cols-[1fr_4rem] gap-1.5">
      <input
        class="w-full p-1.5 border border-base-content rounded-md outline-orange-200 text-base-content dark:text-base-100"
        type="text"
        placeholder="Enter a CID"
        bind:value={cidQuery}
      />
      <button
        class="rounded-md bg-orange-200 hover:bg-orange-500 text-base-content dark:text-base-100 transition-colors ease-in"
        on:click|preventDefault={addAvatar}
        on:keypress|preventDefault={addAvatar}
      >
        Add
      </button>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:lg:grid-cols-6 gap-4"
    >
      {#each $avatarsStore.images as image}
        <AvatarCard {image} openModal={setSelectedImage} />
      {/each}
    </div>
  </div>

  {#if selectedImage}
    <AvatarModal
      bind:isModalOpen
      image={selectedImage}
      on:close={clearSelectedImage}
    />
  {/if}
</section>
