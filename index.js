AOS.init();
$(".silider").slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  dots: true,
  responsive: [
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

let showDescription = document.querySelector(".show-description");
let hideText = document.querySelector(".hide");
showDescription.addEventListener("click", () => {
  hideText.classList.toggle("show");
  if (hideText.classList.contains("show")) {
    showDescription.textContent = "Показати менше";
  } else {
    showDescription.textContent = "Показати більше";
  }
});

let header = document.querySelector(".header");

document.addEventListener("scroll", () => {
  if (scrollY > 50) {
    header.classList.add("header-background-color");
  } else {
    header.classList.remove("header-background-color");
  }
});

let spans = document.querySelectorAll(".procents");

function animateElements() {
  let firstTarget = 80;
  let secondTarget = 80;
  let thirdTarget = 75;
  let fourthTarget = 70;
  let fifthTarget = 65;
  let sixthTarget = 65;

  let time = setInterval(() => {
    spans.forEach((item, idx) => {
      if (idx === 0 && parseInt(item.textContent) < firstTarget) {
        item.textContent = parseInt(item.textContent) + 1 + "%";
      } else if (idx === 1 && parseInt(item.textContent) < secondTarget) {
        item.textContent = parseInt(item.textContent) + 1 + "%";
      } else if (idx === 2 && parseInt(item.textContent) < thirdTarget) {
        item.textContent = parseInt(item.textContent) + 1 + "%";
      } else if (idx === 3 && parseInt(item.textContent) < fourthTarget) {
        item.textContent = parseInt(item.textContent) + 1 + "%";
      } else if (idx === 4 && parseInt(item.textContent) < fifthTarget) {
        item.textContent = parseInt(item.textContent) + 1 + "%";
      } else if (idx === 5 && parseInt(item.textContent) < sixthTarget) {
        item.textContent = parseInt(item.textContent) + 1 + "%";
      }

      if (
        parseInt(spans[0].textContent) === firstTarget &&
        parseInt(spans[1].textContent) === secondTarget &&
        parseInt(spans[2].textContent) === thirdTarget &&
        parseInt(spans[3].textContent) === fourthTarget &&
        parseInt(spans[4].textContent) === fifthTarget &&
        parseInt(spans[5].textContent) === sixthTarget
      ) {
        clearInterval(time);
      }
    });
  }, 50);
}

let targetElement = document.querySelector(".technogies");
let isInView = false;

window.addEventListener("scroll", function () {
  if (isInView) return;

  let rect = targetElement.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    isInView = true;
    animateElements();
  }
});

const animateOnScroll = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelector(".child").style.animation =
        "widthAnimation 4s linear forwards";
      observer.unobserve(entry.target);
    }
  });
};

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver(animateOnScroll, options);
const elements = document.querySelectorAll(".list-technogies");

elements.forEach((element) => {
  observer.observe(element);
});

let add = document.querySelectorAll(".add");
let textParagraph = document.querySelectorAll(".paragrph-text");

function addrT(e) {
  add.forEach((item, idx) => {
    if (e.target === item) {
      textParagraph[idx].classList.toggle("show");
    } else {
      textParagraph[idx].classList.remove("show");
    }
  });
}

function changeCrs(e) {
  add.forEach((item, idx) => {
    if (e.target === item) {
      if (add[idx].getAttribute("src") === "images/icons8-плюс-40.png") {
        add[idx].setAttribute("src", "images/icons8-минус-40.png");
      } else {
        add[idx].setAttribute("src", "images/icons8-плюс-40.png");
      }
    }
  });
}

function resultS(e) {
  changeCrs(e);
  addrT(e);
}

add.forEach((item) => item.addEventListener("click", resultS));

const c = document.querySelector("canvas");
const ctx = c.getContext("2d");
const cw = (c.width = innerWidth * 0.4);
const ch = (c.height = innerHeight); //*0.9
const dots = Array(750);
const dur = 25;
const hue = 105;
const mPos = { x: cw / 2, y: ch };

c.onpointermove = (e) => gsap.to(mPos, { x: e.offsetX, y: e.offsetY });

for (let i = 0; i < dots.length; i++) {
  dots[i] = {
    x: cw * Math.random(),
    y: -10,
    r: gsap.utils.random(1.5, 4.5, 0.1),
  };
}

function drawDot(x, y, r) {
  const dist = Math.abs(x - mPos.x) + Math.abs(y - mPos.y);
  ctx.fillStyle =
    "hsl(" +
    hue +
    ",100%," +
    Math.max(1 - dist / (dots.length - 1), 0.05) * 80 +
    "%)";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}

function redraw() {
  ctx.clearRect(0, 0, cw, ch);
  dots.forEach((dot) => drawDot(dot.x, dot.y, dot.r));
}

gsap
  .timeline({ onUpdate: redraw })
  .from(dots, {
    duration: dur,
    ease: "none",
    x: (i) => "+=random(-99,99)",
    y: (i, t) => t.r * ch,
    r: () => "+=random(-1,2)",
    repeatRefresh: true,
    stagger: { from: "random", amount: dur, repeat: -1 },
  })
  .seek(dur);
