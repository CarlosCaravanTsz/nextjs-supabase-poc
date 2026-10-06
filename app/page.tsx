"use client"

import { type Homework } from "@/lib/homeworksService";
import { useState, useTransition, useEffect } from "react";

export default function Home() {

  const [searchText, setSearchText] = useState("")
  const [homeworks, setHomeworks] = useState<Homework[]>([])

  const [isPending, startSearchTransition] = useTransition()


  //TODO: Mejorar a patron de NextJS 13 con server actions y server components, para que no se haga fetch en el cliente, sino en el servidor y se revalide la cache de manera correcta.
  
  //TODO: Componetizar

  // TODO: Por cada homework, agregar boton de eliminar, editar y completar, y que se haga fetch a la api para actualizar la lista de homeworks en el cliente, y que se revalide la cache del servidor para que se actualice la lista de homeworks en el servidor.
  
  useEffect(() => {
    const fetchHomeworks = async () => {
      const response = await fetch(`/api/homeworks?title=${searchText}`)
      const data: Homework[] = await response.json()
      setHomeworks(data)
    }

    fetchHomeworks()
  }, [searchText])

  // const refreshResults = async () => {
  //   const response = await fetch(`/api/homeworks?title=${searchText}`)
  //   console.log("homeworks", homeworks)
  //   console.log("response", response)
  //   const data: Homework[] = await response.json()
  //   setHomeworks(data)
  // }

  // const handleSearchClick = () => {
  //   startSearchTransition( async () => await refreshResults())
  // }



  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-center bg-white dark:bg-black">
        <div>
          <div>
            <input
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-black shadow-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-sky-900"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="cursor-pointer rounded-lg bg-sky-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
              disabled={!searchText.length}
              
            >
              Buscar
            </button>
          </div>
          <div>
            {homeworks.map(homework => <p key={homework.id} >{homework.title}</p>) }
          </div>
        </div>
      </main>
    </div>
  );
}
