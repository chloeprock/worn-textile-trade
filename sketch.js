
let tableData;
let countryData;
let rowsDisplay = []; // new Array();
let rw;
let rh;
let x;
let y;
let margin;
let weight;
let rows;
let importer;
let exporter;
let valPer;
let threadSpace;
let numPoints;
let amplitude;
let frequency;
let translateX;
let translateY;
let patches = []; //an array to store the patches 
let count = 0;

function preload() {
  tableData = loadTable('ord4.csv', 'csv', 'header')
}

function setup() {
  rowsDisplay = clearFilter();
  let canvas = createCanvas(windowWidth, windowHeight * 4);
  canvas.parent('canvas-container');
  rows = tableData.getRows();
  console.log("Number of rows in table: " + rows.length);

  margin = windowWidth / 750;
  x = margin;
  y = margin;
  translateX = margin * 40;
  translateY = margin * 60;
  translate(translateX, translateY);

  setupData(); 

}

function draw() {
  background(255, 255, 255);
  //fill(0);
  //text(patches.length, 100, 100); 
  translate(translateX, translateY);

  for (let i = 0; i < 30; i++) {

    if (count < patches.length) {
      patches[count].visible = true;
      count++;
    }
  }

  for (let patch of patches) {
    if (patch.visible) {
      patch.patch();
      patch.threads();
      patch.points();
      patch.labels();
    }
  }
}

function filterRows(imp) {
  let set = [];
  count = 0; // reset count
  for (let i = 0; i <= tableData.getRowCount(); i++) {
    let currentRow = tableData.getRows()[i];
    if (currentRow && currentRow.getString("Importer") == imp) {
      set.push(currentRow);
      console.log(currentRow); 
    }
  }
  return set;
}

function filterRows2(exp) {
  let set = [];
  count = 0; // reset count
  for (let i = 0; i <= tableData.getRowCount(); i++) {
    let currentRow = tableData.getRows()[i];
    if (currentRow && currentRow.getString("Exporter") == exp) {
      set.push(currentRow);
      console.log(currentRow); 
    }
  }
  return set;
}

function updateDropdownImport() {
  let dropdown = select("#dropdownImport");
  rowsDisplay = filterRows(dropdown.value());
  //console.log(patch); 
  setupData(); 
}

function updateDropdownExport() {
  let dropdown = select("#dropdownExport");
  rowsDisplay = filterRows2(dropdown.value());
  //console.log(patch); 
  setupData(); 
}

function clearFilter() {
  return tableData.getRows();
}

function reset() {
  rowsDisplay = tableData.getRows();
  //console.log(rowsDisplay); 
  setupData();

    // reset the dropdown display to the first entry in the dataset
    document.getElementById("dropdownImport").selectedIndex = 0;
    document.getElementById("dropdownExport").selectedIndex = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setupData() {

  //console.log(rowsDisplay.length); 
  
  patches = []; 
  
  x = 0; 
  y = 0; 
  
  if (tableData && rows) {
    for (let currentRow of rowsDisplay) {
      //console.log("hello"); 
      weight = currentRow.getNum("WeightKG");

      //console.log(weight); 

      importer = currentRow.getString("Importer");
      exporter = currentRow.getString("Exporter");
      valPer = currentRow.getString("ValPerKG");
      rw = windowWidth / 8;
      rh = (((weight)) / (windowWidth * 250));
      threadSpace = 4;
      amplitude = 30;
      frequency = 0.4;

      patches.push(new Patch(x, rw, y, rh, importer, exporter, margin, translateX, translateY, valPer, amplitude, frequency, threadSpace, weight));

      if (y + rh + margin >= windowHeight * 3.8 - rh - 100) {
        x += rw + margin;
        y = margin;
      } else {
        y += rh + margin;
      }
    }
  }

//console.log(patches.length); 

}
