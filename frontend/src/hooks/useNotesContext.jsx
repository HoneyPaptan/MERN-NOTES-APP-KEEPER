import { NoteContext } from "../context/NotesContext";
import { useContext } from "react";


export const useNotesContext = () =>{
    const context = useContext(NoteContext)

    if(!context){
        throw Error('useNotescontext must be used inside an notescontextprovider')
    }
    return context
}