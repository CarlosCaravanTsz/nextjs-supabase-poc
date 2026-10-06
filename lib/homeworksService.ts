import { supabase } from "./supabase";

export type Homework = {
    id: string;
    title: string;
    completed: boolean;
};

export async function getHomeworks(): Promise<Homework[] | null> {
  try {
    
    const { data, error } = await supabase.from("homeworks").select("*").order("created_at", { ascending: true })
    
    if (error) throw error
    return data

  } catch (error) {
    console.error(error)
    return null
    
  }
}


export async function getHomeworkById(id: string): Promise<Homework | null> {
  try {
    const { data, error, status, statusText } = await supabase.from("homeworks").select("*").eq('id', id).maybeSingle()
    
    if (status === 200 || error) {
      console.error(statusText)
      return null
    }
    return data
    
  } catch (error) {
    console.error(error)
    return null
  }

}

export async function getHomeworkByTitle(title: string): Promise<Homework | null> {
  try {
    const { data, error, status, statusText } = await supabase.from("homeworks").select("*").eq('title', title).maybeSingle()

    if (status === 200 || error) {
      console.error(statusText)
      return null
    }
    return data

  } catch (error) {
    console.error(error)
    return null
  }

}


export async function createHomework(title: string): Promise<Homework | null> {
  try {
    const { data, error } = await supabase.from("homeworks").insert({ title }).select().single()
    
    if (error) throw error

    return data
    
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteHomework(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("homeworks").delete().eq("id", id);

    return !error

  } catch (error) {
    console.error(error)
    return false
  }
}

export async function updateHomework(id: string, changes: Partial<Pick<Homework, "title" | "completed">>): Promise<Homework | null> {
  try {
    const { data, error } = await supabase.from("homeworks").update(changes).eq('id', id).select().single()
    
    if (error) return null
    return data
    
  } catch (error) {
    console.error(error)
    return null
  }
}
