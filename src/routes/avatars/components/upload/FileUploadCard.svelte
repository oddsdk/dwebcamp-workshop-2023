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
  class="btn btn-primary !p-0 !h-40 flex flex-col justify-center items-center aspect-[22/23] object-cover overflow-hidden transition-colors ease-in  box-content cursor-pointer"
>
  <div class="flex flex-col justify-center items-center pt-5 pb-6">
    <FileUploadIcon />
    <span class="mt-2 font-bold text-body-sm">Upload a photo</span>
    <p class="text-body-xs">SVG, PNG, JPG or GIF</p>
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
