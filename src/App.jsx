import { useState ,useCallback, useEffect, useRef} from 'react'
import './index.css'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed,setNumberAllowed]= useState(false);
  const[charAllowed,setCharAllowed]= useState(false);
  const[password,setPassword]= useState("");

//useRef hook.   to highlight the copied password
  const passwordRef = useRef(null)


  
  //useCallback is a React Hook that lets you cache a function definition between re-renders.
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*_+={}[]`~"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length)
      pass += str.charAt(char);
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed])



 const copyPasswordToClipboard= useCallback(()=>{
    passwordRef.current?.select()//to highlight the password while copying
    //we used useRef for this only not copying the password

    //passwordRef.current?.setSelectionRange(0,3);


    window.navigator.clipboard.writeText(password)//to copy password
 },[password]) 



  useEffect(()=>{passwordGenerator()}, //useEffect- kuch bhi change hua password generator mein toh run kardo.  hence new password comes
  [length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div>
        <h1>Password generator</h1>
        <div>
          <input type="text"
          value={password}
          placeholder="password"
          readOnly
          ref={passwordRef}//useRef
          />
          <button onClick={copyPasswordToClipboard} >
            copy</button>
        </div>
    
        <div>
          <input
          type="range"
          min={4}
          max={100}
          value={length}
          onChange={(e)=> {setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div>
           <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=> {
            setNumberAllowed((prev)=> !prev);
          }}
          />
          <label>Numbers</label>
        </div>
        <div>
           <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="numberInput"
          onChange={()=> {
            setCharAllowed((prev)=> !prev);
          }}
          />
          <label>Characters</label>
        </div>
        
        </div>
    </>
  );
}

export default App

