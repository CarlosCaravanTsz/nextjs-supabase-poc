import { getHomeworks, createHomework, getHomeworkByTitle } from "@/lib/homeworksService";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {

    const title = request.nextUrl.searchParams.get('title'); // ?title=something
    const homeworks = title ? await getHomeworkByTitle(title) : await getHomeworks()
    console.log("homeworks", homeworks)
    return Response.json(homeworks)
  } catch (error) {
    console.error(error)
  }
}


export async function POST(request: NextRequest) {

  const body = await request.json() // obtener el body
  const title = typeof body?.title === 'string' ? body.title.trim() : "";

  if (!title) return Response.json({ error: "El titulo es requerido" }, { status: 400, statusText: "Bad request" })
  
  const homework = await createHomework(title) 

  if (homework) {
    revalidateTag("getHomeworks", { expire: 0 })
    revalidatePath("/")

    return Response.json(homework, { status: 201 })
  }

      return Response.json({ error: 'No se ha creado la tarea' }, { status: 400 });

}
