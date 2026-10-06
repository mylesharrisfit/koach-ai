# Photos

Drop a photo here named after a slot and it replaces the blue stand-in on the next build
(`src/lib/photos.js` picks up .jpg, .jpeg, .png, .webp and .avif). Remove the file to go back to blue.

| Slot (file name)        | Where it shows                                   | Suggested size, subject |
| ----------------------- | ------------------------------------------------ | ----------------------- |
| `hero`                  | Home hero, behind the phone and floating cards   | 1200×1100, athlete or coach training, subject centred |
| `cta`                   | Closing "Run your coaching business" band        | 2000×800, subject on the right (left side sits under the headline) |
| `branding`              | White-label preview, behind the phone            | 1200×1200, client using their phone in a gym |
| `workout`               | Workout demo stage (home playground, client-app page) | 1200×1300, someone mid-set |
| `feature-<slug>`        | Blue rows on a feature page (`feature-coaching`, `feature-nutrition`, `feature-client-app`, `feature-check-ins`, `feature-business`, `feature-branding`) | 1200×900 |

Only use photos you have the rights to: your own shoots, or free-licence libraries that allow
commercial use (the Unsplash and Pexels licences do; Unsplash+ images do not). A blue tint is
applied on top so the floating product cards stay readable. Compress to WebP or JPEG under ~300 KB.
