/* CAROUSEL */
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const cardsContainer = document.getElementById("cards");

let index = 0;
let duration = 4000;
let timerInterval;

function updateCarousel() {
  if (!cards.length) return;

  cards.forEach((card, i) => {
    card.classList.remove("active");
    if (dots[i]) dots[i].classList.remove("active");

    const timer = card.querySelector(".timer");
    if (timer) {
      timer.style.background =
        "conic-gradient(#ffb000 0deg, transparent 0deg)";
    }
  });

  if (cards[index]) cards[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active");

  if (cardsContainer && cards[0]) {
    const cardWidth = cards[0].offsetWidth + 20;
    const offset = (index - Math.floor(cards.length / 2)) * cardWidth;
    cardsContainer.style.transform = `translateX(${-offset}px)`;
  }

  startTimer();
}

function nextSlide() {
  if (!cards.length) return;
  index = (index + 1) % cards.length;
  updateCarousel();
}

function prevSlide() {
  if (!cards.length) return;
  index = (index - 1 + cards.length) % cards.length;
  updateCarousel();
}

if (cards.length) {
  updateCarousel();

  if (nextBtn) nextBtn.onclick = nextSlide;
  if (prevBtn) prevBtn.onclick = prevSlide;
}

/* TIMER */
function startTimer() {
  if (!cards.length) return;

  clearInterval(timerInterval);

  let start = Date.now();
  const activeCard = cards[index];
  if (!activeCard) return;

  const timer = activeCard.querySelector(".timer");
  if (!timer) return;

  timerInterval = setInterval(() => {
    let elapsed = Date.now() - start;
    let progress = (elapsed / duration) * 360;

    timer.style.background =
      `conic-gradient(#f4b400 ${progress}deg, transparent ${progress}deg)`;

    if (elapsed >= duration) {
      clearInterval(timerInterval);
      nextSlide();
    }
  }, 50);
}

/* SEARCH BAR */
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

if (searchInput) {
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') runSearch();
  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', runSearch);
}

function runSearch() {
  const searchField = document.querySelector('#search-input');
  if (!searchField) return;

  const searchTerm = searchField.value.trim().toLowerCase();
  const allItems = document.querySelectorAll('.sidebar-list > li');
  let visibleCount = 0;

  allItems.forEach(li => {
    const mainLabel = li.querySelector('.item-label span');
    const popupItems = li.querySelectorAll('.popup-items li');
    const radio = li.querySelector('.pop-trigger');

    if (!searchTerm) {
      li.style.display = 'block';
      if (radio) {
        const closeAll = document.getElementById('close-all');
        if (closeAll) closeAll.click();
      }
      return;
    }

    const mainMatch =
      mainLabel && mainLabel.textContent.toLowerCase().includes(searchTerm);

    let subMatch = false;
    popupItems.forEach(sub => {
      if (sub.textContent.toLowerCase().includes(searchTerm)) {
        subMatch = true;
      }
    });

    if (mainMatch || subMatch) {
      li.style.display = 'block';
      visibleCount++;

      if (subMatch && radio) radio.checked = true;
    } else {
      li.style.display = 'none';
    }
  });

  let noResult = document.getElementById('no-result');

  if (!noResult) {
    noResult = document.createElement('li');
    noResult.id = 'no-result';
    noResult.textContent = 'No results found.';
    noResult.style.color = '#999';
    noResult.style.padding = '8px 0';

    const list = document.querySelector('.sidebar-list');
    if (list) list.appendChild(noResult);
  }

  noResult.style.display =
    visibleCount === 0 && searchTerm ? 'block' : 'none';
}

/* CLOSE SIDEBAR WHEN CLICK OUTSIDE */
document.addEventListener('click', function(event) {
  const sidebar = document.querySelector('.sidebar');
  const closeTrigger = document.getElementById('close-all');

  if (sidebar && !sidebar.contains(event.target)) {
    if (closeTrigger) closeTrigger.click();
  }
});

/* CLOSE SIDEBAR ON SCROLL */
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    const closeTrigger = document.getElementById('close-all');
    if (closeTrigger) closeTrigger.click();
  }
});

/* CONTACT FORM */
document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector("form"); 
  const nameInput = document.querySelectorAll("input")[0]; 
  const emailInput = document.querySelectorAll("input")[1]; 
  const messageInput = document.querySelector("textarea"); 
 
  emailjs.init("-ljApwiUqG8JQk21q"); 
    nameInput.addEventListener("input", function () { 
      this.value = this.value.replace(/[^a-zA-Z\s]/g, ""); 
}); 
 
form.addEventListener("submit", function (e) { 
  e.preventDefault(); 
 
    let name = nameInput.value.trim(); 
    let email = emailInput.value.trim(); 
    let message = messageInput.value.trim(); 
      
  if (name === "" || email === "" || message === "") { 
    alert("Please fill in all fields."); 
  
    return; 
} 
 
  if (/\d/.test(name)) { 
    alert("Name cannot contain numbers."); 
            
    return; 
} 
 
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 
    if (!emailPattern.test(email)) { 
      alert("Please enter a valid email."); 
            
    return; 
} 
 
emailjs.send("service_dfupro9","template_tth604y", { 
  from_name: name, 
  from_email: email, 
  message: message 
}) 

.then(function () { 
  alert("Message sent successfully!"); 
  form.reset(); 
}) 

.catch(function (error) { 
  alert("Failed to send message."); 
  console.error(error); 
}); 
}); 
});