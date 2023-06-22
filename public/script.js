//The p5js animation of wave is modified from https://editor.p5js.org/pippinbarr/sketches/bgKTIXoir
// How many rows of waves to display
let rows = 5;
// What is the range of motion for a single wave (vertically)
let waveMaxHeight = window.innerHeight/3;
// A base time value for our noise() function which we'll
// use to move the waves overall
let baseT = 0;

function setup() {
  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('wave');
}

function draw() {
  background('white');
  
  drawWaves(rows);
}

/**
Draws the specified number of waves on the canvas!
*/
function drawWaves(number) {
  // Loop through all our rows and draw each wave
  // We loop "backwards" to draw them one on top of the other
  // nicely
  for (let i = number; i >= 0; i--) {
    drawWave(i, number);
  }
  // Increment the base time parameter so that the waves move
  baseT += 0.01;
}

/**
Draws the nth wave.

Paramters are
* n - the number of the wave
* rows - the total number of waves
*/
function drawWave(n, rows) {
  // Calculate the base y for this wave based on an offset from the
  // bottom of the canvas and subtracting the number of waves
  // to move up. We're dividing the wave height in order to make the
  // waves overlap
  let baseY = height - n*waveMaxHeight/3;
  // Get the starting time parameter for this wave based on the
  // base time and an offset based on the wave number
  let t = baseT + n*100;
  // We'll start each wave at 0 on the x axis
  let startX = 0;
  // Let's start drawing
  push();
  // We'll use the HSB model to vary their color more easily
  colorMode(HSB);
  // Calculate the hue (0 - 360) based on the wave number, mapping
  // it to an HSB hue value
  let hue = map(n, 0, rows, 190, 230);
  let brightness = map(n, 0, rows, 100, 70);
  fill(hue, 70, brightness);
  noStroke();
  // We're using vertex-based drawing
  beginShape();
  // Starting vertex!
  vertex(startX, baseY);
  // Loop along the x axis drawing vertices for each point
  // along the noise() function in increments of 10
  for (let x = startX; x <= width; x += 10) {
    // Calculate the wave's y based on the noise() function
    // and the baseY
    let y = baseY - map(noise(t), 0, 1, 10, waveMaxHeight);
    // Draw our vertex
    vertex(x, y);
    // Increment our time parameter so the wave varies on y
    t += 0.01;
  }
  // Draw the final three vertices to close the shape around
  // the edges of the canvas
  vertex(width, baseY);
  vertex(width, height);
  vertex(0, height);
  // Done!
  endShape();
}
let refreshButton = document.getElementById("reloadImage");
let form = document.getElementById("noteForm");
let bigButton = document.getElementById("createButton");
let firstInput = document.getElementById("firstPage");
let libraryPanel = document.getElementById("library");
let cancelButton = document.getElementById("cancel");
let icon = document.getElementById("icon");
let dname = document.getElementById("displayName");
let dcate = document.getElementById("displayCate");
let dsa = document.getElementById("displaySa");
let dchar = document.getElementById("displayChar");
let dimg = document.getElementById("displayImg");
let dnote = document.getElementById("displayNote");
let dhistory = document.getElementById("displayhistory");
let popup = document.getElementById("popup");
let closebutton = document.getElementById("displayClose");
let noteInformation = [];
function addNote(name, category, sashimi, img, notes, characteristics, history) {
  let note = {
    name,
    category,
    notes,
    id: Date.now(),
    date: new Date().toISOString(),
    sashimi,
    img,
    characteristics,
    history
  }
  noteInformation.push(note);
  console.log(noteInformation);
}

function storageCheck(){
  noteInformation = JSON.parse(localStorage.getItem('notes'));
  if (noteInformation.length == 0) {
    libraryPanel.style.display = "none";
    firstInput.style.display = 'grid';
  }else {
    library();
  }
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
function library(){
  removeAllChildNodes(libraryPanel);
  let noteArray = JSON.parse(localStorage.getItem('notes'));
  noteArray.forEach((singleNote) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let img = document.createElement("img");
    img.setAttribute("src", singleNote.img);
    let name = document.createElement('h2');
    name.textContent = singleNote.name;
    let cate = document.createElement("p");
    cate.innerHTML = singleNote.category;
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Note";
    deleteButton.addEventListener('click', function(event){
      noteArray.splice(noteArray.indexOf(singleNote), 1);
      noteInformation = noteArray
      localStorage.setItem('notes', JSON.stringify(noteInformation));
      card.remove();
      storageCheck();
    });
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(cate);
    card.appendChild(deleteButton);
    card.addEventListener('click', function(event){
      popup.style.display = "grid";
      dname.innerHTML = singleNote.name;
      dcate.innerHTML = singleNote.category;
      dsa.innerHTML = singleNote.sashimi;
      dchar.innerHTML = singleNote.characteristics;
      dimg.src = singleNote.img;
      dnote.innerHTML = singleNote.notes;
      dhistory.innerHTML = singleNote.history;
    })
    libraryPanel.appendChild(card);
    libraryPanel.style.display = "grid";
    });
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  let img = document.createElement("img");
  img.setAttribute("src", icon.src);
  let word = document.createElement("p");
  word.innerHTML = "Create new Note";
  card.appendChild(img);
  card.appendChild(word);
  libraryPanel.appendChild(card);
  card.addEventListener('click', function(event){
    libraryPanel.style.display = "none";
    form.style.display = "block";
  });
};

refreshButton.addEventListener('click', function(){
  let imageLeft = document.getElementById("leftImg");
  let url = document.getElementById('img').value;
  imageLeft.src = url;
});


form.addEventListener('submit', function(event){
  event.preventDefault();
  addNote(
    form.elements.name.value, 
    form.elements.category.value, 
    form.elements.sashimi.value,
    form.elements.img.value,
    form.elements.note.value,
    form.elements.chara.value,
    form.elements.history.value
  );
  form.reset();
  form.style.display = "none";
  localStorage.setItem('notes', JSON.stringify(noteInformation));
  library();
});


bigButton.addEventListener('click', function(){
  firstInput.style.display = "none";
  form.style.display = "block";
});

cancelButton.addEventListener('click', function(event){
  form.reset();
  form.style.display = "none";
  storageCheck();
});

closebutton.addEventListener("click", function(event){
  popup.style.display = "none";
});
storageCheck();