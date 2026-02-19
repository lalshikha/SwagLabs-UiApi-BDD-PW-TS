import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export type VisualCompareOptions = {
  threshold: number;            // pixelmatch sensitivity (0..1)
  maxDiffPixels: number;        // absolute pixel limit
  maxDiffPixelRatio: number;    // ratio limit (0..1)
  maxSizeDiffPixels: number;    // allowed width/height delta
};

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function padToSize(src: PNG, width: number, height: number): PNG {
  const out = new PNG({ width, height });
  PNG.bitblt(src, out, 0, 0, src.width, src.height, 0, 0);
  return out;
}

export async function compareWithBaseline(params: {
  screenshotBuffer: Buffer;
  snapshotFileName: string; // e.g. "pageUnderTest_login.png"
  options: VisualCompareOptions;
}): Promise<void> {
  const { screenshotBuffer, snapshotFileName, options } = params;

  const baseDir = path.join('screenshots', 'visual');
  const baselineDir = path.join(baseDir, 'baseline');
  const actualDir = path.join(baseDir, 'actual');
  const diffDir = path.join(baseDir, 'diff');

  ensureDir(baselineDir);
  ensureDir(actualDir);
  ensureDir(diffDir);

  const baselinePath = path.join(baselineDir, snapshotFileName);
  const actualPath = path.join(actualDir, snapshotFileName);
  const diffPath = path.join(diffDir, snapshotFileName.replace(/\.png$/i, '.diff.png'));

  // Always write actual (helps debugging even when pass)
  fs.writeFileSync(actualPath, screenshotBuffer);

  // If baseline missing: create it only when explicitly requested
  if (!fs.existsSync(baselinePath)) {
    if (process.env.UPDATE_BASELINES === '1') {
      fs.writeFileSync(baselinePath, screenshotBuffer);
      return;
    }
    throw new Error(
      'Baseline missing: ' +
        baselinePath +
        ' (Run with UPDATE_BASELINES=1 once to create baselines)'
    );
  }

  const baselineImg = PNG.sync.read(fs.readFileSync(baselinePath));
  const actualImg = PNG.sync.read(fs.readFileSync(actualPath));

  const widthDiff = Math.abs(baselineImg.width - actualImg.width);
  const heightDiff = Math.abs(baselineImg.height - actualImg.height);

  if (widthDiff > options.maxSizeDiffPixels || heightDiff > options.maxSizeDiffPixels) {
    throw new Error(
      'Screenshot size mismatch. baseline=' +
        baselineImg.width +
        'x' +
        baselineImg.height +
        ' actual=' +
        actualImg.width +
        'x' +
        actualImg.height +
        ' maxSizeDiff=' +
        options.maxSizeDiffPixels
    );
  }

  // Pixelmatch requires same dimensions, so pad smaller image to larger within allowed size diff
  const width = Math.max(baselineImg.width, actualImg.width);
  const height = Math.max(baselineImg.height, actualImg.height);

  const baselinePadded = baselineImg.width === width && baselineImg.height === height ? baselineImg : padToSize(baselineImg, width, height);
  const actualPadded = actualImg.width === width && actualImg.height === height ? actualImg : padToSize(actualImg, width, height);

  const diff = new PNG({ width, height });

  const diffPixels = pixelmatch(
    baselinePadded.data,
    actualPadded.data,
    diff.data,
    width,
    height,
    { threshold: options.threshold }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffPixelRatio = totalPixels === 0 ? 0 : diffPixels / totalPixels;

  // Fail conditions
  const tooManyPixels = diffPixels > options.maxDiffPixels;
  const tooHighRatio = diffPixelRatio > options.maxDiffPixelRatio;

  if (tooManyPixels || tooHighRatio) {
    throw new Error(
      'Visual mismatch for ' +
        snapshotFileName +
        ' | pixels: ' +
        diffPixels +
        ' (allowed maxDiffPixels=' +
        options.maxDiffPixels +
        ')' +
        ' | pixelRatio: ' +
        diffPixelRatio.toFixed(6) +
        ' (allowed maxDiffPixelRatio=' +
        options.maxDiffPixelRatio +
        ')' +
        ' | threshold: ' +
        options.threshold +
        ' | maxSizeDiff: ' +
        options.maxSizeDiffPixels +
        ' | baseline=' +
        baselinePath +
        ' | actual=' +
        actualPath +
        ' | diff=' +
        diffPath
    );
  }
}
