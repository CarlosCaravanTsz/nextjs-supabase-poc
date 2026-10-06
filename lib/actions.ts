"use server"

import { updateTag } from "next/cache";
import { deleteHomework as deleteHomeworkDB, getHomeworkById, getHomeworkByTitle, updateHomework as updateHomeworkDB } from "./homeworksService";
import { error } from "console";


export async function toggleCompleted(id: string, completed: boolean) {

  const result = await updateHomeworkDB(id, { completed })
  
  if (!result) throw new Error('Homework not found')
  
  updateTag("getHomeworks");
  updateTag("getHomeworkById");
  
  return result

}

export async function updateHomework(id: string, changes: { title: string }) {
  
  const result = await updateHomeworkDB(id, changes)
  
  if (!result) throw new Error('Homework not found')
  
  updateTag("getHomeworks");
  updateTag("getHomeworkById");
  
  return result
}

export async function deleteHomework(id: string) {

  const result = await deleteHomeworkDB(id)

  if (!result) throw new Error('Homework not found')
  
  updateTag("getHomeworks");
  updateTag("getHomeworkById");

  return result

}