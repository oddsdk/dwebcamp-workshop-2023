// UI State and Controls

export type AvatarsState = {
  selectedArea: Area
}

export const AREAS = [ 'Transmogrify', 'Summon' ] as const
export type Area = typeof AREAS[ number ]