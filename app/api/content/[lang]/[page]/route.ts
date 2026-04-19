import { NextRequest, NextResponse } from "next/server";
import { ContentService } from "@/lib/services/contentService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string; page: string }> }
) {
  try {
    const { lang, page } = await params;

    if (!lang || !page) {
      return NextResponse.json(
        { error: "Language and Page are required" },
        { status: 400 }
      );
    }

    const content = await ContentService.getContent(page, lang);

    if (!content) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("[API Content] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string; page: string }> }
) {
  try {
    const { lang, page } = await params;
    const body = await request.json();
    const { path, value } = body;

    if (!lang || !page || !path || value === undefined) {
      return NextResponse.json({ error: "Language, page, path, and value are required" }, { status: 400 });
    }

    // 1. Retrieve current contents to mutate (it will auto-seed if empty thanks to ContentService!)
    const content = await ContentService.getContent(page, lang);
    
    if (!content) {
      return NextResponse.json({ error: "Content not found or could not be seeded." }, { status: 404 });
    }

    // 2. Deep traverse and set the new value targeting specific nested JSON attributes
    // Example: path = 'booking.whereLabel'
    const sections = { ...(content.sections as any) };
    const keys = path.split('.');
    let current = sections;

    for (let i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]] === undefined) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;

    // 3. Save back overriding via upsert inside ContentService to hit Prisma and wipe Upstash
    const updatedContent = await ContentService.updateContent(page, lang, sections);

    return NextResponse.json({ success: true, sections: updatedContent.sections });
  } catch (error) {
    console.error("[API Content PUT] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
