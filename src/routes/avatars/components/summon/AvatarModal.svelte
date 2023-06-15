<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import clipboardCopy from 'clipboard-copy'

  import { ipfsGatewayUrl } from '$lib/app-info';
  import { avatarsStore } from '$routes/avatars/stores'
  import { type AvatarsState, type Image } from '$routes/avatars/lib/avatars'
  import Download from '$components/icons/Download.svelte'
  import Trash from '$components/icons/Trash.svelte'

  export let image: Image
  export let isModalOpen: boolean

  let avatarsState: AvatarsState
  let previousImage: Image | undefined
  let nextImage: Image | undefined
  let showPreviousArrow: boolean
  let showNextArrow: boolean

  const dispatch = createEventDispatcher()

  const unsubcribe = avatarsStore.subscribe(newState => { 
    avatarsState = newState 
    console.log('avatar state', avatarsState)
  })


  /**
   * Close the modal, clear the image state vars, set `isModalOpen` to false
   * and dispatch the close event to clear the image from the parent's state
   */
  const handleCloseModal: () => void = () => {
    image = null
    previousImage = null
    nextImage = null
    isModalOpen = false

    dispatch('close')
  }

  /**
   * Delete an image from the user's WNFS
   */
  const handleDeleteImage: () => Promise<void> = async () => {
    // TODO Add delete image
    // await deleteImageFromWNFS(image.name)
    // handleCloseModal()
  }

  /**
   * Set the previous and next images to be toggled to when the arrows are clicked
   */
  const setCarouselState = () => {
    const imageList = avatarsState.images

    // TODO Change index to use CID?
    const currentIndex = imageList.findIndex(val => val.name === image.name)
    previousImage =
      imageList[currentIndex - 1] ?? imageList[imageList.length - 1]
    nextImage = imageList[currentIndex + 1] ?? imageList[0]

    showPreviousArrow = imageList.length > 1 && !!previousImage
    showNextArrow = imageList.length > 1 && !!nextImage
  }

  /**
   * Load the correct image when a user clicks the Next or Previous arrows
   * @param direction
   */
  const handleNextOrPrevImage: (
    direction: 'next' | 'prev'
  ) => void = direction => {
    image = direction === 'prev' ? previousImage : nextImage
    setCarouselState()
  }

  /**
   * Detect `Escape` key presses to close the modal or `ArrowRight`/`ArrowLeft`
   * presses to navigate the carousel
   * @param event
   */
  const handleKeyDown: (event: KeyboardEvent) => void = event => {
    if (event.key === 'Escape') handleCloseModal()

    if (showNextArrow && event.key === 'ArrowRight')
      handleNextOrPrevImage('next')

    if (showPreviousArrow && event.key === 'ArrowLeft')
      handleNextOrPrevImage('prev')
  }

  async function copyCID() {
    // TODO Use image CID
    await clipboardCopy('bafybeiaspzsbvh4je62wtrcl55l36u7qk47ttzrt7asazhxeyipqh4hsuq')
  }

  onMount(() => {
    setCarouselState()
  })

  // Unsubscribe from avatarsStore updates
  onDestroy(unsubcribe)
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if !!image}
  <input
    type="checkbox"
    id={`image-modal-${image.name}`}
    class="modal-toggle"
    bind:checked={isModalOpen}
  />
  <label
    for={`image-modal-${image.name}`}
    class="modal cursor-pointer z-50"
    on:click|self={handleCloseModal}
    on:keypress|self={handleCloseModal}
  >
    <div class="modal-box relative text-center text-base-content">
      <label
        for={`image-modal-${image.name}`}
        class="btn btn-xs btn-circle absolute right-2 top-2"
        on:click|self={handleCloseModal}
        on:keypress|self={handleCloseModal}
      >
        ✕
      </label>
      <div>
        <h3 class="mb-7 text-body-lg break-all">{image.name}</h3>

        <div class="relative">
          {#if showPreviousArrow}
            <button
              class="absolute top-1/2 -left-[25px] -translate-y-1/2 inline-block text-center text-[40px]"
              on:click={() => handleNextOrPrevImage('prev')}
            >
              &#8249;
            </button>
          {/if}
          <img
            class="block object-cover object-center border-2 border-base-content w-full h-full mb-4 rounded-[1rem]"
            alt={`Image: ${image.name}`}
            src={image.src}
          />
          {#if showNextArrow}
            <button
              class="absolute top-1/2 -right-[25px] -translate-y-1/2 inline-block text-center text-[40px]"
              on:click={() => handleNextOrPrevImage('next')}
            >
              &#8250;
            </button>
          {/if}
        </div>
        <div class="flex flex-col items-center justify-center">
          <!-- TODO Use CID for image -->
          <a
            href={`https://ipfs.${ipfsGatewayUrl}/ipfs/bafybeiaspzsbvh4je62wtrcl55l36u7qk47ttzrt7asazhxeyipqh4hsuq/userland`}
            target="_blank"
            class="underline mb-2 hover:text-neutral-500"
          >
            View on IPFS
          </a>

          <button class="btn mb-2 hover:text-neutral-500" on:click={copyCID}>
            Copy CID
          </button>

          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4"
          >
            <a
              href={image.src}
              download={image.name}
              class="btn btn-primary gap-2"
            >
              <Download /> Download Image
            </a>
            <button class="btn btn-outline gap-2" on:click={handleDeleteImage}>
              <Trash /> Delete Image
            </button>
          </div>
        </div>
      </div>
    </div>
  </label>
{/if}
