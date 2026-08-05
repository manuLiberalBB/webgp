const MIN_CONTRAST_RATIO = 3;

function channelToLinear(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

export function getRelativeLuminance(r: number, g: number, b: number): number {
  const red = channelToLinear(r);
  const green = channelToLinear(g);
  const blue = channelToLinear(b);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function getContrastRatio(luminanceA: number, luminanceB: number): number {
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

function getAverageLuminance(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
): number {
  const { data } = ctx.getImageData(x, y, width, height);
  let sum = 0;
  let opaquePixels = 0;

  for (let index = 0; index < data.length; index += 4) {
    const alpha = data[index + 3];
    if (alpha < 16) continue;

    sum += getRelativeLuminance(data[index], data[index + 1], data[index + 2]);
    opaquePixels += 1;
  }

  return opaquePixels > 0 ? sum / opaquePixels : 0;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

function drawSample(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  sourceX: number,
  sourceY: number,
  sourceWidth: number,
  sourceHeight: number,
  targetSize: number,
): void {
  ctx.clearRect(0, 0, targetSize, targetSize);
  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    targetSize,
    targetSize,
  );
}

/** FeaturedNewsHero overlay: from-black/80 via-black/50 to-black/20 */
export function getFeaturedHeroOverlayStrength(normalizedX: number): number {
  const x = Math.min(Math.max(normalizedX, 0), 1);

  if (x <= 0.5) {
    return 0.8 - (0.3 * x) / 0.5;
  }

  return 0.5 - (0.3 * (x - 0.5)) / 0.5;
}

function applyDarkOverlay(luminance: number, overlayStrength: number): number {
  return luminance * (1 - overlayStrength);
}

export type LogoContrastAnalysis = {
  useWhiteLogo: boolean;
};

export async function analyzeFeaturedHeroLogoContrast(
  coverImageUrl: string,
  logoImageUrl: string,
): Promise<LogoContrastAnalysis> {
  const [coverImage, logoImage] = await Promise.all([
    loadImage(coverImageUrl),
    loadImage(logoImageUrl),
  ]);

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });

  if (!context) {
    return { useWhiteLogo: false };
  }

  const sampleSize = 96;
  canvas.width = sampleSize;
  canvas.height = sampleSize;

  const coverRegion = {
    x: 0,
    y: Math.floor(coverImage.height * 0.55),
    width: Math.max(1, Math.floor(coverImage.width * 0.42)),
    height: Math.max(1, Math.floor(coverImage.height * 0.35)),
  };

  drawSample(
    context,
    coverImage,
    coverRegion.x,
    coverRegion.y,
    coverRegion.width,
    coverRegion.height,
    sampleSize,
  );

  const rawBackgroundLuminance = getAverageLuminance(
    context,
    0,
    0,
    sampleSize,
    sampleSize,
  );
  const overlayStrength = getFeaturedHeroOverlayStrength(0.18);
  const backgroundLuminance = applyDarkOverlay(
    rawBackgroundLuminance,
    overlayStrength,
  );

  const logoSampleSize = 64;
  canvas.width = logoSampleSize;
  canvas.height = logoSampleSize;
  drawSample(context, logoImage, 0, 0, logoImage.width, logoImage.height, logoSampleSize);

  const logoLuminance = getAverageLuminance(context, 0, 0, logoSampleSize, logoSampleSize);
  const contrastRatio = getContrastRatio(logoLuminance, backgroundLuminance);
  const useWhiteLogo =
    contrastRatio < MIN_CONTRAST_RATIO && backgroundLuminance <= logoLuminance;

  return { useWhiteLogo };
}
