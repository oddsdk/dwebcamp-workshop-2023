import { avatarsStore } from '$routes/avatars/stores'

export type Image = {
  // cid: string
  // ctime: number
  name: string
  // private: boolean
  // size: number
  src: string
}

// Image processing

/**
 * Handle uploads made by interacting with the file input directly
 */
export const handleFileInput: (
  files: FileList
) => Promise<void> = async files => {
  await Promise.all(
    Array.from(files).map(async file => {
      console.log('file', file)

      const src = await toBase64(file)
      const image = { name: file.name, src }

      avatarsStore.update(store => ({ ...store, images: [ ...store.images, image ] }))
    })
  )

}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}


// UI State and Controls

export type AvatarsState = {
  selectedArea: Area
  images: Image[]
}

export const AREAS = [ 'Transmogrify', 'Summon' ] as const
export type Area = typeof AREAS[ number ]