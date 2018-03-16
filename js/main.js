function main() {

	let paper = document.getElementById("paper"),

		boxDiv = document.getElementsByClassName("box"),
		p1ColorSelect = document.getElementsByClassName("p1-color-select"),
		p2ColorSelect = document.getElementsByClassName("p2-color-select"),
		startModals = document.getElementsByClassName("start-modal"),
		winLines = document.getElementsByClassName("win-line"),
		selectTwoPlayer = document.getElementById("two-player"),
		selectPlayComputer = document.getElementById("play-computer"),
		selectX = document.getElementById("p1-select-x"),
		select0 = document.getElementById("p1-select-0"),
		selectEasy = document.getElementById("easy"),
		selectHard = document.getElementById("hard"),
		playAgain = document.getElementById("play-again"),
		restart = document.getElementById("restart"),
		draw = false,
		p1Info,
		p2Info,
		p1Score = 0,
		p2Score = 0,
		skill,
		infoTokens = {
			"X": "",
			"0": ""
		},
		movesCount = 0,
		currentDivId = "",
		currentDiv,
		currentPlayer = 1,
		playingComputer = false,
		boxArray = ["-", "", "", "", "", "", "", "", "", ""],
		playerOneToken,
		playerTwoToken,
		p1Color,
		p2Color,
		colorsForComputer = ["#111", "#ff3300", "#00cc66", "#0066FF", "#7155a2"],
		gameOver = false,
		i = 0;

	//Draw lines on paper
	for (i = 20; i < 420; i += 20) {
		currentDivId = "line" + i;
		paper.innerHTML += "<div id='" + currentDivId + "'></div>";
		currentDiv = document.getElementById(currentDivId);
		currentDiv.style.position = "relative";
		currentDiv.style.top = i + "px";
		currentDiv.style.height = "2px";
		currentDiv.style.width = "100%";
		currentDiv.style.backgroundColor = "#b1c5d9";
		currentDiv.style.zIndex = "1";
	}

	var playerInfo = document.getElementById("player-info"),
		p1ScoreText = document.getElementById("p1-score"),
		p2ScoreText = document.getElementById("p2-score");

	//menu modals

	//single player menu sequence
	selectPlayComputer.onclick = function() {
		playingComputer = true;
		document.getElementById("choose-players").classList.add("animate-postit-slide-out");

		selectEasy.onclick = function() {
			skill = "easy";
			document.getElementById("choose-skill").classList.add("animate-postit-slide-out");
		};

		selectHard.onclick = function() {
			skill = "hard";
			document.getElementById("choose-skill").classList.add("animate-postit-slide-out");
		};

		selectX.onclick = function() {
			playerOneToken = "X";
			playerTwoToken = "0";
			document.getElementById("player-1-select-token").classList.add("animate-postit-slide-out");
		};

		select0.onclick = function() {
			playerOneToken = "0";
			playerTwoToken = "X";
			document.getElementById("player-1-select-token").classList.add("animate-postit-slide-out");
		};

		function p1ColorSet() {
			p1Color = this.getAttribute("data-color");
			
			do {
				var x=Math.floor((Math.random() * 5));
				p2Color = colorsForComputer[x];
			}
			while (p1Color === p2Color);			
			
			document.getElementById("player-2-select-color").classList.add("animate-postit-slide-out");
			document.getElementById("player-1-select-color").classList.add("animate-postit-slide-out");
			modalInOut();
			infoTokens[playerOneToken] = "<span style = 'color:" + p1Color + "; font-size: 1.5em'>" + playerOneToken + "</span>";
			infoTokens[playerTwoToken] = "<span style = 'color:" + p2Color + "; font-size: 1.5em'>" + playerTwoToken + "</span>";
			p1Info = infoTokens[playerOneToken] + "'s turn (player 1)";
			p2Info = infoTokens[playerTwoToken] + "'s turn (COMPUTER)";
			currentPlayer = Math.floor((Math.random() * 2) + 1);

			p1ScoreText.innerText = "P1: " + p1Score;
			p2ScoreText.innerText = "P2: " + p2Score;

			if (currentPlayer === 1) {
				playerInfo.innerHTML = p1Info;
			} else {
				playerInfo.innerHTML = p2Info;
				computerTurn();
			}

		}

		for (i = 0; i < p1ColorSelect.length; i++) {
			p1ColorSelect[i].onclick = p1ColorSet;
		}

	};

	//two player mode menu sequence
	selectTwoPlayer.onclick = function() {

		document.getElementById("choose-players").classList.add("animate-postit-slide-out");
		document.getElementById("choose-skill").classList.add("animate-postit-slide-out");

		selectX.onclick = function() {

			playerOneToken = "X";
			playerTwoToken = "0";
			document.getElementById("player-1-select-token").classList.add("animate-postit-slide-out");
		};

		select0.onclick = function() {

			playerOneToken = "0";
			playerTwoToken = "X";
			document.getElementById("player-1-select-token").classList.add("animate-postit-slide-out");
		};

		function p1ColorSet() {

			p1Color = this.getAttribute("data-color");
			document.getElementById("player-1-select-color").classList.add("animate-postit-slide-out");
		}

		for (i = 0; i < p1ColorSelect.length; i++) {
			p1ColorSelect[i].onclick = p1ColorSet;
		}

		function p2ColorSet() {
			p2Color = this.getAttribute("data-color");
			document.getElementById("player-2-select-color").classList.add("animate-postit-slide-out");
			modalInOut();
			infoTokens[playerOneToken] = "<span style = 'color:" + p1Color + "; font-size: 1.5em'>" + playerOneToken + "</span>";
			infoTokens[playerTwoToken] = "<span style = 'color:" + p2Color + "; font-size: 1.5em'>" + playerTwoToken + "</span>";
			p1Info = infoTokens[playerOneToken] + "'s turn (player 1)";
			p2Info = infoTokens[playerTwoToken] + "'s turn (player 2)";
			currentPlayer = Math.floor((Math.random() * 2) + 1);

			p1ScoreText.innerText = "P1: " + p1Score;
			p2ScoreText.innerText = "P2: " + p2Score;

			if (currentPlayer === 1) {
				playerInfo.innerHTML = p1Info;
			} else {
				playerInfo.innerHTML = p2Info;
			}

		}

		for (i = 0; i < p2ColorSelect.length; i++) {
			p2ColorSelect[i].onclick = p2ColorSet;
		}
	};

	//declare some functions
	function modalInOut() {
		if (document.getElementById("modal").classList.contains("animate-modal-out")) {

			document.getElementById("modal").classList.remove("animate-modal-out");
			document.getElementById("modal").classList.add("animate-modal-in");
		} else {
			document.getElementById("modal").classList.remove("animate-modal-in");
			document.getElementById("modal").classList.add("animate-modal-out");
		}
	}

	//reset after game over
	function reset() {

		function playOrRestart() {

			document.getElementById("game-over").classList.add("animate-postit-slide-out");

			if (this.innerText === "Play again?") {

				modalInOut();

				currentPlayer = Math.floor((Math.random() * 2) + 1);

				if (currentPlayer === 1) {
					playerInfo.innerHTML = p1Info;
				} else if (currentPlayer === 2 && !playingComputer) {
					playerInfo.innerHTML = p2Info;

				} else if (currentPlayer === 2 && playingComputer) {
					playerInfo.innerHTML = p2Info;
					computerTurn();
				}

			} else if (this.innerHTML === "Return to menu?") {
				playingComputer = false;
				p1Score = 0;
				p2Score = 0;
				
				for (i = 0; i < startModals.length; i++) {
					startModals[i].classList.remove("animate-postit-slide-out");
				}
			}
			divClicks("on");
		}

		if (gameOver) {
			document.getElementById("game-over").style.visibility = "visible";
			modalInOut();
			playAgain.onclick = playOrRestart;
			restart.onclick = playOrRestart;
			clearBoard();
			document.removeEventListener("click", reset);
			document.getElementById("game-over").classList.remove("animate-postit-slide-out");
		}

		function clearBoard() {
			for (i = 0; i < boxDiv.length; i++) {
				boxDiv[i].innerText = "";
			}
			for (i = 0; i < winLines.length; i++) {
				winLines[i].style.visibility = "hidden";
			}
			for (i = 1; i < boxArray.length; i++) {
				boxArray[i] = "";
			}
			movesCount = 0;
			gameOver = false;
			draw = false;
		}
	}

	function endGame() {
		gameOver = true;
		if (!draw && currentPlayer === 2) {
			p2Score += 1;
			p2ScoreText.innerText = "P2: " + p2Score;
		} else if (!draw && currentPlayer === 1) {
			p1Score += 1;
			p1ScoreText.innerText = "P1: " + p1Score;
		}

		setTimeout(function() {
			document.addEventListener("click", reset);

		}, 500);

	}

	//game logic>>>>>>
	//functions
	//check for a win
	function checkForWin(currentPlayerToken) {

		//check for win rows
		var x = 0,
			row = 1;

		for (i = 1; i < 10; i++) {

			if (boxArray[i] === currentPlayerToken) {
				x += 1;
			}

			if (x === 3) {

				switch (row) {

					case 1:
						document.getElementById("win-row-one").style.visibility = "visible";
						break;

					case 2:
						document.getElementById("win-row-two").style.visibility = "visible";
						break;

					case 3:
						document.getElementById("win-row-three").style.visibility = "visible";
						break;
				}

				playerInfo.innerHTML = infoTokens[currentPlayerToken] + " wins!" + "<p>Click anywhere to continue</p>";
				endGame();

			}
			if (i === 3 || i === 6 || i === 9) {
				x = 0;
				row += 1;
			}
		}

		//check for win columns

		for (var column = 1; column < 4; column++) {
			x = 0;
			for (var boxNum = column; boxNum < column + 7; boxNum += 3) {
				if (boxArray[boxNum] === currentPlayerToken) {
					x += 1;
				}
				if (x === 3) {

					switch (column) {

						case 1:

							document.getElementById("win-row-four").style.visibility = "visible";
							break;

						case 2:

							document.getElementById("win-row-five").style.visibility = "visible";
							break;

						case 3:

							document.getElementById("win-row-six").style.visibility = "visible";
							break;
					}

					playerInfo.innerHTML = infoTokens[currentPlayerToken] + " wins!" + "<p>Click anywhere to continue</p>";
					endGame();
				}

			}
		}

		//check win diagonals
		x = 0;
		for (i = 1; i < 10; i += 4) {
			if (boxArray[i] === currentPlayerToken) {
				x += 1;
				if (x === 3) {

					document.getElementById("win-row-seven").style.visibility = "visible";
					playerInfo.innerHTML = infoTokens[currentPlayerToken] + " wins!" + "<p>Click anywhere to continue</p>";
					endGame();
				}
			}
		}
		x = 0;
		for (i = 3; i < 8; i += 2) {
			if (boxArray[i] === currentPlayerToken) {
				x += 1;
				if (x === 3) {

					document.getElementById("win-row-eight").style.visibility = "visible";
					playerInfo.innerHTML = infoTokens[currentPlayerToken] + " wins!" + "<p>Click anywhere to continue</p>";
					endGame();
				}
			}
		}
	}

	//player interatction logic
	function playerBoxClick() {

		if (!gameOver) {
			//player 1 move logic
			if (currentPlayer === 1 && this.innerHTML === "") {
				movesCount += 1;
				playerInfo.innerHTML = p2Info;
				this.style.color = p1Color;
				this.innerText = playerOneToken;
				boxArray[Number(this.id.slice(-1))] = playerOneToken;
				checkForWin(playerOneToken);
				currentPlayer = 2;
				//player 2 logic if playing two players
			} else if (currentPlayer === 2 && this.innerHTML === "" && !playingComputer) {
				movesCount += 1;
				playerInfo.innerHTML = p1Info;
				this.style.color = p2Color;
				this.innerText = playerTwoToken;
				boxArray[Number(this.id.slice(-1))] = playerTwoToken;
				checkForWin(playerTwoToken);
				currentPlayer = 1;
			}

			//check for draw
			if (movesCount === 9 && !gameOver) {
				playerInfo.innerHTML = "DRAW! NO WINNERS! <p>Click anywhere to continue</p>";
				draw = true;
				endGame();
			}

			//call computer player function if playing computer
			if (currentPlayer === 2 && playingComputer) {
				divClicks("off");
				computerTurn();
			}

		}
	}

	//computer player logic
	function computerTurn() {

		if (!gameOver) {

			//update play info
			playerInfo.innerHTML = p2Info;

			//timeout to delay computer player move
			setTimeout(function() {

				function placeToken(placeBoxNum) {
					document.getElementById("box" + placeBoxNum).style.color = p2Color;
					document.getElementById("box" + placeBoxNum).innerText = playerTwoToken;
					boxArray[placeBoxNum] = playerTwoToken;
					checkForWin(playerTwoToken);

				}

				function findWinOrThreatSquares(playerToken) {
					var x = 0,
						empty = "",
						winOrThreatSquares = [];

					//check rows				

					//first row
					for (i = 1; i < 4; i++) {

						if (boxArray[i] === playerToken) {
							x += 1;
						} else if (boxArray[i] === "") {
							empty = i;
						}
					}
					if (x === 2 && empty !== "") {
						winOrThreatSquares.push(empty);
					}

					//second row
					x = 0;
					empty = "";
					for (i = 4; i < 7; i++) {

						if (boxArray[i] === playerToken) {
							x += 1;
						} else if (boxArray[i] === "") {
							empty = i;
						}
					}
					if (x === 2 && empty !== "") {
						winOrThreatSquares.push(empty);
					}

					//third row
					x = 0;
					empty = "";
					for (i = 7; i < 10; i++) {

						if (boxArray[i] === playerToken) {
							x += 1;
						} else if (boxArray[i] === "") {
							empty = i;

						}
					}
					if (x === 2 && empty !== "") {
						winOrThreatSquares.push(empty);
					}

					//check columns	

					//column 1
					x = 0;
					empty = "";

					for (i = 1; i < 8; i += 3) {

						if (boxArray[i] === playerToken) {
							x += 1;
						} else if (boxArray[i] === "") {
							empty = i;
						}
					}

					if (x === 2 && empty !== "") {
						winOrThreatSquares.push(empty);
					}

					//column 2
					x = 0;
					empty = "";

					for (i = 2; i < 9; i += 3) {

						if (boxArray[i] === playerToken) {
							x += 1;
						} else if (boxArray[i] === "") {
							empty = i;
						}
					}

					if (x === 2 && empty !== "") {
						winOrThreatSquares.push(empty);
					}

					//column 3
					x = 0;
					empty = "";

					for (i = 3; i < 10; i += 3) {

						if (boxArray[i] === playerToken) {
							x += 1;
						} else if (boxArray[i] === "") {
							empty = i;
						}
					}

					if (x === 2 && empty !== "") {
						winOrThreatSquares.push(empty);
					}

					//check diagonals
					x = 0;
					empty = "";
					for (i = 1; i < 10; i += 4) {

						if (boxArray[i] === playerToken) {
							x += 1;
						} else if (boxArray[i] === "") {
							empty = i;
						}
					}

					if (x === 2 && empty !== "") {
						winOrThreatSquares.push(empty);
					}
					//next diagonal
					x = 0;
					empty = "";
					for (i = 3; i < 8; i += 2) {

						if (boxArray[i] === playerToken) {
							x += 1;
						} else if (boxArray[i] === "") {
							empty = i;
						}
					}

					if (x === 2 && empty !== "") {
						winOrThreatSquares.push(empty);
					}

					return winOrThreatSquares;

				}

				//place token if no win or threat squares found
				function calculateMove() {

					//logic for hard mode
					if (skill === "hard") {
						var freeCorners = [],

							oppositeCorner,

							sides = [],
							takenSides = [],
							sideFork,
							oppSideFork = false;

						//check corners
						for (i = 1; i < 10; i += 2) {

							if (boxArray[i] === "") {
								freeCorners.push(i);
							}

							if (boxArray[i] === playerOneToken && i !== 5) {

								if (i === 1) {
									oppositeCorner = 9;
								} else if (i === 9) {
									oppositeCorner = 1;
								} else if (i === 3) {
									oppositeCorner = 7;
								} else if (i === 7) {
									oppositeCorner = 3;
								}

							} else if (boxArray[i] === playerTwoToken && i !== 5) {
								if (i === 1) {
									oppositeCorner = 9;
								} else if (i === 9) {
									oppositeCorner = 1;
								} else if (i === 3) {
									oppositeCorner = 7;
								} else if (i === 7) {
									oppositeCorner = 3;
								}
							}

						}

						//check sides
						for (i = 2; i < 9; i += 2) {

							if (boxArray[i] === "") {
								sides.push(i);
							}
							if (boxArray[i] !== "")
								takenSides.push(i);
						}

						//check for side fork opportunity
						if (boxArray[2] === playerTwoToken && boxArray[4] === playerTwoToken) {
							sideFork = 3;
						} else if (boxArray[2] === playerTwoToken && boxArray[4] === playerTwoToken) {
							sideFork = 1;
						} else if (boxArray[4] === playerTwoToken && boxArray[4] === playerTwoToken) {
							sideFork = 9;
						} else if (boxArray[6] === playerTwoToken && boxArray[4] === playerTwoToken) {
							sideFork = 7;
						}

						//check for side opponent fork
						if (boxArray[2] === playerOneToken && boxArray[4] === playerOneToken) {
							oppSideFork = true;
							sideFork = 3;
						} else if (boxArray[2] === playerOneToken && boxArray[6] === playerOneToken) {
							oppSideFork = true;
							sideFork = 1;
						} else if (boxArray[4] === playerOneToken && boxArray[8] === playerOneToken) {
							oppSideFork = true;
							sideFork = 9;
						} else if (boxArray[6] === playerOneToken && boxArray[8] === playerOneToken) {
							oppSideFork = true;
							sideFork = 7;
						}

						//place token

						//first move random corner or center place
						if (movesCount === 0) {
							placeToken(freeCorners[Math.floor((Math.random() * freeCorners.length))]);

							//prevent corner fork
						} else if (boxArray[oppositeCorner] === "" && movesCount > 1) {
							placeToken(oppositeCorner);
							//prevent or attempt side fork
						} else if (boxArray[takenSides[0]] === playerTwoToken && boxArray[takenSides[0] + 2] === "" && !oppSideFork) {
							placeToken(takenSides[0] + 2);
						} else if (boxArray[takenSides[0]] === playerTwoToken && boxArray[takenSides[0] - 2] === "" && !oppSideFork) {
							placeToken(takenSides[0] - 2);
						} else if (sideFork !== 0 && boxArray[sideFork] === "") {
							placeToken(sideFork);
							//play center
						} else if (boxArray[5] === "") {
							placeToken(5);
							//play side if corner fork threat
						} else if (freeCorners.length === 2) {
							placeToken(sides[Math.floor((Math.random() * sides.length))]);
							//play corner
						} else if (freeCorners.length > 0) {
							placeToken(freeCorners[Math.floor((Math.random() * freeCorners.length))]);
							//play side
						} else if (sides.length > 0) {
							placeToken(sides[Math.floor((Math.random() * sides.length))]);
						}

						//logic for easy mode
					}

					if (skill === "easy") {
						var emptySquares = [];

						//find empty squares
						for (i = 1; i < 10; i++) {
							if (document.getElementById("box" + i).innerText === "") {
								emptySquares.push(i);
							}
						}
						placeToken(emptySquares[Math.floor((Math.random() * emptySquares.length))]);
					}

					checkForWin(playerTwoToken);
				}

				var winSquaresArr = findWinOrThreatSquares(playerTwoToken),
					threatSquaresArr = findWinOrThreatSquares(playerOneToken);

				if (winSquaresArr.length > 0) {
					placeToken(winSquaresArr[Math.floor((Math.random() * winSquaresArr.length))]);
				} else if (threatSquaresArr.length > 0) {
					placeToken(threatSquaresArr[Math.floor((Math.random() * winSquaresArr.length))]);

				} else {
					calculateMove()
				};

				if (!gameOver) {
					movesCount += 1;
					currentPlayer = 1;
					playerInfo.innerHTML = p1Info;
				}

				if (movesCount === 9 && !gameOver) {
					playerInfo.innerHTML = "DRAW! NO WINNERS! <p>Click anywhere to continue</p>";
					draw = true;
					endGame();
				}
				divClicks("on");
			}, 500);

		}
	}

	//add click listener for box divs
	
	function divClicks(state){
	
	for (i = 0; i < boxDiv.length; i++) {

		boxDiv[i].style.cursor = "pointer";
		
		if(state === "on"){
		boxDiv[i].onclick = playerBoxClick;
		}else if(state === "off"){
			boxDiv[i].onclick = null;
		}

	}
}
	divClicks("on");
}

document.addEventListener('DOMContentLoaded', function() {

	main();

});