const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayDesc = document.getElementById('overlay-desc');
const startBtn = document.getElementById('start-btn');

// Configuración del juego
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let gameSpeed = 120; // Milisegundos por frame (menor es más rápido)

// Variables del juego
let snake = [];
let dx = 0;
let dy = 0;
let foodX;
let foodY;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoopId;
let gameActive = false;

// Inicializar el High Score
highScoreElement.textContent = highScore;

// Event Listeners
document.addEventListener('keydown', handleKeyPress);
startBtn.addEventListener('click', startGame);

function initGame() {
    // Posición inicial de la serpiente (en el centro)
    snake = [
        { x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }
    ];
    
    // Dirección inicial (quieta)
    dx = 0;
    dy = 0;
    
    score = 0;
    scoreElement.textContent = score;
    gameSpeed = 120;
    
    placeFood();
}

function startGame() {
    if (gameActive) return;
    
    initGame();
    gameActive = true;
    overlay.classList.add('hidden');
    
    // Empezar moviéndose a la derecha
    dx = 1;
    dy = 0;
    
    if (gameLoopId) clearTimeout(gameLoopId);
    gameLoop();
}

function gameOver() {
    gameActive = false;
    clearTimeout(gameLoopId);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    overlayTitle.textContent = "¡Juego Terminado!";
    overlayTitle.style.color = "var(--danger-color)";
    overlayDesc.textContent = `Lograste un puntaje de ${score}. ¿Quieres intentar de nuevo?`;
    startBtn.textContent = "Jugar de nuevo";
    
    overlay.classList.remove('hidden');
}

function gameLoop() {
    if (!gameActive) return;
    
    update();
    draw();
    
    gameLoopId = setTimeout(gameLoop, gameSpeed);
}

function update() {
    // Calcular nueva posición de la cabeza
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Verificar colisión con paredes
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // Verificar colisión consigo misma
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
    
    // Mover la serpiente (añadir nueva cabeza)
    snake.unshift(head);
    
    // Verificar si comió la comida
    if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreElement.textContent = score;
        
        // Aumentar velocidad ligeramente al comer
        if (gameSpeed > 60) {
            gameSpeed -= 2;
        }
        
        placeFood();
    } else {
        // Si no comió, remover la cola
        snake.pop();
    }
}

function draw() {
    // Limpiar el canvas
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--canvas-bg').trim() || '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar cuadrícula (opcional, para un look más técnico)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for(let i=0; i<=canvas.width; i+=gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    
    // Dibujar comida
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--food-color').trim() || '#f43f5e';
    ctx.shadowBlur = 10;
    ctx.shadowColor = ctx.fillStyle;
    ctx.beginPath();
    ctx.arc(foodX * gridSize + gridSize/2, foodY * gridSize + gridSize/2, gridSize/2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow
    
    // Dibujar serpiente
    const headColor = getComputedStyle(document.documentElement).getPropertyValue('--snake-head').trim() || '#34d399';
    const bodyColor = getComputedStyle(document.documentElement).getPropertyValue('--snake-body').trim() || '#10b981';
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? headColor : bodyColor;
        
        // Estilo de bloque redondeado para la serpiente
        const x = snake[i].x * gridSize;
        const y = snake[i].y * gridSize;
        const padding = 1;
        const size = gridSize - (padding * 2);
        const radius = 4;
        
        ctx.beginPath();
        ctx.roundRect(x + padding, y + padding, size, size, radius);
        ctx.fill();
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    
    // Asegurar que la comida no aparezca sobre la serpiente
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === foodX && snake[i].y === foodY) {
            placeFood();
            return;
        }
    }
}

function handleKeyPress(e) {
    if (!gameActive) return;
    
    // Prevenir scrolling con las flechas
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    
    const key = e.key;
    
    // Arriba
    if ((key === 'ArrowUp' || key === 'w' || key === 'W') && dy === 0) {
        dx = 0;
        dy = -1;
    }
    // Abajo
    else if ((key === 'ArrowDown' || key === 's' || key === 'S') && dy === 0) {
        dx = 0;
        dy = 1;
    }
    // Izquierda
    else if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && dx === 0) {
        dx = -1;
        dy = 0;
    }
    // Derecha
    else if ((key === 'ArrowRight' || key === 'd' || key === 'D') && dx === 0) {
        dx = 1;
        dy = 0;
    }
}

// Dibujar estado inicial
draw();
