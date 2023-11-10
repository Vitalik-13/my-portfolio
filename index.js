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
const color = "#26a32c"; // Встановлення коліру за HEX-кодом
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
  ctx.fillStyle = color;
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

// burger

const line = document.querySelector(".line");
const burgerMenu = document.querySelector("#burger");
const menu = document.querySelector(".menu");
burgerMenu.addEventListener("click", () => {
  if (burgerMenu.checked) {
    menu.classList.add("plus");
    line.classList.add("hide");
  } else {
    menu.classList.remove("plus");
    line.classList.remove("hide");
  }
});

let link = document.querySelectorAll(".menu-link");
link.forEach((item) => {
  item.addEventListener("click", scrollElement);
});

function scrollElement(e) {
  e.preventDefault();
  let targetId = this.getAttribute("href");
  let targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  }
}

const listsMenu = document.querySelectorAll(".list-menu");
listsMenu.forEach((list) =>
  list.addEventListener("click", () => {
    menu.classList.remove("plus");
    burgerMenu.checked = false;
    line.classList.remove("hide");
  })
);

const language = document.querySelectorAll(".flag");
language.forEach((item) =>
  item.addEventListener("click", (e) => {
    menu.classList.remove("plus");
    burgerMenu.checked = false;
    line.classList.remove("hide");
  })
);

let arrLang = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    creating: "Creating a website is beautiful and easy",
    Iam: "I'm Front-end developer",
    showMore: "Show more",
    showLess: "Show less",
    hello: "Hello! I am Vitalik",
    deskription:
      "Welcome to my portfolio website! I'm Vitalik, a frontend developer, and on my site, you'll find a reflection of my professional growth. My specialization includes working with HTML and CSS, creating the structure and design of websites. I also have skills in working with Figma, facilitating the seamless integration of design into development. In my practice, I use JavaScript ES6 and strive to constantly improve these skills. ",
    spanDeckription:
      "I actively use Git and GitHub for version control and collaboration on projects. My work achievements and projects are available for viewing on the site. Feel free to visit, and I'll be happy to answer your questions and discuss opportunities for collaboration on exciting projects. Let's create something impressive together!",

    choice: "HERE'S WHY YOU SHOULD CHOOSE ME",
    oneTitle: "Expertise in HTML and CSS",
    twoParagraph:
      "My expertise in these areas allows me to create high-quality, aesthetic, and functional websites.",
    twoTitel: "Knowledge of JavaScript ES6",
    twoParagrph:
      "My understanding of modern JavaScript capabilities enables me to create dynamic and interactive elements on web pages",
    threeTitel: "Skills in working with Figma",
    threeParagraph:
      "My ability to effectively implement design into development ensures consistency between design and the final product.",
    fourTitel: "Team collaboration on GitHub",
    fourParagraph:
      "My experience working with Git and GitHub ensures efficient version control and collaboration on projects, providing convenience and precision in cooperation.",
    fiveTitle: "Professional approach to projects",
    fiveParagraph:
      "I always work with great attention to detail and prioritize customer requirements to ensure satisfaction with their needs.",
    sixTitle: "Quick adaptation to new technologies",
    sixParagraph:
      "My readiness and eagerness to learn new things allow me to quickly adapt to changes in the technological environment, ensuring modern and innovative solutions.",
    sevenTitle: "Strategic thinking",
    sevenParagraph:
      "My ability for strategic thinking helps me understand not only the technical but also the business needs of projects, fostering more effective collaboration with the business community",
    eithTitle: "Excellent communication skills",
    eithParagraph:
      "My ability to communicate effectively with colleagues and clients helps avoid misunderstandings and ensures the successful completion of projects.",
    nineTitle: "Determination and dedication",
    nineParagraph:
      "My goal is not just to complete tasks but to create a product that satisfies your needs and exceeds your expectations.",
    tenTitle: "Creative approach to problem-solving",
    tenParagraph:
      "My creative thinking allows me to find innovative solutions for complex problems, ensuring unique and original results.",
    myTechnologes: "TECHNOLOGIES I MASTER",
    myProgect: "MY PROGECT",
    lastText: "2023 y.o. All rights reserved",
  },
  ua: {
    home: "Головна",
    about: "Про мене",
    skills: "Вміння",
    projects: "Проекти",
    contact: "Контакти",
    creating: "створення сайту це красиво і легко",
    hello: "Привіт! Я Віталік ",
    Iam: "Я Front-end developer",
    showMore: "Показати більше",
    showLess: "Показати менше",
    deskription:
      "Запрошую на свій сайт-портфоліо! Я - Віталік,  Frontend-розробник, і на моєму сайті ви знайдете відображення мого професійного росту. Моя спеціалізація - робота з HTML та CSS, створення структури і дизайну веб-сайтів. Також я володію навичками роботи у Figma, що допомагає легко впроваджувати дизайн в розробку. У своїй практиці використовую JavaScript ES6 і намагаюся постійно покращувати ці навички.",
    spanDeckription:
      "Я активно користуюся Git і GitHub для керування версіями та спільної роботи над проектами. Мої робочі досягнення та проекти доступні для перегляду на сайті. Завітайте, і я з радістю відповім на ваші питання та розгляну можливості співпраці над цікавими проектами. Давайте створимо щось вражаюче разом!",
    choice: "ОСЬ ЧОМУ ВАРТО ОБРАТИ МЕНЕ",
    oneTitle: "Експертиза в HTML та CSS",
    twoParagraph:
      "Моя спеціалізація в цих областях дозволяє мені створювати високоякісні, естетичні та функціональні веб-сайти.",
    twoTitel: "Знання JavaScript ES6",
    twoParagrph:
      "Моє розуміння сучасних можливостей JavaScript дозволяє мені створювати динамічні та інтерактивні елементи на веб-сторінках",
    threeTitel: "Вміння працювати у Figma",
    threeParagraph:
      "Моя здатність ефективно впроваджувати дизайн у розробку дозволяє забезпечити консистентність між дизайном і фінальним продуктом.",
    fourTitel: "Командна співпраця на GitHub",
    fourParagraph:
      "Мій досвід роботи з Git і GitHub гарантує ефективне керування версіями та спільну роботу над проектами, забезпечуючи зручність та точність у співпраці.",
    fiveTitle: "Професійний підхід до проектів",
    fiveParagraph:
      "Я завжди працюю з великою увагою до деталей та приділяю особливу увагу вимогам клієнта, щоб забезпечити задоволення їхніх потреб.",
    sixTitle: "Швидка адаптація до нових технологій",
    sixParagraph:
      "Моя готовність і бажання вчитися нового дозволяють мені швидко адаптуватися до змін в технологічному середовищі, що гарантує сучасні та інноваційні рішення",
    sevenTitle: "Стратегічне мислення",
    sevenParagraph:
      "Моя здатність до стратегічного мислення допомагає мені розуміти не лише технічні, але й бізнес-потреби проектів, що сприяє ефективнішій взаємодії з бізнес-спільнотою.",
    eithTitle: "Відмінні комунікаційні навички",
    eithParagraph:
      "Моя здатність ефективно спілкуватися з колегами та клієнтами допомагає уникнути недорозумінь та забезпечує успішне виконання проектів.",
    nineTitle: "Цілеспрямованість та відданість",
    nineParagraph:
      "Моя мета - не просто виконати завдання, а створити продукт, який задовольнить ваші потреби і перевершить ваші очікування.",
    tenTitle: "Креативний підхід до вирішення завдань",
    tenParagraph:
      "Моя творча думка дозволяє мені знаходити інноваційні рішення для складних проблем, забезпечуючи унікальні та оригінальні результати.",
    myTechnologes: "ТЕХНОЛОГІЇ ЯКИМИ Я ВОЛДІЮ",
    myProgect: "МОЇ ПРОЕКТИ",
    lastText: "2023р. Всі права захищені",
  },
};
let lang = "ua"; // за замовчуванням обрана англійська мова
document.addEventListener("DOMContentLoaded", function () {
  let translateButtons = document.querySelectorAll(".translate");

  translateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let lang = this.id;

      let langElements = document.querySelectorAll(".lang");
      langElements.forEach(function (element) {
        element.textContent = arrLang[lang][element.getAttribute("key")];
      });

      // Зберегти вибрану мову в localStorage
      localStorage.setItem("selectedLanguage", lang);

      updateButtonText(); // Виклик функції для зміни тексту кнопки при зміні мови
    });
  });

  // Отримати збережену мову з localStorage та встановити її
  let savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) {
    let langElements = document.querySelectorAll(".lang");
    langElements.forEach(function (element) {
      element.textContent = arrLang[savedLanguage][element.getAttribute("key")];
    });

    updateButtonText();
  }
});

let showDescription = document.querySelector(".show-description");
let hideText = document.querySelector(".hide");
showDescription.addEventListener("click", () => {
  hideText.classList.toggle("show");
  updateButtonText();
});

function updateButtonText() {
  // Отримати збережену мову з localStorage та встановити її
  let savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) {
    if (hideText.classList.contains("show")) {
      showDescription.textContent = arrLang[savedLanguage]["showLess"];
    } else {
      showDescription.textContent = arrLang[savedLanguage]["showMore"];
    }
  }
}
