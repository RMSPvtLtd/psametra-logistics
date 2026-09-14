import sharp from "sharp";
import { join } from "node:path";

// Preserve the complete original artwork, aspect ratio, alpha, and existing glow; only resample and encode.
const brandDirectory = join(process.cwd(), "public", "brand");
const renderWidth = 378; // Three times the reserved 126 CSS-pixel logo width.
for (const variant of ["dark", "light"]) {
  await sharp(join(brandDirectory, `psametra-logo-${variant}.png`))
    .resize({ width: renderWidth })
    .webp({ lossless: true })
    .toFile(join(brandDirectory, `psametra-logo-${variant}.webp`));
}
await sharp(join(brandDirectory, "psametra-logo-dark.png"))
  .resize({ width: 192 })
  .png()
  .toFile(join(process.cwd(), "src", "app", "icon.png"));
