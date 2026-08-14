import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { NextRequest, NextResponse } from "next/server";
import { EBOOK_FILENAME, verifyDownloadToken } from "@/lib/ebook-token";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("t");
  if (!token) {
    return NextResponse.json({ error: "Token requerido." }, { status: 401 });
  }

  const verified = verifyDownloadToken(token);
  if (!verified.ok) {
    return NextResponse.json(
      { error: "Enlace expirado o inválido. Vuelve a pedir el ebook." },
      { status: 401 },
    );
  }

  const filePath = path.join(process.cwd(), "private", EBOOK_FILENAME);
  if (!existsSync(filePath)) {
    console.error("[ebook] PDF no encontrado:", filePath);
    return NextResponse.json({ error: "Archivo no disponible." }, { status: 404 });
  }

  const { size } = statSync(filePath);
  const stream = createReadStream(filePath);
  const webStream = Readable.toWeb(stream) as unknown as ReadableStream;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(size),
      "Content-Disposition": `attachment; filename="${EBOOK_FILENAME}"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
