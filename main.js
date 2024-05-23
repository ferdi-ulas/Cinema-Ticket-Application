//Elementleri Seçmek

const container = document.querySelector(".container");
const selectMovie = document.querySelector("#selectMovie");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seats = Array.from(document.querySelectorAll(".seat"));
const buyButton = document.querySelector("#buyButton");
const clearButton = document.querySelector("#clearButton");

runEventListeners();

function runEventListeners() {
  container.addEventListener("click", select);
  selectMovie.addEventListener("change", changeMovie);
  document.addEventListener("DOMContentLoaded", runPageLoaded);
  buyButton.addEventListener("click", buyTicket);
  clearButton.addEventListener("click", clearSelection);
}

function runPageLoaded() {
  const selectedSeatsIndex = Storagex.getSelectedSeatsFromStorage();
  const fullSeatsIndex = Storagex.getFullSeatsFromStorage();

  seats.forEach((seat, index) => {
    if (selectedSeatsIndex.includes(index)) {
      seat.classList.add("selected");
    }
  });

  seats.forEach((seat, index) => {
    if (fullSeatsIndex.includes(index)) {
      seat.classList.add("full");
    }
  });

  selectMovie.selectedIndex = Storagex.getSelectedMovieIndexFromStorage();
  calculate();
}

function buyTicket() {
  if (confirm("Satın almak istiyor musunuz ?")) {
    const selectedSeats = getSelectedSeats();
    const selectedSeatsIndex = getSelectedSeatsIndex();
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("full");
    });
    Storagex.addFullSeatToStorage(selectedSeatsIndex);

    Storagex.addSelectedSeatToStorage(getSelectedSeatsIndex());
  }
}

function clearSelection() {
  const selectedSeats = getSelectedSeats();
  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  count.textContent = 0;
  amount.textContent = 0;
  Storagex.clearSelectedSeatsFromStorage();
}

function select(e) {
  const selectedElement = e.target.parentElement;
  if (
    selectedElement.classList.contains("seat") &&
    !selectedElement.classList.contains(".full")
  ) {
    selectedElement.classList.toggle("selected");
    calculate();
    saveSelectedSeatsIndexToStorage();
    saveSelectedMovieIndexToStorage();
  }
}

function changeMovie() {
  calculate();
  saveSelectedMovieIndexToStorage();
}

function getSelectedSeats() {
  const selectedList = [...container.querySelectorAll(".selected")];
  return selectedList;
}

function getSelectedSeatsIndex() {
  const selectedList = getSelectedSeats();
  const selectedSeatsIndex = selectedList.map((seat) => {
    return seats.indexOf(seat);
  });
  return selectedSeatsIndex;
}

function saveSelectedSeatsIndexToStorage() {
  const selectedSeatsIndex = getSelectedSeatsIndex();
  Storagex.addSelectedSeatToStorage(selectedSeatsIndex);
}

function saveSelectedMovieIndexToStorage() {
  const selectedMovieIndex = selectMovie.selectedIndex;
  Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}

function calculate() {
  const seletedSeatsCount = getSelectedSeats().length;

  const price = selectMovie.value;

  count.textContent = seletedSeatsCount;
  amount.textContent = seletedSeatsCount * price;
}
