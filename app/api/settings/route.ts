import { NextRequest, NextResponse } from "next/server";
import { SettingsService } from "@/lib/services/settingsService";

/**
 * GET /api/settings
 * Returns the current site theme settings.
 */
export async function GET() {
  try {
    const settings = await SettingsService.getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("[API Settings] GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings
 * Updates site theme settings (partial updates supported).
 * Body: { primaryColor?, secondaryColor?, backgroundColor?, textColor?, fontFamily? }
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate that at least one valid field is provided
    const validFields = ["primaryColor", "secondaryColor", "backgroundColor", "textColor", "fontFamily"];
    const updates: Record<string, string> = {};

    for (const field of validFields) {
      if (body[field] && typeof body[field] === "string") {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided. Valid fields: " + validFields.join(", ") },
        { status: 400 }
      );
    }

    const settings = await SettingsService.updateSettings(updates);
    return NextResponse.json(settings);
  } catch (error) {
    console.error("[API Settings] PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
