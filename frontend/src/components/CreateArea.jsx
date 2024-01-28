import  { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

// hook
import { useNotesContext } from "../hooks/useNotesContext";

function CreateArea() {
  const {dispatch} = useNotesContext()
  const [isExpanded, setExpanded] = useState(false);

  // const [note, setNote] = useState({
  //   title: "",
  //   content: ""
  // });
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const note =  {title,content}

    const response = await fetch("/api/notes", {
      method: 'POST',
      body: JSON.stringify(note),
      headers:{
                'Content-Type': 'application/json'
            }

    })
    const data = await response.json()

        if(!response.ok){
            setError(data.error)
           

        }
        if(response.ok){
            setTitle('')
            setContent('')
        
            setError(null)
           
            console.log("new workout added", data)
            dispatch({type: 'CREATE_NOTE', payload: data})
            
        }

  }

  // function handleChange(event) {
  //   const { name, value } = event.target;

  //   setNote(prevNote => {
  //     return {
  //       ...prevNote,
  //       [name]: value
  //     };
  //   });
  // }

  // function submitNote(event) {
  //   props.onAdd(note);
  //   setNote({
  //     title: "",
  //     content: ""
  //   });
  //   event.preventDefault();
  // }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            name="title"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            required
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={(e)=> setContent(e.target.value)}
          value={content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          required
        />
        <Zoom in={isExpanded}>
         
          <button>
            <AddIcon />
          </button>

          
        </Zoom>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default CreateArea;
