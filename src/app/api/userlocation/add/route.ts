import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "@/actions/user";
import { PostUserLocations } from "@/data/users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const locationId = typeof body.id === "string" ? body.id : null;
    const requestedAchievedAt = body.achievedAt
      ? new Date(body.achievedAt)
      : null;
    const achievedAt =
      requestedAchievedAt && !Number.isNaN(requestedAchievedAt.getTime())
        ? requestedAchievedAt
        : new Date();

    const user = await GetUser().catch(() => null);

    if (user?.id && locationId) {
      await PostUserLocations({
        items: [{ id: locationId, achievedAt }],
        user: user.id,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "User not found or invalid location id" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
