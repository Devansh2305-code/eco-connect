function startSurvey() {
  document.getElementById("def").style.display = "none";
  document.getElementById("calculator").style.display = "block";
  scrollTo(0, 100);
}

function calculate() {
  if (allComplete()) {
    document.getElementById("calculator").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("reducefootprint").style.display = "block";
    scrollTo(0, 100);
    var totalscore = 0;
    var sizescore = sizeScore();
    var locationscore = locationScore();
    var dietscore = dietScore();
    var foodscore = foodScore();
    var trashscore = trashScore();
    var recyclescore = recycleScore();
    var travelscore = travelScore();
    totalscore += sizescore;
    totalscore += locationscore;
    totalscore += dietscore;
    totalscore += foodscore;
    totalscore += trashscore;
    totalscore += recyclescore;
    totalscore += travelscore;
    document.getElementById("totalscore").innerHTML = `Your 
score was: ${totalscore}`;
    showFootSize(totalscore);
  } else {
    alert("Please answer all of the questions.");
  }
}

function showFootSize(score) {
  document.getElementById("footsize").style.display = "block";
  if (score >= 21) document.getElementById("bigfoot").style.display = "block";
  else if (score >= 13)
    document.getElementById("mediumfoot").style.display = "block";
  else document.getElementById("littlefoot").style.display = "block";
}

function allComplete() {
  if (!fourChecked("size")) return false;
  if (!fourChecked("location")) return false;
  if (!fourChecked("diet")) return false;
  if (!fourChecked("food")) return false;
  if (!threeChecked("trash")) return false;
  if (!threeChecked("recycle")) return false;
  if (!fourChecked("travel")) return false;
  else return true;
}

function sizeScore() {
  var sizes = document.getElementsByName("size");
  var score = 0;
  if (sizes[0].checked) score = 1;
  if (sizes[1].checked) score = 2;
  if (sizes[2].checked) score = 3;
  if (sizes[3].checked) score = 4;
  return score;
}

function fourChecked(name) {
  var list = document.getElementsByName(name);
  if (list[0].checked) return true;
  if (list[1].checked) return true;
  if (list[2].checked) return true;
  if (list[3].checked) return true;
  return false;
}

function threeChecked(name) {
  var list = document.getElementsByName(name);
  if (list[0].checked) return true;
  if (list[1].checked) return true;
  if (list[2].checked) return true;
  return false;
}

function locationScore() {
  var locations = document.getElementsByName("location");
  var score = 0;
  if (locations[0].checked) score = 4;
  if (locations[1].checked) score = 2;
  if (locations[2].checked) score = 3;
  if (locations[3].checked) score = 1;
  return score;
}

function dietScore() {
  var diets = document.getElementsByName("diet");
  var score = 0;
  if (diets[0].checked) score = 2;
  if (diets[1].checked) score = 4;
  if (diets[2].checked) score = 1;
  if (diets[3].checked) score = 3;
  return score;
}

function foodScore() {
  var foods = document.getElementsByName("food");
  var score = 0;
  if (foods[0].checked) score = 2;
  if (foods[1].checked) score = 3;
  if (foods[2].checked) score = 1;
  if (foods[3].checked) score = 4;
  return score;
}

function trashScore() {
  var trashes = document.getElementsByName("trash");
  var score = 0;
  if (trashes[0].checked) score = 1;
  if (trashes[1].checked) score = 2;
  if (trashes[2].checked) score = 3;
  return score;
}

function recycleScore() {
  var recycles = document.getElementsByName("recycle");
  var score = 0;
  if (recycles[0].checked) score = 1;
  if (recycles[1].checked) score = 2;
  if (recycles[2].checked) score = 3;
  return score;
}

function travelScore() {
  var travels = document.getElementsByName("travel");
  var score = 0;
  if (travels[0].checked) score = 4;
  if (travels[1].checked) score = 2;
  if (travels[2].checked) score = 3;
  if (travels[3].checked) score = 1;
  return score;
}
