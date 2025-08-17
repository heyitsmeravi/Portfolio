let gameSeq=[];
let userSeq=[];
let btns=["first","second","third","fourth"];
let started=false;
let level=0;
let highScore=0;
let levelUpd=document.querySelector("#level");
document.addEventListener("keypress",function(){
	if (started==false){
	started=true;
	console.log("game started = ",started);
	levelUp();
	}
});
function btnFlash(btn){
	btn.classList.add("flash");
	setTimeout(function(){
		btn.classList.remove("flash");
	},250);
}
function gameOver(){
	btn.classList.add("gameOver");
}
function checkAns(idx){
	if (userSeq[idx]==gameSeq[idx]){
		if (userSeq.length==gameSeq.length){
			setTimeout(levelUp,1000);
		}
	}else{
		console.log("Game Over");
		levelUpd.innerHTML=`Game Over. Your score is <b> ${level} </b> <br> Highest Score is ${highScore} <br> Press any Key to Restart `;
		let body=document.querySelector("body");
		body.style.backgroundColor="Red";
		setTimeout(function(){
			body.style.backgroundColor="white";
		},150);
		reset();
	}
}
function levelUp(){
	userSeq=[];
	level++;
	if (highScore<level){
		highScore=level;
	}
	levelUpd.innerHTML=`level ${level} <br> HighScore: ${highScore}`;
	let rndIdx=Math.floor(Math.random()*4);
	let rndCol=btns[rndIdx];
	let randBtn=document.querySelector(`.${rndCol}`);
	btnFlash(randBtn);
	gameSeq.push(rndCol);
	console.log("game seq is : ",gameSeq);
}
function btnPress(){
	let btn=this;
	btnFlash(btn);
	let btnCol=btn.getAttribute("id");
	userSeq.push(btnCol);
	console.log("user seq is :",userSeq);
	checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".box");
for (btn of allBtns){
	btn.addEventListener("click",btnPress);
}
function reset(){
	started=false;
	level=0;
	userSeq=[];
	gameSeq=[];
}
