// Manufacturing desk data, shared by the floor check (04) and the formats grid (06).

export const INDUSTRIES = [
  'Supplements & nutraceuticals',
  'Skincare',
  'Haircare',
  'Cosmetics',
  'Personal care',
  'Food & beverage',
  'Pet care',
]

// Each industry chip carries this id, so a link can land on its own chip.
export const indId = (name: string) =>
  `ind-${name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')}`

export const FORMATS = [
  'Capsules & tablets',
  'Gummies & soft chews',
  'Powders & blends',
  'Liquids & serums',
  'Creams & lotions',
  'Drinks & shots',
] as const
export type Format = typeof FORMATS[number]
