import DeleteIcon from "@material-ui/icons/Delete";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import EditIcon from '@material-ui/icons/Edit';
import { useNotesContext } from "../hooks/useNotesContext";
import { useState } from "react";
function Note({notes}) {
const{dispatch} = useNotesContext()
const [updatedNote, setUpdatedNote] = useState(notes);
    const [isEditing, setIsEditing] = useState(false);
  const handleDelete = async()=>{
    const response= await fetch('/api/notes/' + notes._id,{
      method: "DELETE"
    })
    const data = await response.json()
    if(response.ok){
      dispatch({type:"DELETE_NOTE", payload: data})


    }

  }

  const handleUpdate = async () => {
    try {
        const response = await fetch(`/api/notes/${updatedNote._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedNote)
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({ type: 'UPDATE_NOTE', payload: data });
            setIsEditing(false);
        }
    } catch (error) {
        console.error('Error updating note:', error);
    }
};


  const handleHeadingChange = (event) => {
    setUpdatedNote({
        ...updatedNote,
        title: event.target.textContent
    });
};

const handleContentChange = (event) => {
    setUpdatedNote({
        ...updatedNote,
        content: event.target.textContent
    });
};
  

  return (
    <div className="note">
            <h1
                contentEditable={isEditing}
                onBlur={handleHeadingChange}
                suppressContentEditableWarning={true}
            >{updatedNote.title}</h1>
            <p
                contentEditable={isEditing}
                onBlur={handleContentChange}
                suppressContentEditableWarning={true}
            >{updatedNote.content}</p>
            <button onClick={handleDelete}>
                <DeleteIcon />
            </button>
            {isEditing ? (
                <button onClick={handleUpdate}>
                    Save
                </button>
            ) : (
                <button onClick={() => setIsEditing(true)}>
                    <EditIcon />
                </button>
            )}
            <small>{formatDistanceToNow(new Date(notes.createdAt), { addSuffix: true })}</small>
    </div>
  );
}

export default Note;
