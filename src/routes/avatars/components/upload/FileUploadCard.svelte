<script lang="ts">
  import { avatarsStore } from '$routes/avatars/stores'
  import { transmogrify } from '$routes/avatars/lib/avatars'
  import FileUploadIcon from '$routes/avatars/components/icons/FileUploadIcon.svelte'

  async function handleFileInput(event: { currentTarget: HTMLInputElement }) {
    const images = await transmogrify(event.currentTarget.files)

    avatarsStore.update(store => ({
      ...store,
      images: [...store.images, ...images]
    }))
  }
</script>

<label
  for="upload-file"
  class="w-64 group btn !p-0 !h-auto flex flex-col justify-center items-center aspect-[22/23] object-cover rounded-lg shadow-orange hover:border-neutral-500 overflow-hidden transition-colors ease-in bg-base-100 border-2 box-content border-neutral cursor-pointer text-neutral-900 bg-gradient-to-r from-orange-300 to-orange-600"
>
  <div class="flex flex-col justify-center items-center pt-5 pb-6">
    <FileUploadIcon />
    <p class="mt-4 mb-2 text-sm">
      <span class="font-bold text-sm">Upload a photo</span>
    </p>
    <p class="text-xxs">SVG, PNG, JPG or GIF</p>
  </div>
  <input
    id="upload-file"
    type="file"
    multiple
    accept="image/*"
    class="hidden"
    on:input={handleFileInput}
  />
</label>
