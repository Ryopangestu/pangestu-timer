const totalRows = 10; // Jumlah baris
const timerData = [];

// Fungsi untuk membuat baris tabel
function createTableRows() {
  let tableBody = document.getElementById("timerTableBody");

  for (let i = 1; i <= totalRows; i++) {
    const row = document.createElement("tr");

    // Penomoran
    const numberCell = document.createElement("td");
    numberCell.textContent = i;
    row.appendChild(numberCell);

    // Kolom Nama
    const nameCell = document.createElement("td");
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Masukkan Nama";
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    // Kolom Timer
    const timerCell = document.createElement("td");
    const timerDisplay = document.createElement("div");
    timerDisplay.className = "timer";
    timerDisplay.textContent = "24:00:00"; // Timer default
    timerCell.appendChild(timerDisplay);
    row.appendChild(timerCell);

    // Kolom Tombol Mulai
    const startCell = document.createElement("td");
    const startButton = document.createElement("button");
    startButton.id = `startButton${i}`;
    startButton.textContent = "Mulai";
    startButton.addEventListener("click", function() {
      startTimer(i, timerDisplay, startButton, stopButton);
    });
    startCell.appendChild(startButton);
    row.appendChild(startCell);

    // Kolom Tombol Stop
    const stopCell = document.createElement("td");
    const stopButton = document.createElement("button");
    stopButton.id = `stopButton${i}`;
    stopButton.textContent = "Stop";
    stopButton.disabled = true; // Tombol stop dinonaktifkan pada awalnya
    stopButton.addEventListener("click", function() {
      stopTimer(i);
    });
    stopCell.appendChild(stopButton);
    row.appendChild(stopCell);

    // Menambahkan baris ke dalam tabel
    tableBody.appendChild(row);

    // Menyimpan data untuk setiap baris (timer, button, etc.)
    timerData.push({
      timerDisplay: timerDisplay,
      hours: 24,
      minutes: 0,
      seconds: 0,
      timerInterval: null,
      startButton: startButton,
      stopButton: stopButton
    });
  }
}

// Fungsi untuk memulai timer
function startTimer(rowIndex, timerDisplay, startButton, stopButton) {
  const timer = timerData[rowIndex - 1];
  timer.timerInterval = setInterval(() => {
    if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
      clearInterval(timer.timerInterval);
      alert("Waktu Habis!");
      stopButton.disabled = true;
    } else {
      if (timer.seconds > 0) {
        timer.seconds--;
      } else if (timer.minutes > 0) {
        timer.minutes--;
        timer.seconds = 59;
      } else if (timer.hours > 0) {
        timer.hours--;
        timer.minutes = 59;
        timer.seconds = 59;
      }

      timerDisplay.textContent = `${String(timer.hours).padStart(2, '0')}:${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
    }
  }, 1000);

  // Menonaktifkan tombol "Mulai" dan mengaktifkan tombol "Stop"
  startButton.disabled = true;
  stopButton.disabled = false;
}

// Fungsi untuk menghentikan timer
function stopTimer(rowIndex) {
  const timer = timerData[rowIndex - 1];
  clearInterval(timer.timerInterval);
  timer.timerInterval = null;
  // Mengaktifkan kembali tombol "Mulai" dan menonaktifkan tombol "Stop"
  timer.startButton.disabled = false;
  timer.stopButton.disabled = true;
  alert("Timer dihentikan!");
}

// Memanggil fungsi untuk membuat baris tabel
createTableRows();
