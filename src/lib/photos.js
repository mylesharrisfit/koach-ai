// Real photography for the blue stages. Drop an image into src/assets/photos/ named after a slot
// (hero.jpg, branding.webp, cta.jpg, workout.jpg, feature-coaching.jpg, ...) and it replaces the blue
// stand-in on the next build. No file, no photo: the blue stage shows as before.
const files = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })

const PHOTOS = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, ''), url]),
)

export const photoUrl = (slot) => PHOTOS[slot] || null
