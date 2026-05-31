import archiver from 'archiver';
import { join } from 'path';
import { PassThrough, type Readable } from 'stream';

/** 講義用 sample-data（ZIP の元フォルダ） */
export const SAMPLE_DATA_DIR = join(
  process.cwd(),
  'docs/training/claude-code-personal/sample-data',
);

/** 配布 ZIP に含めないパス（リポジトリ内の重複ツリー） */
const ZIP_IGNORE = ['claude-code-personal/**'];

/**
 * sample-data フォルダを ZIP 化した Readable ストリームを返す。
 * ZIP 内のルートは `講義サンプル/`（解凍後にそのフォルダを開く想定）。
 * 配布物の名前（`sample-data.zip`）とリポジトリ内パスは ASCII のまま。
 */
export function createSampleDataZipStream(): Promise<Readable> {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = new PassThrough();

    archive.on('error', reject);
    output.on('error', reject);
    archive.on('end', () => resolve(output));

    archive.pipe(output);

    archive.glob('**/*', {
      cwd: SAMPLE_DATA_DIR,
      dot: true,
      ignore: ZIP_IGNORE,
    }, { prefix: '講義サンプル/' });

    archive.finalize();
  });
}
