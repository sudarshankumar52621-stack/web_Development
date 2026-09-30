document.addEventListener("DOMContentLoaded", ()=> {

    const questions = [
      {
        question: "shubham kumar rai is a ???",
        choices: ["IITIAN", "NITIAN", "SMVDUIAN", "MITIAN"],
        answer: "IITIAN",
      },
      {
        question: "Height of shubham is ?",
        choices: ["6 feet", "infinty", "5 feet", "luli bhar ki"],
        answer: "6 feet",
      },
      {
        question: "favourite state?",
        choices: ["Haryana", "Bihar", "up", "maharastra"],
        answer: "Haryana",
      },
      {
        question: "favourite cricket team?",
        choices: ["indian team", "pakistan team", "rcb-mens", "rcb womens"],
        answer: "rcb-mens",
      },
      {
        question: "favourite iit?",
        choices: ["IIT katra", "IIT Kaimur", "IIT BHU", "IIT KOTHA"],
        answer: "IIT BHU",
      },
    ];


    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choiceList = document.getElementById("choice-list");
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const nextBtn = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result-container");
    const  scoreDisplay= document.getElementById("score");
    
    let currentQuestionIndex = 0;
    let score = 0;

    
    startBtn.addEventListener('click', startQuiz)

    nextBtn.addEventListener("click", ()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        } else{
            showResult();
        }
    })

    restartBtn.addEventListener('click', ()=>{
        currentQuestionIndex = 0;
        score =0;
        resultContainer.classList.add('hidden');
        startQuiz();
    })

    function startQuiz() {
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion(){
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choiceList.innerHTML = "";// previous question
        questions[currentQuestionIndex].choices.forEach((choice)=> {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener("click", () => selectAnswer(choice));
            li.addEventListener("click", () => {
                li.classList.remove("bg-gray-300")
                li.classList.add("bg-blue-500")
            });
            li.classList.add("bg-gray-300", "rounded", "m-1", "px-2", "hover:bg-blue-600", "border", "border-gray-700")
            choiceList.appendChild(li);
        });
    }
    function selectAnswer(choice){
        const correctAnswer = questions[currentQuestionIndex].answer;
        if(choice === correctAnswer){
            score++;
        }
        nextBtn.classList.remove("hidden");
    }

    function showResult(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questions.length}`
    }
})  

