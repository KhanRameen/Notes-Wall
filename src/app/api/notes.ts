import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//controller
export default async function notesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //fetch all notes from db - no need to import
    const notes = await prisma.note.findMany();
    res.status(200).json(notes);
  } else if (req.method === "POST") {
    //create a new note
    const { title, content } = req.body;
    const newNote = await prisma.note.create({ data: { title, content } });
    res.status(201).json(newNote);
  } else {
    res.status(405).end;
  }
}
