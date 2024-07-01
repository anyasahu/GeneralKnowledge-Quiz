var questions = [
    {
        question:"Which is the largest lake in India?",
        answers:[   
              { text:"Baikal" , correct:false},
              { text:"Dal lake" , correct:false},
              { text:"Vembanad lake" , correct:true},
              { text:"Wular lake" , correct:false},
        ]
    },
    {
    question:"Which planet in the solar system is known as the 'Red planet'?",
    answers:[      
          { text:"Earth" , correct:false},
          { text:"Mars" , correct:true},
          { text:"venus" , correct:false},
          { text:"Jupitar" , correct:false},
        ]
    },
    {
        question:"Which is the longest river in India?",
    answers:[       
          { text:"Ganga" , correct:true},
          { text:"Yamuna" , correct:false},
          { text:"Narmada" , correct:false},
          { text:"Jhelum" , correct:false},
        ]
    },
    {
        question:"Which gas is used to extinguish fires?",
    answers:[
        
          { text:"Oxygen" , correct:false},
          { text:"Carbon-dioxide" , correct:false},
          { text:"Hydrogen" , correct:false},
          { text:"Nitrogen" , correct:true},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
    answers:[
        
          { text:"Vatican city" , correct:true},
          { text:"Bhutan" , correct:false},
          { text:"Sri lanka" , correct:false},
          { text:"Nepal" , correct:false},

        ]
    }

];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answerButtons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML=questionNo +". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        button.addEventListener("click",selectAnswer);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
}else{
    showScore();
}
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
