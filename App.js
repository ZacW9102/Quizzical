import React from "react"

export default function App() {
    
    const [quizData, setQuizData] = React.useState(null)
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=15")
            .then(res => res.json())
            .then(data => setQuizData(data))
    }, [])
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function getCard(num){
        if (quizData) {
            const { incorrect_answers, correct_answer} = quizData.results[num]
            const answersArray = [...incorrect_answers, correct_answer]
            shuffleArray(answersArray)  
    
            if(answersArray[0] === "True" || answersArray[0] === "False")
            {return (
                <div className="question">
                    <h1>{he.decode(quizData.results[num].question)}</h1>
                    <div className="answers">
                         <input type="radio" value={`${num}1`} id={`${num}1`} name={`${num}`}/>
                         <label htmlFor={`${num}1`} className="radio-label" id={`q${num}1`}>{he.decode(answersArray[0])}
                         </label>
                        <div className="line"></div>
                         <input type="radio" value={`${num}2`} id={`${num}2`} name={`${num}`}/>
                         <label htmlFor={`${num}2`} className="radio-label" id={`q${num}2`}>{he.decode(answersArray[1])}
                         </label>
                    </div>
                </div>
                )} else {
            return (
                <div className="question">
                    <h1>{he.decode(quizData.results[num].question)}</h1>
                    <div className="answers">
                            <input type="radio" value={`${num}1`} id={`${num}1`} name={`${num}`}/>
                            <label htmlFor={`${num}1`} className="radio-label" id={`q${num}1`}>{he.decode(answersArray[0])}
                            </label>
                            <input type="radio" value={`${num}2`} id={`${num}2`} name={`${num}`}/>
                            <label htmlFor={`${num}2`} className="radio-label" id={`q${num}2`}>{he.decode(answersArray[1])}
                            </label>
                            <input type="radio" value={`${num}3`} id={`${num}3`} name={`${num}`}/>
                            <label htmlFor={`${num}3`} className="radio-label" id={`q${num}3`}>{he.decode(answersArray[2])}
                            </label>
                            <input type="radio" value={`${num}4`} id={`${num}4`} name={`${num}`}/>
                            <label htmlFor={`${num}4`} className="radio-label" id={`q${num}4`}>{he.decode(answersArray[3])}
                            </label>
                    </div>
                </div>
                ) 
                }
        }
        return null
    }
    
    
    function handleSubmit(event) {
            event.preventDefault()
            
            for (let i = 0; i < 5; i++) {
                const radioInputs = document.getElementsByName(`${i}`)

                for (let j = 0; j < radioInputs.length; j++) {
                    const labelId = `q${i}${j + 1}`;
                    const labelElement = document.getElementById(labelId)

                    if (labelElement) {
                        labelElement.style.opacity = 0.4
                    }
                    
                }
            }

            for (let i = 0; i < 5; i++) {
                const radioInputs = document.getElementsByName(`${i}`)

                for (let j = 0; j < radioInputs.length; j++) {
                    const radioInput = radioInputs[j]

                    if (radioInput.checked) {
                        const labelId = `q${i}${j + 1}`;
                        const labelElement = document.getElementById(labelId)

                        if (labelElement) {
                            labelElement.style.backgroundColor = '#F8BCBC'
                            labelElement.style.border = 'none'
                        }
                    }
                }
            }
            for (let i = 0; i < 5; i++) {
                const question = quizData.results[i]
                const correctAnswer = question.correct_answer

            for (let j = 0; j < question.incorrect_answers.length + 1; j++) {
                const labelId = `q${i}${j + 1}`
                const labelElement = document.getElementById(labelId)

                
                if (labelElement && labelElement.innerText === correctAnswer) {
                    labelElement.style.backgroundColor = '#94D7A2'
                    labelElement.style.border = 'none'
                    labelElement.style.opacity = 1
                }
            }
        }
        document.getElementById("checkBtn").style.display="none"
        document.getElementById("playAgain").style.display="block"
    }
     
    return (
        <main>  
            <div className="container">
                <form onSubmit={handleSubmit}>
                    {getCard(0)}
                    <div className="line"></div>
                    {getCard(1)}
                    <div className="line"></div>
                    {getCard(2)}
                    <div className="line"></div>
                    {getCard(3)}
                    <div className="line"></div>
                    {getCard(4)}
                    <div className="line"></div>
                    <input type="submit" value="Check Answers" id="checkBtn"></input>
                    <button id="playAgain" onClick={() => window.location.reload()}>Play Again</button>
                </form>
            </div>
        
            <img src={"./assets/blobs2.png"} className="blobTop" />
            <img src={"./assets/blobs.png"} className="blobBot" />
        </main>
        
    )
}
