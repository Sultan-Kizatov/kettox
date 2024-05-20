// Слайдер
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});

// Три всплывашки
const popups = ['popup1', 'popup2', 'popup3'];
let timeout;

function showPopup() {
    popups.forEach(id => document.getElementById(id).style.display = 'none');

    const randomPopup = popups[Math.floor(Math.random() * popups.length)];
    const popupElement = document.getElementById(randomPopup);
    popupElement.style.display = 'block';

    timeout = setTimeout(() => {
        popupElement.style.display = 'none';
        setTimeout(showPopup, 10000);
    }, 10000);
}

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        clearTimeout(timeout);
        this.parentElement.style.display = 'none';
        setTimeout(showPopup, 10000);
    });
});

window.onload = showPopup;


// Всплывашка с таймером

// Логика всплывашки
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

document.addEventListener('mouseleave', (e) => {
    if (!e.relatedTarget && !event.toElement) {
        const modal = document.getElementById('modal');
        modal.style.display = 'grid';
    }
});
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (modal.style.display === 'grid' && !modal.contains(e.target)) {
        closeModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Логика таймера
function startCountdown(endDate) {
    const end = new Date(endDate).getTime();
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = end - now;

        if (distance < 0) {
            hoursDisplay.textContent = "00";
            minutesDisplay.textContent = "00";
            secondsDisplay.textContent = "00";
            clearInterval(interval);
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        hoursDisplay.textContent = hours < 10 ? "0" + hours : hours;
        minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    const interval = setInterval(updateTimer, 1000);
}

window.onload = function() {
    const targetDate = "2024-12-31";
    startCountdown(targetDate);
};
