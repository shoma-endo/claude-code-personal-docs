import { Readable } from 'stream';
import { createSampleDataZipStream } from '@/lib/sample-data-zip';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const nodeStream = await createSampleDataZipStream();
  const body = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="sample-data.zip"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
