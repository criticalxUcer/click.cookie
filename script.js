// Загрузка данных из localStorage или инициализация значениями по умолчанию
function loadGameData() {
    return {
        balance: parseInt(localStorage.getItem('balance')) || 0,
        incomeRate: parseInt(localStorage.getItem('incomeRate')) || 0,
        clickRate: parseInt(localStorage.getItem('clickRate')) || 1,
        incomePerSecCost: parseInt(localStorage.getItem('incomePerSecCost')) || 10,
        incomePerClickCost: parseInt(localStorage.getItem('incomePerClickCost')) || 5,
        rank: parseInt(localStorage.getItem('rank')) || 1,
        progress: parseInt(localStorage.getItem('progress')) || 0
    };
}

// Функция для сохранения данных в localStorage
function saveGameData() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('incomeRate', incomeRate);
    localStorage.setItem('clickRate', clickRate);
    localStorage.setItem('incomePerSecCost', incomePerSecCost);
    localStorage.setItem('incomePerClickCost', incomePerClickCost);
    localStorage.setItem('rank', rank);
    localStorage.setItem('progress', progress);
}

// Инициализация данных игры
let { balance, incomeRate, clickRate, incomePerSecCost, incomePerClickCost, rank, progress } = loadGameData();

const balanceDisplay = document.getElementById("balance");
const incomeRateDisplay = document.getElementById("incomeRate");
const clickRateDisplay = document.getElementById("clickRate");
const rankDisplay = document.getElementById("rank");
const progressDisplay = document.getElementById("progress");
const incomePerSecCostDisplay = document.getElementById("incomePerSecCost");
const incomePerClickCostDisplay = document.getElementById("incomePerClickCost");

const clickBtn = document.getElementById("clickBtn");
const incomePerSecBtn = document.getElementById("incomePerSecBtn");
const incomePerClickBtn = document.getElementById("incomePerClickBtn");

// Функция обновления отображения
function updateDisplay() {
    balanceDisplay.textContent = balance;
    incomeRateDisplay.textContent = incomeRate;
    clickRateDisplay.textContent = clickRate;
    rankDisplay.textContent = rank;
    incomePerSecCostDisplay.textContent = incomePerSecCost;
    incomePerClickCostDisplay.textContent = incomePerClickCost;
    progressDisplay.style.width = progress + "%";
}

// Обновление прогресса и ранга
function updateProgress() {
    progress += 10;
    if (progress >= 100) {
        rank += 1;
        progress = 0;
    }
    saveGameData();
    updateDisplay();
}

// Добавление дохода при клике
clickBtn.addEventListener("click", () => {
    balance += clickRate;
    updateProgress();
    saveGameData();
    updateDisplay();
});

// Увеличение дохода за секунду
incomePerSecBtn.addEventListener("click", () => {
    if (balance >= incomePerSecCost) {
        balance -= incomePerSecCost;
        incomeRate += 1;
        incomePerSecCost = Math.floor(incomePerSecCost * 1.5); // Увеличение цены
        saveGameData();
        updateDisplay();
    } else {
        alert("Недостаточно средств для улучшения дохода за секунду!");
    }
});

// Увеличение дохода за клик
incomePerClickBtn.addEventListener("click", () => {
    if (balance >= incomePerClickCost) {
        balance -= incomePerClickCost;
        clickRate += 1;
        incomePerClickCost = Math.floor(incomePerClickCost * 1.5); // Увеличение цены
        saveGameData();
        updateDisplay();
    } else {
        alert("Недостаточно средств для улучшения дохода за клик!");
    }
});

// Автоматическое добавление дохода каждую секунду
setInterval(() => {
    balance += incomeRate;
    saveGameData();
    updateDisplay();
}, 1000);

// Инициализация отображения при загрузке страницы
updateDisplay();
