/* ==================== Toggle Icon Navbar ==================== */
let menuIcon = document.querySelector('#menu-icon');
let Navbar = document.querySelector('.navbar');

if (menuIcon && Navbar) {
    menuIcon.onclick = (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up
        menuIcon.classList.toggle('bx-x');
        Navbar.classList.toggle('active');
        console.log('Toggle triggered');
    };

    document.addEventListener('click', (event) => {
        if (Navbar.classList.contains('active') && !Navbar.contains(event.target) && !menuIcon.contains(event.target)) {
            menuIcon.classList.remove('bx-x');
            Navbar.classList.remove('active');
            console.log('Menu closed');
        }
    });
} else {
    console.error('Menu icon or navbar not found');
}

/* ==================== Scroll Section Active Link ==================== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

const handleScroll = () => {
    // Highlight active link
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Adjust offset as needed
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach((links) => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Reset Menu Icon if Navbar is active
    if (Navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        Navbar.classList.remove('active');
    }

    // Back to Top Button Visibility
    if (window.scrollY > 200) {
        backToTopBtn.classList.add("active");
    } else {
        backToTopBtn.classList.remove("active");
    }
};

window.addEventListener('scroll', handleScroll);

/* ==================== Smooth Scroll to Top ==================== */
const backToTopBtn = document.querySelector("[data-back-top-btn]");

backToTopBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click event from bubbling to document
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling effect
    });
});

/* ==================== Scroll Reveal ==================== */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,
});

// Reveal General
ScrollReveal().reveal('.home-content, .heading', {
    origin: 'top'
});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box', {
    origin: 'bottom'
});
ScrollReveal().reveal('.home-content h1, .about-img', {
    origin: 'left'
});
ScrollReveal().reveal('.home-content p, .about-content', {
    origin: 'right'
});

// Reveal khusus
ScrollReveal().reveal('.home', {
    distance: '50px',
    origin: 'bottom',
    duration: 1500,
    delay: 300,
});

// Reveal Skills
ScrollReveal().reveal('.skills .heading', {
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200
});

ScrollReveal().reveal('.skill-main, .skill-bar', {
    origin: 'bottom',
    distance: '80px',
    duration: 1500,
    delay: 300,
    reset: true // Skill bars akan muncul bersamaan
});


// Reveal Testimonials
ScrollReveal().reveal('.testimonials .heading', {
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200
});

// Reveal Contact
ScrollReveal().reveal('.contact .heading', {
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200
});
ScrollReveal().reveal('.contact form', {
    origin: 'bottom',
    distance: '80px',
    duration: 1500,
    delay: 300,
    reset: true
});

/* ==================== Typed JS ==================== */
const typed = new Typed('.multiple-text', {
    strings: ['Driving MSMEs Growth Through Digital Solutions'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
});

/* ==================== Contact Form ==================== */
const form = document.getElementById('contact-form');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const result = document.getElementById('result');

function sendEmail() {
    console.log('Sending email...');
    console.log('Full Name:', fullname.value);
    console.log('Email:', email.value);
    console.log('Phone:', phone.value);
    console.log('Subject:', subject.value);
    console.log('Message:', message.value);

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                window.location.href = 'submission.html';
            } else {
                Swal.fire({
                    title: 'Error',
                    text: json.message,
                    icon: 'error',
                });
            }
        })
        .catch(error => {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: "Something went wrong!",
                icon: 'error',
            });
        })
        .finally(() => {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
}

function checkInputs() {
    const items = document.querySelectorAll('.item');

    items.forEach((item, index) => {
        if (item.value === '') {
            item.classList.add('error');
            item.parentElement.classList.add('error');
        } else {
            item.classList.remove('error');
            item.parentElement.classList.remove('error');
        }

        if (index === 1) {
            checkEmail();
        }

        item.addEventListener('keyup', () => {
            if (item.value !== '') {
                item.classList.remove('error');
                item.parentElement.classList.remove('error');
            } else {
                item.classList.add('error');
                item.parentElement.classList.add('error');
            }
        });
    });
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@(gmail|outlook|hotmail)\.com$/;
    const errorTxtEmail = document.querySelector('.error-txt.email');

    if (!email.value.match(emailRegex)) {
        email.classList.add('error');
        email.parentElement.classList.add('error');

        if (email.value !== '') {
            errorTxtEmail.innerText = 'Please enter a valid email address (only gmail.com, outlook.com, hotmail.com allowed)';
        } else {
            errorTxtEmail.innerText = "Email Address can't be blank";
        }
    } else {
        email.classList.remove('error');
        email.parentElement.classList.remove('error');
        errorTxtEmail.innerText = '';
    }
}

phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/\D/g, '');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();

    if (![fullname, email, phone, subject, message].some(input => input.classList.contains('error'))) {
        sendEmail();
    }
});


/* ==================== Circle Skills Bar ==================== */
function animateCircles() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((elem) => {
        const dots = elem.getAttribute("data-dots");
        const marked = elem.getAttribute("data-percent");
        const percent = Math.floor(dots * marked / 100);
        const rotate = 360 / dots;

        elem.innerHTML = ""; // Clear previous points
        for (let i = 0; i < dots; i++) {
            const point = document.createElement('div');
            point.className = 'points';
            point.style.setProperty('--i', i);
            point.style.setProperty('--rot', `${rotate}deg`);
            elem.appendChild(point);
        }

        const pointsMarked = elem.querySelectorAll('.points');
        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked');
        }
    });
}

let hasAnimated = false;
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCircles();
            hasAnimated = true;
        }
    });
}, {
    root: null,
    threshold: 0.5
});

observer.observe(skillsSection);

/* ==================== Event Listener Skills Menu ==================== */
document.querySelector('header nav a[href*="skills"]').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('#skills').scrollIntoView({
        behavior: 'smooth'
    });

    setTimeout(() => {
        if (!hasAnimated) {
            animateCircles();
        }
    }, 500);
});

/* ==================== Testimonials ==================== */
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// // Whatsapp Floating
// document.getElementById('whatsappButton').addEventListener('click', function (event) {
//     event.preventDefault();
//     var phoneNumber = '6281234567890';
//     var message = 'Halo, saya ingin bertanya tentang produk Anda!';
//     var whatsappURL = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
//     window.open(whatsappURL, '_blank');
// });