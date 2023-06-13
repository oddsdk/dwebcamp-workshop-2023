import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import { Canvg, presets } from 'canvg'
import type { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection'

import { addNotification } from '$lib/notifications'

export type Image = {
  // cid: string
  // ctime: number
  name: string
  // private: boolean
  // size: number
  src: string
}

// Image processing

let detector: FaceLandmarksDetector

async function initializeModel() {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
  const detectorConfig = {
    runtime: 'tfjs' as const,
    refineLandmarks: true
  }
  detector = await faceLandmarksDetection.createDetector(model, detectorConfig)
}

initializeModel().catch(err => console.log('Could not initialize face landmark model', err))


/**
 * Handle uploads made by interacting with the file input directly
 */
export const transmogrify: (
  files: FileList
) => Promise<Image[] | null> = async files => {
  const images = await Promise.all(
    Array.from(files).map(async file => {
      console.log('file', file)

      // Draw image
      const imageBitmap = await createImageBitmap(file)
      const offscreen = new OffscreenCanvas(imageBitmap.width, imageBitmap.height)
      const ctx = offscreen.getContext('2d')
      ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height)

      // Estimate eye placement in image
      const imageData = ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height)
      const estimatedEyes = await estimateEyes(imageData)

      if (estimatedEyes) {
        // Prepare ODD eye and draw it left and right
        const eyeBlob = await prepareEye(estimatedEyes.oddWidth, estimatedEyes.oddHeight)
        const eyeBitmap = await createImageBitmap(eyeBlob)
        ctx.drawImage(eyeBitmap, estimatedEyes.leftEye.dx, estimatedEyes.leftEye.dy, estimatedEyes.oddWidth, estimatedEyes.oddHeight)
        ctx.drawImage(eyeBitmap, estimatedEyes.rightEye.dx, estimatedEyes.rightEye.dy, estimatedEyes.oddWidth, estimatedEyes.oddHeight)

        // Convert image to base64
        const blob = await offscreen.convertToBlob()
        const src = await toBase64(blob)

        addNotification(`Image ${file.name} transmogrified and available for summoning.`, 'success')

        return { name: file.name, src }
      } else {
        addNotification(`Could not detect a face in ${file.name}. Please try again.`)

        return null
      }
    })
  )

  return images.filter(image => image !== null)
}

type EyeEstimates = {
  leftEye: { dx: number; dy: number }
  rightEye: { dx: number; dy: number }
  oddWidth: number
  oddHeight: number
}

/**
 * Estimate eye placements and calculate target width and height
 * based on the widest eye.
 *
 * @param imageData 
 * @returns EyeEstimates
 */
async function estimateEyes(imageData: ImageData): Promise<EyeEstimates> {
  // Finds one face if any
  const faces = await detector.estimateFaces(imageData)

  if (faces.length === 1) {
    const leftEye = faces[ 0 ].keypoints.filter(keypoint => keypoint.name === 'leftEye')
    const rightEye = faces[ 0 ].keypoints.filter(keypoint => keypoint.name === 'rightEye')

    const scalingFactor = 2.5

    const { width, height } = getOddDimensions({ left: leftEye, right: rightEye }, scalingFactor)
    const xTranslate = width / (scalingFactor * 1.5)
    const leftYTranslate = getYTranslation(width, leftEye)
    const rightYTranslate = getYTranslation(width, rightEye)

    return {
      leftEye: {
        dx: Math.min(...leftEye.map(keypoint => keypoint.x)) - xTranslate,
        dy: Math.min(...leftEye.map(keypoint => keypoint.y)) - leftYTranslate,
      },
      rightEye: {
        dx: Math.min(...rightEye.map(keypoint => keypoint.x)) - xTranslate,
        dy: Math.min(...rightEye.map(keypoint => keypoint.y)) - rightYTranslate,
      },
      oddWidth: width,
      oddHeight: height,
    }
  } else {
    return null
  }
}

/**
 * Get ODD eye dimensions
 *
 * @param keypoints Detected eye keypoints
 * @returns ODD eye width and height
 */
function getOddDimensions(keypoints: {
  left: faceLandmarksDetection.Keypoint[]
  right: faceLandmarksDetection.Keypoint[]
}, scaleFactor: number
): { width: number; height: number } {
  const leftWidth = getWidth(keypoints.left)
  const rightWidth = getWidth(keypoints.right)
  const width = leftWidth > rightWidth ? leftWidth * scaleFactor : rightWidth * scaleFactor

  // ODD eye is wider than it is tall
  const height = width / 0.97

  return { width, height }
}

/**
 * Prepare ODD eye
 *
 * @param width target width
 * @param height target height
 * @returns ODD eye as a blob
 */
async function prepareEye(width: number, height: number): Promise<Blob> {
  const preset = presets.offscreen()
  const canvas = new OffscreenCanvas(0, 0)
  const ctx = canvas.getContext('2d')

  const v = await Canvg.from(ctx, '../eye.svg', preset)
  v.resize(width, height)
  await v.render()

  return await canvas.convertToBlob()
}

/**
 * Calculate Y offset over actual eye.
 * 
 * The ODD eye is rounder and taller than actual eyes. We often need
 * to translate it up on the actual eye.
 * 
 * @param oddWidth width of the ODD eye
 * @param keypoints actual eye keypoints
 * @returns 
 */
function getYTranslation(oddWidth: number, keypoints: faceLandmarksDetection.Keypoint[]): number {
  const height = getHeight(keypoints)

  return oddWidth - height > 0 ? (oddWidth - height) / 2 : 0
}


// Utils

function getWidth(keypoints: faceLandmarksDetection.Keypoint[]): number {
  return Math.max(...keypoints.map(keypoint => keypoint.x)) - Math.min(...keypoints.map(keypoint => keypoint.x))
}

function getHeight(keypoints: faceLandmarksDetection.Keypoint[]): number {
  return Math.max(...keypoints.map(keypoint => keypoint.y)) - Math.min(...keypoints.map(keypoint => keypoint.y))
}

function toBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
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