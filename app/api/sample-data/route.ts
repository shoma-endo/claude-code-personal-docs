import { Readable } from 'stream';
import { createSampleDataZipStream } from '@/lib/sample-data-zip';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ダウンロード時のファイル名。日本語名を UTF-8（RFC 5987）で渡しつつ、
// 古いクライアント向けに ASCII フォールバック名も併記する。
const DOWNLOAD_FILENAME = '講義サンプル.zip';
const DOWNLOAD_FILENAME_ASCII = 'sample-data.zip';

export async function GET() {
  const nodeStream = await createSampleDataZipStream();
  const body = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  const contentDisposition =
    `attachment; filename="${DOWNLOAD_FILENAME_ASCII}"; ` +
    `filename*=UTF-8''${encodeURIComponent(DOWNLOAD_FILENAME)}`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': contentDisposition,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
