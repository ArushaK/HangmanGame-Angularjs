var controllers = angular.module("controllers", []);
controllers.controller("GameController", [
  "$scope",
  "$document",
  "$window",
  function ($scope, $document, $window) {
    var words = ["Ant", "AAb", "bsd", "pok"];
    $scope.incorrectLettersChosen = [];
    $scope.guesses = 6;
    $scope.input = {
      letter: "",
    };
    $scope.validGuess = /[a-zA-Z]/;
    $scope.userGuess = [];

    var showModal = function () {
      //alertModal.classList.add("visibleModal");
      angular
        .element(document.querySelector(".alertModal"))
        .addClass("visibleModal");

      //alertModal.setAttribute("role", "alertdialog");
      var mod = angular.element(document.querySelector(".alertModal"));
      mod.attr("role", "alertdialog");

      //alertModalBackground.classList.add("visibleModal");
      angular
        .element(document.querySelector(".alertModalBackground"))
        .addClass("visibleModal");

      // Remove background elements from tab index when modal is open
      angular.element(
        document
          .querySelectorAll("form, input, a, button")
          .forEach((element) => element.setAttribute("tabindex", "-1"))
      );
      // Trap screen reader focus in modal when open
      angular.element(
        document
          .querySelectorAll("header, main, footer")
          .forEach((element) => element.setAttribute("aria-hidden", "true"))
      );
      // Allow users to click ok button
      //ok.setAttribute("tabindex", "0");
      angular.element(document.getElementById("ok")).attr("tabindex", "0");
      // Focus on ok button when modal opens
      ok.focus();
      // Close modal if user presses escape key
      //escapeModal();
    };

    var closeModal = function () {
      //alertModal.classList.remove("visibleModal");
      angular
        .element(document.querySelector(".alertModal"))
        .removeClass("visibleModal");

      //alertModal.removeAttribute("role");
      angular.element(document.querySelector(".alertModal")).removeAttr("role");

      //alertModalBackground.classList.remove("visibleModal");
      angular
        .element(document.querySelector(".alertModalBackground"))
        .removeClass("visibleModal");
      angular.element(
        document
          .querySelectorAll("form, input, a, button")
          .forEach((element) => element.setAttribute("tabindex", "0"))
      );
      angular.element(
        document
          .querySelectorAll("header, main, footer")
          .forEach((element) => element.setAttribute("aria-hidden", "false"))
      );
    };
    $scope.ok = function () {
      closeModal();
    };

    // var selectRandomWord = function () {
    //   var index = Math.round(Math.random() * words.length);
    //   return words[index];
    // };

    // Start game
    $scope.onePlayer = function () {
      //$scope.classList.add("hidden");
      $scope.isSelected = function () {
        return true;
      };
      $scope.IsVisible = true;
      displayOnePlayerQuestion();
    };

    var displayOnePlayerQuestion = function () {
      var numberWrong = 0;
      // Function to pick a random number between two integers
      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      // Get a random word from the API, between 3 and 7 letters long
      fetch(
        `https://www.wordgamedb.com/api/v1/words/?numLetters=${randomIntFromInterval(
          3,
          7
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          let randomWord = data[Math.floor(Math.random() * data.length)];
          console.log(randomWord);
          let letters = randomWord.word.toUpperCase().split([,]);
          $scope.gall = {
            top: "200px",
          };
          $scope.categoryb = `
          <h2 aria-label="Category: ${randomWord.category}, ${randomWord.word.length} letters">${randomWord.category}</h2>
        `;
          const displayedLetter = letters
            .map(
              (letter, index) =>
                `<span class="letterSpace">letter ${
                  index + 1
                }<span aria-hidden="true" class="correct">${letter}</span></span>`
            )
            .join(" ");
          $scope.blankb = displayedLetter;
          $scope.guess = function ($event) {
            if (typeof $scope.input.letter == "string") {
              var guessValue = $scope.input.letter.toUpperCase();
              let correct = $document[0].querySelectorAll(".correct");
              $event.preventDefault();

              if (
                guessValue.match($scope.validGuess) &&
                !$scope.userGuess.includes(guessValue)
              ) {
                // Push guessed letter to array. If not a valid guess, alert.
                $scope.userGuess.push(guessValue);
                // Add a body part for each incorrect guess
                displayBodyParts();

                // Alert if guess is not valid
              } else if (!guessValue.match($scope.validGuess)) {
                $scope.alerttextb = "<h3>Please enter a valid guess!</h3>";
                showModal();

                // Alert if letter has already been guessed
              } else if (
                guessValue.match($scope.validGuess) &&
                $scope.userGuess.includes(guessValue)
              ) {
                $scope.alerttextb = "<h3>You already guessed that letter!</h3>";
                showModal();
              }
              // If user guess is correct, make the letter appear in the word
              for (let i = 0; i < letters.length; i++) {
                if (letters.includes(guessValue)) {
                  if (correct[i].innerHTML === guessValue) {
                    correct[i].classList.add("visible");
                    correct[i].setAttribute("aria-hidden", "false");
                  }
                }
              }

              // Function to add body parts for incorrect guesses
              function displayBodyParts() {
                var body = angular.element(document.querySelector(".body"));
                if (!letters.includes(guessValue)) {
                  $scope.incorrectLettersChosen.push(guessValue);
                  numberWrong++;
                  if (numberWrong == 1) {
                    //head.classList.remove("hidden");
                    $scope.isSelected1 = function () {
                      return true;
                    };
                    body.attr("aria-label", "one of six body parts visible");
                  }
                  if (numberWrong === 2) {
                    //torso.classList.remove("hidden");
                    $scope.isSelected2 = function () {
                      return true;
                    };
                    body.attr("aria-label", "two of six body parts visible");
                  }
                  if (numberWrong === 3) {
                    //leftArm.classList.remove("hidden");
                    $scope.isSelected3 = function () {
                      return true;
                    };
                    body.attr("aria-label", "three of six body parts visible");
                  }
                  if (numberWrong === 4) {
                    //rightArm.classList.remove("hidden");
                    $scope.isSelected4 = function () {
                      return true;
                    };
                    body.attr("aria-label", "four of six body parts visible");
                  }
                  if (numberWrong === 5) {
                    //leftLeg.classList.remove("hidden");
                    $scope.isSelected5 = function () {
                      return true;
                    };
                    body.attr("aria-label", "five of six body parts visible");
                  }
                  if (numberWrong === 6) {
                    //rightLeg.classList.remove("hidden");
                    $scope.isSelected6 = function () {
                      return true;
                    };
                    body.attr(
                      "aria-label",
                      "all body parts visible, you have been hanged!"
                    );
                  }
                }
              }

              // If all letters have been guessed correctly, player wins
              if (
                $document[0].querySelectorAll(".correct.visible").length ===
                letters.length
              ) {
                //$window.alert("Please enter your name!");
                $scope.alerttextb = "<h3>You win!</h3>";
                showModal();
                $scope.isSelectedpl = function () {
                  return true;
                };
                //hangman.playAgain.classList.remove("hidden");
                //onePlayerGuessForm.classList.remove("active");
                $scope.isSelected = function () {
                  return false;
                };
              }

              if (numberWrong === 6) {
                $scope.alerttextb = "<h3>You lose!</h3>";
                showModal();
                //hangman.playAgain.classList.remove("hidden");
                $scope.isSelectedpl = function () {
                  return true;
                };
                //onePlayerGuessForm.classList.remove("active");
                $scope.isSelected = function () {
                  return false;
                };
                // Show the correct word
                for (let i = 0; i < letters.length; i++) {
                  correct[i].classList.add("visible");
                  correct[i].setAttribute("aria-hidden", "true");
                }
              }
              $scope.input.letter = "";
            } else {
              $event.preventDefault();
              $scope.alerttextb = "<h3>Please enter a valid guess!</h3>";
              showModal();
              $scope.input.letter = "";
            }
          };
        });
    };

    $scope.again = function () {
      //$route.reload();
      $window.location.reload();
    };
  },
]);
