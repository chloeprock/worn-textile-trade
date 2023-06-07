class Patch {
    constructor(x, rw, y, rh, importer, exporter, margin, translateX, translateY, valPer, amplitude, frequency, threadSpace, weight) {
        this.visible = false; 
        this.x = x;
        this.rw = rw;
        this.y = y;
        this.rh = rh;
        this.importer = importer;
        this.exporter = exporter;
        this.margin = margin;
        this.translateX = translateX;
        this.translateY = translateY;
        this.valPer = valPer;
        this.amplitude = amplitude;
        this.frequency = frequency; 
        this.threadSpace = threadSpace; 
        this.weight = weight; 
    }

    //draw the patches with hover function 
    patch() {
        let x = this.x;
        let y = this.y;
        let rw = this.rw;
        let rh = this.rh;
        let valPer = this.valPer;
        let translateX = this.translateX;
        let translateY = this.translateY;

        if ((mouseX > (x + translateX)) && (mouseX < (x + translateX + (rw))) && (mouseY > y + translateY) && (mouseY < (y + translateY + rh))) {
            noFill();

        } else {
            colorMode(HSB, 360, 100, 100, 100);
            let sat = 1;
            if (valPer > 0) {
                sat = map(valPer, 0.00087476, 2, 0.34510256, 100);
                fill(255, sat, 75, 100);
            }
            if (rh < 3) { rh = 3; }
            rect(x, y, rw, rh);
            colorMode(RGB, 255, 255, 255);
        }
    }

    //draw the threads with hover function 
    threads() {
        let x = this.x;
        let y = this.y;
        let rw = this.rw;
        let rh = this.rh;
        let amplitude = this.amplitude;
        let frequency = this.frequency;
        let threadSpace = this.threadSpace;
        let translateX = this.translateX;
        let translateY = this.translateY;

        if ((mouseX > (x + translateX)) && (mouseX < (x + translateX + (rw))) && (mouseY > y + translateY) && (mouseY < (y + translateY + rh))) {
            stroke(5, 0, 158);
            strokeWeight(1);
            for (
                let yy = y + threadSpace;
                yy <= y - threadSpace + rh;
                yy += threadSpace * 3) {
                if (rh < 3) {
                    rh = 3;
                }
                noFill();
                beginShape();
                for (let i = 0; i < 10; i++) {
                    let x1 = x + 5 + i * (rw - 10) / 10;
                    let y1 = yy + (translateY / rh);
                    let x2 = x + 5 + (i + 1) * (rw - 10) / 10;
                    let y2 = yy + (translateY / rh);
                    let cx1 = x1 + (rw - 10) / 20;
                    let cy1 = y1 + (-amplitude) * frequency;
                    let cx2 = x2 - (rw - 10) / 20;
                    let cy2 = y2 + (-amplitude) * frequency;
                    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
                }
                endShape();
            }
        } else {
            noStroke();
        }
    }

    //draw the points 
    points() {
        let x = this.x;
        let y = this.y;
        let rw = this.rw;
        let rh = this.rh;
        let threadSpace = this.threadSpace;


        stroke(255, 106, 0);
        strokeWeight(3);
        if (rh > threadSpace) {
            for (
                let yy = y + threadSpace;
                yy < y - threadSpace + rh;
                yy += threadSpace * 3) {
                strokeCap(ROUND);
                line(x + 5, yy, x + 10, yy);
            }
        }

        stroke(255, 106, 0);
        strokeWeight(3);
        if (rh > threadSpace) {
            for (
                let yy = y + threadSpace;
                yy < y - threadSpace + rh;
                yy += threadSpace * 3) {
                strokeCap(ROUND);
                line(x + rw - 5, yy, x + rw - 10, yy)
            }
        }
    }

    labels() {
        let x = this.x;
        let y = this.y;
        let rw = this.rw;
        let rh = this.rh;
        let importer = this.importer;
        let exporter = this.exporter;
        let margin = this.margin;
        let translateX = this.translateX;
        let translateY = this.translateY;
        let weight = this.weight; 

        noStroke();
        if ((mouseX > (x + translateX)) && (mouseX < (x + translateX + (rw))) && (mouseY > y + translateY) && (mouseY < (y + translateY + rh))) {
            textAlign(LEFT);
            textSize(18);
            textFont('Courier New');
            textStyle(BOLD);

            // Calculate the maximum width of the text based on the width of the rectangle
            let maxTextWidth = rw - 2 * margin;
            let textLines = [];

            // Split the text into an array of words
            //let words = (importer + " imported " + weight.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " kgs from " + exporter).split(" ");

            let words = (importer + " imported " + weight.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " kgs from " + exporter).split(" ");


            // Start with an empty line
            let line = "";

            // Loop through each word in the array
            for (let i = 0; i < words.length; i++) {
                // Add the current word to the line
                let testLine = line + words[i] + " ";

                // Check if the line width exceeds the maximum text width
                if (textWidth(testLine) > maxTextWidth) {
                    // If so, push the current line to the array of text lines and start a new line with the current word
                    textLines.push(line.trim());
                    line = words[i] + " ";
                } else {
                    // Otherwise, add the current word to the line
                    line = testLine;
                }
            }

            // Add the final line to the array of text lines
            textLines.push(line.trim());

            // Calculate the height of the text labels
            let textHeight = textLines.length * 20 + margin * 2;

            // Set the fill color for the shaded rectangle
            let rectFill = color(255, 255, 255, 190);

            // Draw the shaded rectangle behind the text labels
            fill(rectFill);
            rect(x - rw / 6, y - textHeight - 12, rw + 10, textHeight, 3);

            // Loop through the array of text lines and draw each line of text
            fill(5, 0, 158);
            for (let i = 0; i < textLines.length; i++) {
                text(textLines[i], x - rw / 10, y - textHeight + margin + i * 20);
            }

        }
    }

    //add hover function to labels 
    //     blockHover() {
    //     let x = this.x;
    //     let y = this.y;
    //     let rw = this.rw; 
    //     let rh = this.rh; 
    //     let translateX = this.translateX;
    //     let translateY = this.translateY; 

    //     noStroke();
    //     if ((mouseX > (x + translateX)) && (mouseX < (x + translateX + (rw))) && (mouseY > y + translateY) && (mouseY < (y + translateY + rh))) {
    //         fill(5, 0, 158); // change color when mouse is hovering  
    //         labels();
    //     } 
    //     else {
    //         fill(185, 184, 219);
    //     }
    // }

}
