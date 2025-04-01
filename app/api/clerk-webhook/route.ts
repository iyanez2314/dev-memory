import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const rawBody = await request.text();

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (error) {
    console.error("Failed to parse webhook payload:", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Handle different event types
  const { type, data } = event;

  switch (type) {
    case "user.created":
      await prisma.user.create({
        data: {
          id: data.id,
          companyId: data.primaryOrganizationId || null,
        },
      });
      break;

    case "organization.created":
      const createdBy = data.created_by || null;
      console.log("Creating company with createdBy:", createdBy);

      if (!createdBy) {
        console.error("No createdBy found");
        return NextResponse.json(
          { error: "No createdBy found" },
          { status: 400 },
        );
      }

      let foundUser = await prisma.user.findFirst({
        where: { id: createdBy },
      });

      if (!foundUser) {
        foundUser = await prisma.user.create({
          data: {
            id: createdBy,
            companyId: data.id,
          },
        });
        console.log("Created user:", foundUser.id);
      }

      const createdCompany = await prisma.company.create({
        data: {
          id: data.id,
          users: {
            connect: { id: foundUser.id },
          },
        },
      });
      console.log("Created company:", createdCompany.id);

      await prisma.user.update({
        where: { id: foundUser.id },
        data: { companyId: createdCompany.id },
      });

      return NextResponse.json({ success: true }, { status: 200 });
    default:
      console.log(`Unhandled event type: ${type}`);
  }

  return NextResponse.json({ received: true });
}
