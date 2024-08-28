const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
let mazeGrid = [];
let startX, startY, endX, endY;

document.getElementById('mazeImage').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            processImage();
        };
        img.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

function processImage() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    mazeGrid = [];

    for (let y = 0; y < canvas.height; y++) {
        mazeGrid[y] = [];
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const avg = (r + g + b) / 3;

            // Assuming black is the wall and white is the path
            if (avg < 128) {
                mazeGrid[y][x] = 1; // Wall
            } else {
                mazeGrid[y][x] = 0; // Path
            }
        }
    }

    // Setting start and end points (hardcoded for now)
    startX = 1; startY = 1;
    endX = canvas.width - 2; endY = canvas.height - 2;

    drawGrid();
}

function drawGrid() {
    for (let y = 0; y < mazeGrid.length; y++) {
        for (let x = 0; x < mazeGrid[y].length; x++) {
            if (mazeGrid[y][x] === 1) {
                ctx.fillStyle = 'black';
            } else {
                ctx.fillStyle = 'white';
            }
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function solveMaze() {
    if (!mazeGrid || mazeGrid.length === 0) {
        alert("Please upload a maze image first.");
        return;
    }

    const path = [];
    const visited = new Set();

    function dfs(x, y) {
        if (x < 0 || y < 0 || x >= mazeGrid[0].length || y >= mazeGrid.length) return false; // Out of bounds
        if (x === endX && y === endY) return true; // Reached the end
        if (mazeGrid[y][x] === 1 || visited.has(${x},${y})) return false; // Hit a wall or already visited

        visited.add(${x},${y});
        path.push([x, y]);

        if (dfs(x + 1, y) || dfs(x - 1, y) || dfs(x, y + 1) || dfs(x, y - 1)) return true;

        path.pop();
        return false;
    }

    if (dfs(startX, startY)) {
        for (const [x, y] of path) {
            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, 1, 1);
        }
    } else {
        alert("No solution found for the maze.");
    }
}oadResumes;