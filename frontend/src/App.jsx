import  { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";


// hook 
import { useNotesContext } from "./hooks/useNotesContext";
function App() {
  const {notes, dispatch}= useNotesContext()

  useEffect(()=>{
    const fetchNotes = async ()=>{
      const response = await fetch("/api/notes")
      const data = await response.json()

      if(response.ok){
        dispatch({type:'SET_NOTE' , payload: data})
      }
    }

    fetchNotes()
  }, [dispatch])

 

  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  return (
    <div>
      <Header />
      <CreateArea />
      {notes && notes.map((note) => {
        return (
          <Note
            key={note._id}
            notes ={note}
            // onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
