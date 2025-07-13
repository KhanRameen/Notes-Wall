"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Permanent_Marker } from "next/font/google"
import Link from "next/link"
import { Margarine } from "next/font/google"


const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marker",
})

const margarine = Margarine({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-margarine",
})


type Note = {
  id: number,
  title: string,
  content: string,
}

export default function notesApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/notes.ts").then((res) => (res.json()).then((data) => setNotes(data)).catch(err => (<div>Error Fetching All the Notes</div>)))
  }, [])

  const randomLeftMargin = () => {
    const num = Math.random() * 10;
    return `ml-[${num}]`
  }

  return (
    <div className={`${marker.variable} ${margarine.variable}`} >
      <link
        href="https://fonts.googleapis.com/css2?family=Protest+Revolution&display=swap"
        rel="stylesheet"
      />
      <div className="z-0 w-full h-screen bg-cover bg-center bg-no-repeat fixed">
        <Image src="/wall.jpg" alt="wall" width={2000} height={1000} className="object-contain opacity-40" />
      </div>
      <div className="z-10 flex flex-col w-full relative">
        <h1 className="font-marker text-center my-10 text-7xl text-gray-500">Notes Wall</h1>
        <button className="m-auto w-fit py-2 px-4 bg-amber-300 rounded-[5px] border-2 border-gray-500 font-semibold text-gray-500">Add Note</button>
        <dailogbox className="hidden"> <form>
          <h1>title</h1>
          <input type="text" label="" />
        </form></dailogbox>
        <section className="grid grid-cols-4 gap-3 mt-10 font-margarine mx-5 bg-gray-500 ">
          {notes.map((note) => (
            <div className={`w-fit m-2 p-2 break-all whitespace-normal ${randomLeftMargin()}`}>
              <h1 className="text-lg">{note.title}</h1>
              <p className="text-md">{note.content}</p>
            </div>
          ))}

        </section>
      </div >
    </div >
  )

}


//className={`w-fit m-2 p-2 break-all whitespace-normal ${randomLeftMargin()}`}