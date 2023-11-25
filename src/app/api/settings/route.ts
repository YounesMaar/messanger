import getCurrentUser from "@/action/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    const { name, image } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    console.log(error, "ERROR_SETTING");
    return new NextResponse("Internal error", { status: 500 });
  }
}
