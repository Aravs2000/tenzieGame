import './App.css'
import Die from './components/Die'
import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [die,setDie]=React.useState(allNewDice())
  const [win,setWin]=React.useState(false)
  
  React.useEffect(()=>{
    const allHeld = die.every(dice=>dice.isHeld)
    const allSame = die.every(dice=>dice.value===die[0].value)
    if(allHeld && allSame){
      setWin(true)
      console.log("won")
    }
  }, [die])

 
  
  function allNewDice(){
      const newArray=[]
      for(let i=0;i<10;i++){
                newArray.push(generateNewDie())
      }
      return newArray
    }


    function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
    function rollDice() {
      if(!win) {
        setDie(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
          }))
        }else{
          setWin(false)
          setDie(allNewDice)
      }
    }


  function toggleHeld(id){
    setDie(oldDie=>oldDie.map(dice=>{
      return dice.id===id ?
            {...dice,isHeld:!dice.isHeld}:
            dice
    }))
    }

    
  
  const dieComp=die.map((die)=>
                <Die 
                  value={die.value} key={die.id}  
                  holdDice={() => toggleHeld(die.id)} 
                  isHeld={die.isHeld}
                />)

  return (
    <main className=''>
    {win && <Confetti/>}
    <h1 className="title">Tenzie Game</h1>
      <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        
        {dieComp}
      </div>
      <button className='roll-dice' onClick={rollDice}>
            {win ? "New Game": "Roll"}
      </button>
    </main>
  );
}

export default App;
