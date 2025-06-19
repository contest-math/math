
	//to main menu button code
	document.getElementById("mainmenubutton").addEventListener("click", function () {
	location.reload()
	})

	//about this site button code
	document.getElementById("aboutbutton").addEventListener("click", function () {
	document.getElementById("mainmenu").style.display = "none";
	document.getElementById("testsettings").style.display = "none";
	document.getElementById("practicesettings").style.display = "none";
	document.getElementById("rtestsettings").style.display = "none";
	document.getElementById("practicepage").style.display = "none";
	document.getElementById("testpage").style.display = "none";
	document.getElementById("testend").style.display = "none";
	document.getElementById("testendimage").style.display = "none";
	document.getElementById("practiceend").style.display = "none";
	document.getElementById("aboutthissite").style.display = "block";
	})

	//practice mode button code
	document.getElementById("practicebutton").addEventListener("click", function () {
	document.getElementById("mainmenu").style.display = "none";
	document.getElementById("practicesettings").style.display = "block";
	})

	//test mode button code
	document.getElementById("testbutton").addEventListener("click", function () {
	document.getElementById("mainmenu").style.display = "none";
	document.getElementById("testsettings").style.display = "block";
	})

	//randomized test mode button code
	document.getElementById("rtestbutton").addEventListener("click", function () {
	document.getElementById("mainmenu").style.display = "none";
	document.getElementById("rtestsettings").style.display = "block";
	})

	//this is setup for the different modes
	let questiontype, difficulty, year, mode, pkey, questionnum, imgpath, time, totaltime, accuracy, imgpathcheck, answervalue, currentquestion, interval, alertboxcondition;
	let questionstotal = 0
	let questionscorrect = 0
	let score = 0
	let timerstatus = 1
	const numlist = [];
	const questionlist = [];
	var answerkey = {};
	fetch("answers.json")
	.then(response => response.json())
	.then(data => answerkey = data)
	

	//update these numbers you go, the number is the amount of questions in that category
	const maxnum = {
	invitationalsalgebra: "172",
	invitationalsgeometry: "144",
	invitationalscalculus: "92",
	invitationalsstatistics: "67",
	invitationalsanyquestions: "480",
	districtalgebra: "89",
	districtgeometry: "68",
	districtcalculus: "45",
	districtstatistics: "36",
	districtanyquestions: "240",
	regionalalgebra: "79",
	regionalgeometry: "71",
	regionalcalculus: "48",
	regionalstatistics: "42",
	regionalanyquestions: "240",
	statealgebra: "83",
	stategeometry: "74",
	statecalculus: "48",
	statestatistics: "35",
	stateanyquestions: "240",
	anytestalgebra: "423",
	anytestgeometry: "357",
	anytestcalculus: "233",
	anyteststatistics: "180",
	anytestanyquestions: "1200",
	}
		
	//this function and randomQuestion give a question that is not repeated
	function numList() {
	for (let i = 0; i < Number(maxnum[pkey]); i++) {
	var j = i + 1
	numlist[i] = j.toString();
	}}

	function randomQuestion() {
	var numtemp = Math.floor(Math.random() * Number(maxnum[pkey]));
	questionnum = numlist[numtemp];
	numlist.splice(numtemp, 1);
	var maxnumnew = Number(maxnum[pkey])-1
	maxnum[pkey] = maxnumnew.toString()
	}

	//this function creates a list of random questions for rtest mode
	function randomquestionListMaker() {
		pkey = difficulty + "algebra";
		numList();
		for (let i = 1; i < 22; i++) {
			randomQuestion();
			imgpath = "questions/practice/" + difficulty + "/" + "algebra" + "/" + questionnum + ".png";
			questionlist[i] = imgpath
		}
		pkey = difficulty + "geometry";
		numlist.length = 0;
		numList();
		for (let i = 22; i < 40; i++) {
			randomQuestion();
			imgpath = "questions/practice/" + difficulty + "/" + "geometry" + "/" + questionnum + ".png";
			questionlist[i] = imgpath
		}
		pkey = difficulty + "calculus";
		numlist.length = 0;
		numList();
		for (let i = 40; i < 52; i++) {
			randomQuestion();
			imgpath = "questions/practice/" + difficulty + "/" + "calculus" + "/" + questionnum + ".png";
			questionlist[i] = imgpath
		}
		pkey = difficulty + "statistics";
		numlist.length = 0;
		numList();
		for (let i = 52; i < 61; i++) {
			randomQuestion();
			imgpath = "questions/practice/" + difficulty + "/" + "statistics" + "/" + questionnum + ".png";
			questionlist[i] = imgpath
		}
	}

	//this function creates a questionlist for regular test mode
	function questionListMaker () {
		for (let i=1; i < 61; i++) {
		imgpath = "questions/test/" + year + "/" + difficulty + "/" + i.toString() + ".png";
		questionlist[i] = imgpath
		}
	}


	//this function creates a timer
	function testtimer() {
		//time after first timer update, set starting time in html
		let	testtimer1 = 39
		let	testtimer2 = 59
		interval = setInterval(function() {
			if (timerstatus == 1) {
				document.getElementById("testtimer1").textContent = String(testtimer1).padStart(2,"0");
				document.getElementById("testtimer2").textContent = String(testtimer2).padStart(2,"0");
				if (testtimer1 == 0 && testtimer2 == 0) {
					clearInterval(interval);
					setTimeout(function() {
					testEnd();
					},1000)
				}
				testtimer2 -=1
				if (testtimer2 == -1) {
					testtimer2 = 59;
					testtimer1 -=1;
				}
			}
		},1000)
	}

	//timer pause functions
	function testTimerPausePlay() {
	if (timerstatus == 1) {
		timerstatus = 0;
		document.getElementById("testpausebutton").src = "assets/images/playbutton.png"
	} else {
		timerstatus = 1;
		document.getElementById("testpausebutton").src = "assets/images/pausebutton.png"
	}
	}
	document.getElementById("testpausebutton").addEventListener("click", testTimerPausePlay);

	//practice mode start button code
	function startPractice() {
		difficulty = document.querySelector('input[name="difficultyp"]:checked')?.value;
		questiontype = document.querySelector('input[name="questiontypep"]:checked')?.value;
		mode = "practice";
		pkey = difficulty + questiontype;
		
		if (!questiontype || !difficulty) {
			document.getElementById("settingsalertbox").style.display = "flex";
			setTimeout(function () {
			document.getElementById("settingsalertbox").style.display = "none"
			}, 3000);
		} else {
		document.getElementById("practicesettings").style.display = "none";
		document.getElementById("practicepage").style.display = "block";
		window.numList()
		window.randomQuestion()
		imgpath = "questions/practice/" + difficulty + "/" + questiontype + "/" + questionnum + ".png";
		document.getElementById("practicequestion").src = imgpath;
		time = Date.now();
		totaltime = time;
		document.addEventListener("keydown", function(e) {
			if (e.key === "ArrowRight") {
				practiceNext()
			}
		})
		}
	}
	document.getElementById("startbuttonp").addEventListener("click", startPractice);

	//part of start test code for regular test
	function startTest() {
		difficulty = document.querySelector('input[name="difficultyt"]:checked')?.value;
		year = document.querySelector('input[name="yeart"]:checked')?.value;
		alertboxcondition = (!difficulty || !year);
		window.questionListMaker();
	}
	
	//part of start test code for random test
	function startRTest() {
		difficulty = document.querySelector('input[name="difficultyr"]:checked')?.value;
		alertboxcondition = (!difficulty);
		window.randomquestionListMaker();
	}

	//test mode start button code
	function startAnyTest() {
		currentquestion = "1"
		
		if (alertboxcondition) {
			document.getElementById("settingsalertbox").style.display = "flex";
			setTimeout(function () {
			document.getElementById("settingsalertbox").style.display = "none"
			}, 3000);
		} else {
		document.getElementById("testsettings").style.display = "none";
		document.getElementById("rtestsettings").style.display = "none";
		document.getElementById("testpage").style.display = "block";
		imgpath = questionlist[currentquestion];
		document.getElementById("currenttestquestion").textContent = "(" + currentquestion + ".)";
		document.getElementById("testquestion").src = imgpath;
		const buttons = document.querySelectorAll(".testquestionbuttons");
		buttons.forEach(function(button) {
			button.addEventListener("click", function(e) {
				currentquestion = e.target.id.replace("testquestionbutton","")
				imgpath = questionlist[currentquestion];
				document.getElementById("currenttestquestion").textContent = "(" + currentquestion + ".)";
				document.getElementById("testquestion").src = imgpath;
			})
		})
		document.addEventListener("keydown", function(e) {
			if (e.key === "ArrowLeft") {
				testBack();
			}
			if (e.key === "ArrowRight") {
				testNext();
			}
		})
		}
		testtimer()
	}
	document.getElementById("startbuttont").addEventListener("click", function() {
		window.startTest();
		window.startAnyTest();
	});
	document.getElementById("startbuttonr").addEventListener("click", function() {
		window.startRTest();
		window.startAnyTest();
	});

	//this is for practice mode buttons
	function questioncountpractice () {
		if (imgpath != imgpathcheck) {
			if (answervalue) {
				questionscorrect += 1
				questionstotal += 1
			} else {
				questionstotal += 1
			}
			imgpathcheck = imgpath
		}
	}

	function practiceSubmit() {
	if (document.querySelector('input[name="practiceanswer"]:checked')?.value) {
	time = Date.now() - time;
	if (time > 60000) {
		document.getElementById("timeelapsedcorrect").textContent = Math.round(time / 60000 * 100) / 100 + " minutes";
		document.getElementById("timeelapsedincorrect").textContent = Math.round(time / 60000 * 100) / 100 + " minutes";
	} else {
		document.getElementById("timeelapsedcorrect").textContent = Math.round(time / 1000 * 100) / 100 + " seconds";
		document.getElementById("timeelapsedincorrect").textContent = Math.round(time / 1000 * 100) / 100 + " seconds";
	}
	answervalue = (answerkey[imgpath] === document.querySelector('input[name="practiceanswer"]:checked')?.value)
	if (answervalue) {
		document.querySelectorAll('input[name="practiceanswer"]').forEach(rb => rb.checked = false);
		document.getElementById("practiceanswercorrect").style.display = "flex";
		setTimeout(function () {
		document.getElementById("practiceanswercorrect").style.display = "none"
		}, 3500);
	} else {
		document.querySelectorAll('input[name="practiceanswer"]').forEach(rb => rb.checked = false);
		document.getElementById("correctanswer").textContent = answerkey[imgpath];
		document.getElementById("practiceanswerincorrect").style.display = "flex";
		setTimeout(function () {
		document.getElementById("practiceanswerincorrect").style.display = "none"
		}, 3500);
	}
	window.questioncountpractice()
	time = Date.now() + 3500; //adjust time to account for the alert box display time
	}
	}

	function practiceNext() {
	if (document.getElementById("practicepage").style.display === "block") {
		document.querySelectorAll('input[name="practiceanswer"]').forEach(rb => rb.checked = false);
		if (maxnum[pkey] != "0") {
			randomQuestion();
			imgpath = "questions/practice/" + difficulty + "/" + questiontype + "/" + questionnum + ".png";
			document.getElementById("practicequestion").src = imgpath;
		} else {
			totaltime = Date.now() - totaltime
			document.getElementById("questionscomplete").style.display = "flex";
			setTimeout(function () {
				document.getElementById("questionscomplete").style.display = "none";
				document.getElementById("practicepage").style.display = "none";
				document.getElementById("practiceend").style.display = "block";
				document.getElementById("questionsattemptedpractice").textContent = questionstotal;
				document.getElementById("questionscorrectpractice").textContent = questionscorrect;
				document.getElementById("accuracypractice").textContent = Math.round(questionscorrect / questionstotal * 1000) / 10 + "%";
				if (totaltime > 60000) {
				document.getElementById("timeelapsedpractice").textContent = Math.round(totaltime / 60000 * 100) / 100 + " minutes";
				} else {
				document.getElementById("timeelapsedpractice").textContent = Math.round(totaltime / 1000 * 100) / 100 + " seconds";
				}
			}, 5000);
		}
		time = Date.now();
	}
	}
	function practiceEndSession () {
		totaltime = Date.now() - totaltime
		document.getElementById("practicepage").style.display = "none";
		document.getElementById("practiceend").style.display = "block";
		document.getElementById("questionsattemptedpractice").textContent = questionstotal;
		document.getElementById("questionscorrectpractice").textContent = questionscorrect;
		document.getElementById("accuracypractice").textContent = Math.round(questionscorrect / questionstotal * 1000) / 10 + "%";
		if (totaltime > 60000) {
		document.getElementById("timeelapsedpractice").textContent = Math.round(totaltime / 60000 * 100) / 100 + " minutes";
		} else {
		document.getElementById("timeelapsedpractice").textContent = Math.round(totaltime / 1000 * 100) / 100 + " seconds";
		}
	}

	document.getElementById("psubmit").addEventListener("click", practiceSubmit);
	document.getElementById("pnext").addEventListener("click", practiceNext);
	document.getElementById("pend").addEventListener("click", practiceEndSession);

	//test mode functions below

	function testNext () {
		if (Number(currentquestion) < 60 && document.getElementById("testpage").style.display === "block") {
			num = Number(currentquestion);
			num += 1;
			currentquestion = num.toString();
			imgpath = questionlist[currentquestion];
			document.getElementById("currenttestquestion").textContent = "(" + currentquestion + ".)";
			document.getElementById("testquestion").src = imgpath;
		}
	}

	function testBack () {
		if (Number(currentquestion) > 1 && document.getElementById("testpage").style.display === "block") {
			num = Number(currentquestion);
			num -= 1;
			currentquestion = num.toString();
			imgpath = questionlist[currentquestion];
			document.getElementById("currenttestquestion").textContent = "(" + currentquestion + ".)";
			document.getElementById("testquestion").src = imgpath;
		}
	}

	function testEnd() {
		clearInterval(interval);
		document.getElementById("testpage").style.display = "none";
		document.getElementById("testend").style.display = "block";
		for (i=1; i<61; i++) {
			answer = document.querySelector('select[id="testquestionanswer'+ i.toString() +'"]').value;
			imgpath = questionlist[i];
			correctanswer = answerkey[imgpath];
			document.getElementById("testanswer"+i.toString()).textContent = correctanswer;
			if (!answer) {
				document.getElementById("testanswerbutton"+i.toString()).style.color = "black"
			} else if (answer === correctanswer) {
				score += 6
				questionstotal += 1
				questionscorrect += 1
				document.getElementById("testanswerbutton"+i.toString()).style.color = "green"
			} else {
				score -= 2
				questionstotal += 1
				document.getElementById("testanswerbutton"+i.toString()).style.color = "red"
			}
		}
		document.getElementById("testscore").textContent = score
		document.getElementById("accuracytest").textContent = Math.round(questionscorrect / questionstotal * 1000) / 10 + "%";
		document.getElementById("questionsattemptedtest").textContent = questionstotal;
		document.getElementById("questionscorrecttest").textContent = questionscorrect;

		const buttons = document.querySelectorAll(".testanswerbuttons");
		buttons.forEach(function(button) {
			button.addEventListener("click", function(e) {
				currentquestion = Number(e.target.id.replace("testanswerbutton",""));
				answer = document.querySelector('select[id="testquestionanswer'+ currentquestion.toString() +'"]').value;
				imgpath = questionlist[currentquestion];
				document.getElementById("correctanswertestimage").textContent = answerkey[imgpath];
				document.getElementById("youranswertestimage").textContent = answer
				if (!answer) {
					document.getElementById("youranswertestimage").textContent = "None"
				}
				document.getElementById("questionboxtestresults").src = imgpath;
				document.getElementById("testend").style.display = "none";
				document.getElementById("testendimage").style.display = "block";
			})
		})
	}

	function testEndImage2testEnd() {
		document.getElementById("testendimage").style.display = "none";
		document.getElementById("testend").style.display = "block";
	}

	document.getElementById("tnext").addEventListener("click", testNext);
	document.getElementById("tback").addEventListener("click", testBack);
	document.getElementById("endtestbutton").addEventListener("click", testEnd);
	document.getElementById("testendimagebutton").addEventListener("click", testEndImage2testEnd);
