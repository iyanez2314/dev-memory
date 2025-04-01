import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { findUser } from "@/app/actions";

export async function GET(request: NextRequest) {
  try {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const accessToken = await findUser(userId);

    if (!accessToken) {
      return NextResponse.json(
        { error: "GitHub token not found" },
        { status: 401 },
      );
    }

    const githubRes = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${accessToken?.githubToken}`,
      },
    });

    const data = await githubRes.json();

    console.log("GitHub repositories:", data);
    return NextResponse.json({ data: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
