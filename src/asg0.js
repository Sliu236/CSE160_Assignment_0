/*[student's name: Size Liu]
[sliu236@ucsc.edu 1852375]

Notes to Grader:
[N/A]*/



// delete the original draw function, replace it with Canvas 2D
function main() {
    let canvas = document.getElementById("webgl");

    // Retrieve Canvas 2D rendering context (modify the from the WebGL example)
    let ctx = canvas.getContext("2d");
    if(!ctx) {
        console.error("Failed to get Canvas 2D context.")
        return;
    }

    ctx.fillStyle = "black"; // Set the background to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color

    let v1 = new Vector3([2.25, 2.25, 0.0]); // Create a new vector (v1, red)
    drawVector(ctx, v1, "red"); // Draw the vector v1

}


function drawVector(ctx, v, color){   // delete the original draw function, replace it with this one (Canvas 2D)
    const widthofCanvas = ctx.canvas.width;
    const heightofCanvas = ctx.canvas.height;
    const centerofCanvasX = widthofCanvas / 2;
    const centerofCanvasY = heightofCanvas / 2;

    ctx.strokeStyle = color; // Set the color of the vector
    ctx.lineWidth = 2; // Set the width of the vector

    // Draw the vector
    ctx.beginPath(); // Start drawing
    ctx.moveTo(centerofCanvasX, centerofCanvasY); // Move to the center of the canvas

    // Calculate the end point of the vector
    let endpointX = centerofCanvasX + v.elements[0] * 20; // Scale the vector by 20
    let endpointY = centerofCanvasY - v.elements[1] * 20; // Scale the vector by 20

    ctx.lineTo(endpointX, endpointY); // Draw the vector
    ctx.stroke(); // Finish drawing
}

function handleDrawEvent() {
    let canvas = document.getElementById("webgl");

    // Retrieve Canvas 2D rendering context (modify the from the WebGL example)
    let ctx = canvas.getContext("2d");
    if(!ctx) {
        console.error("Failed to get Canvas 2D context.")
        return;
    }

    ctx.fillStyle = "black"; // Set the background to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color

    let v1x = parseFloat(document.getElementById("v1x").value); // Get the x-coordinate of the vector V1
    let v1y = parseFloat(document.getElementById("v1y").value); // Get the y-coordinate of the vector V1
    let v2x = parseFloat(document.getElementById("v2x").value); // Get the x-coordinate of the vector V2
    let v2y = parseFloat(document.getElementById("v2y").value); // Get the y-coordinate of the vector V2

    if (isNaN(v1x) || isNaN(v1y) || isNaN(v2x) || isNaN(v2y)) { // Check if the input is valid
        console.error("Invalid input.");
        return;
    }

    let v1 = new Vector3([v1x, v1y, 0.0]); // Create a new vector (v1, red)
    let v2 = new Vector3([v2x, v2y, 0.0]); // Create a new vector (v2, blue)
    drawVector(ctx, v1, "red"); // Draw the vector v1
    drawVector(ctx, v2, "blue"); // Draw the vector v2
}

function handleDrawOperationEvent() {
    let canvas = document.getElementById("webgl");
    let ctx = canvas.getContext("2d");
    if(!ctx) {
        console.error("Failed to get Canvas 2D context.")
        return;
    }

    ctx.fillStyle = "black"; // Set the background to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color

    let v1x = parseFloat(document.getElementById("v1x").value); // Get the x-coordinate of the vector V1
    let v1y = parseFloat(document.getElementById("v1y").value); // Get the y-coordinate of the vector V1
    let v2x = parseFloat(document.getElementById("v2x").value); // Get the x-coordinate of the vector V2
    let v2y = parseFloat(document.getElementById("v2y").value); // Get the y-coordinate of the vector V2

    if (isNaN(v1x) || isNaN(v1y) || isNaN(v2x) || isNaN(v2y)) { // Check if the input is valid
        console.error("Invalid input.");
        return;
    }

    let v1 = new Vector3([v1x, v1y, 0.0]); // Create a new vector (v1, red)
    let v2 = new Vector3([v2x, v2y, 0.0]); // Create a new vector (v2, blue)
    drawVector(ctx, v1, "red"); // Draw the vector v1
    drawVector(ctx, v2, "blue"); // Draw the vector v2

    let operation = document.getElementById("operation").value; // Get the operation
    let scalar = parseFloat(document.getElementById("scalar").value); // Get the scalar

    if (operation === "add") {
        let v3 = new Vector3(v1.elements.slice()); // Create a new vector (v3, green)
        v3.add(v2);  // Add v2 to v1
        drawVector(ctx, v3, "green"); 
    } else if (operation === "sub") {
        let v3 = new Vector3(v1.elements.slice()); // Create a new vector (v3, green)
        v3.sub(v2);  // Subtract v2 from v1
        drawVector(ctx, v3, "green");
    } else if (operation === "mul") {
        if (isNaN(scalar)) { // Check if the input is valid
            console.error("Invalid input.");
            return;
        }
        let v3 = new Vector3(v1.elements.slice()); // Create a new vector (v3, green)
        let v4 = new Vector3(v2.elements.slice()); // Create a new vector 
        v3.mul(scalar);  // Multiply v1 by the scalar
        v4.mul(scalar);  // Multiply v2 by the scalar
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    } else if (operation === "div") {
        if (isNaN(scalar || scalar === 0)) { // Check if the input is valid
            console.error("Invalid input.");
            return;
        }
        let v3 = new Vector3(v1.elements.slice()); // Create a new vector (v3, green)
        let v4 = new Vector3(v2.elements.slice()); // Create a new vector 
        v3.div(scalar);  // Divide v1 by the scalar
        v4.div(scalar);  // Divide v2 by the scalar
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    } else if (operation === "magnitude") {
        console.log("v1 magnitude: ", v1.magnitude());
        console.log("v2 magnitude: ", v2.magnitude());
    } else if (operation === "normalize") {
        let v3 = new Vector3(v1.elements.slice()); // Create a new vector (v3, green)
        let v4 = new Vector3(v2.elements.slice()); // Create a new vector 
        v3.normalize();  // Normalize v1
        v4.normalize();  // Normalize v2
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    } else if (operation == "angle") {
        let Radians = angleBetweenVectors(v1, v2); // Calculate the angle between v1 and v2
        console.log("Angle between v1 and v2: ", Radians); // Print the angle in degrees
    } else if (operation == "area") {
        let area = areaTriangle(v1, v2); // Calculate the area of the triangle formed by v1 and v2
        console.log("Area of the triangle: ", area); 
    }
}

function angleBetweenVectors(v1, v2) {
    let dotProduct = Vector3.dot(v1, v2); // Calculate the dot product of v1 and v2

    let v1Mag = v1.magnitude(); // Calculate the magnitude of v1
    let v2Mag = v2.magnitude(); // Calculate the magnitude of v2

    if (v1Mag === 0 || v2Mag === 0) { // Check if the magnitude is 0
        console.error("Invalid input, there must be a zero in your vector.");
        return NaN;
    }

    let cosAlpha = dotProduct / (v1Mag * v2Mag); // Calculate the cosine of the angle between v1 and v2
    cosAlpha = Math.max(-1, Math.min(1, cosAlpha)); // Clamp the value to [-1, 1]
    let radian = Math.acos(cosAlpha); // Calculate the angle in radians

    return radian * 180 / Math.PI; // Convert the angle to degrees
}

function areaTriangle(v1, v2) {
    let v3 = Vector3.cross(v1, v2); // Calculate the cross product of v1 and v2
    return 0.5 * v3.magnitude(); // Return the area of the triangle
}