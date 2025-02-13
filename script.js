// ==========================
// Navigation & Header Shadow
// ==========================
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav__toggle"),
  navClose = document.getElementById("nav__close"),
  navLinks = document.querySelectorAll(".nav__link");

if (navMenu) {
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }
  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    })
  );
}

const shadowHeader = () => {
  const header = document.getElementById("header");
  window.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

// ==========================
// Swiper for Popular Section
// ==========================
const swiperPopular = new Swiper(".popular__swiper", {
  loop: true,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",
});

// ==========================
// Scroll Up Button
// ==========================
const scrollup = () => {
  const scrollUp = document.getElementById("scroll-up");
  if (scrollUp) {
    window.addEventListener("scroll", () => {
      window.scrollY >= 350
        ? scrollUp.classList.add("show-scroll")
        : scrollUp.classList.remove("show-scroll");
    });
  }
};
scrollup();

// ==========================
// Franchise Form Submission
// ==========================
const franchiseForm = document.getElementById("franchise-form");
const formMessage = document.getElementById("form-message");

if (franchiseForm) {
  franchiseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Gather form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (name === "" || email === "" || phone === "" || message === "") {
      formMessage.textContent = "Please fill in all fields.";
      formMessage.style.color = "red";
      formMessage.classList.add("active");
      return;
    }

    formMessage.textContent = "Submitting your inquiry...";
    formMessage.style.color = "var(--first-color)";
    formMessage.classList.add("active");

    setTimeout(() => {
      formMessage.textContent =
        "Thank you for your inquiry, we will get back to you soon!";
      formMessage.style.color = "green";
      franchiseForm.reset();
      setTimeout(() => {
        formMessage.classList.remove("active");
      }, 4000);
    }, 1500);
  });
}

// ==========================
// Live Chatbot (FAQs)
// ==========================
const chatbotData = [
  {
    question: "What are your hours?",
    answer: "Our hours are 10am - 11pm daily.",
    nested: [],
  },
  {
    question: "Where are you located?",
    answer: "We're located at Newton School of Technology R-1",
    nested: [],
  },
  {
    question: "Do you offer delivery?",
    answer: "Yes, we offer delivery within a 5-Km radius.",
    nested: [],
  },
  {
    question: "How can I franchise?",
    answer: "We offer a robust franchise model. Which information do you need?",
    nested: [
      {
        question: "What is the initial investment?",
        answer:
          "The initial investment ranges between 2,00,000 and 5,00,000 (without land and labour cost).",
      },
      {
        question: "What support do you offer?",
        answer:
          "We provide training, marketing support, and operational guidance.",
      },
    ],
  },
  {
    question: "Do you offer catering?",
    answer:
      "Yes, we offer catering for events and parties. Contact our events team for details.",
    nested: [],
  },
  {
    question: "What types of pizzas do you offer?",
    answer:
      "We offer a variety of pizzas: Vegetarian, Pepperoni, Margherita, and more.",
    nested: [],
  },
  {
    question: "How can I provide feedback?",
    answer:
      "You can provide feedback via our website's contact form or through our social media channels.",
    nested: [],
  },
];

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbot = document.querySelector(".chatbot");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotBody = document.getElementById("chatbot-body");

chatbotToggle.addEventListener("click", () => {
  chatbot.style.display = "flex";
  chatbotToggle.style.display = "none";
  showOptions(chatbotData);
});

chatbotClose.addEventListener("click", () => {
  chatbot.style.display = "none";
  chatbotToggle.style.display = "block";
  chatbotBody.innerHTML = "";
});

function addMessage(message, sender = "bot") {
  const messageEl = document.createElement("div");
  messageEl.classList.add("chatbot__message");
  messageEl.classList.add(
    sender === "user" ? "chatbot__message--user" : "chatbot__message--bot"
  );
  messageEl.textContent = message;
  chatbotBody.appendChild(messageEl);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function showOptions(options) {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("chatbot__options");

  options.forEach((item) => {
    const btn = document.createElement("button");
    btn.classList.add("chatbot__option");
    btn.textContent = item.question;
    btn.addEventListener("click", () => {
      addMessage(item.question, "user");
      setTimeout(() => {
        addMessage(item.answer, "bot");
        if (item.nested && item.nested.length > 0) {
          setTimeout(() => {
            showOptions(item.nested);
          }, 500);
        } else {
          setTimeout(() => {
            showOptions(chatbotData);
          }, 1500);
        }
      }, 500);
      optionsContainer.remove();
    });
    optionsContainer.appendChild(btn);
  });
  chatbotBody.appendChild(optionsContainer);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function initChat() {
  addMessage("How can we help you? Please select a question:", "bot");
  showOptions(chatbotData);
}

// ==========================
// Feedback Chatbot
// ==========================
const feedbackSteps = [
  {
    question: "How would you rate your experience with us?",
    type: "options",
    field: "rating",
    options: [
      { text: "Excellent", value: "Excellent" },
      { text: "Good", value: "Good" },
      { text: "Average", value: "Average" },
      { text: "Poor", value: "Poor" },
    ],
  },
  {
    question: "Would you like to leave additional comments?",
    type: "options",
    field: "commentNeeded",
    options: [
      { text: "Yes", value: true },
      { text: "No", value: false },
    ],
  },
];

let currentFeedbackStep = 0;
let feedbackData = {};

const feedbackToggle = document.getElementById("feedback-chatbot-toggle");
const feedbackChatbot = document.getElementById("feedback-chatbot");
const feedbackClose = document.getElementById("feedback-chatbot-close");
const feedbackBody = document.getElementById("feedback-chatbot-body");
const feedbackInputContainer = document.getElementById(
  "feedback-chatbot-input-container"
);
const feedbackInput = document.getElementById("feedback-chatbot-input");
const feedbackSend = document.getElementById("feedback-chatbot-send");

feedbackToggle.addEventListener("click", () => {
  feedbackChatbot.style.display = "flex";
  feedbackToggle.style.display = "none";
  currentFeedbackStep = 0;
  feedbackData = {};
  feedbackBody.innerHTML = "";
  feedbackInputContainer.style.display = "none";
  startFeedbackConversation();
});

feedbackClose.addEventListener("click", () => {
  feedbackChatbot.style.display = "none";
  feedbackToggle.style.display = "block";
});

function addFeedbackMessage(message, sender = "bot") {
  const messageEl = document.createElement("div");
  messageEl.classList.add("feedback-chatbot__message");
  messageEl.classList.add(
    sender === "user"
      ? "feedback-chatbot__message--user"
      : "feedback-chatbot__message--bot"
  );
  messageEl.textContent = message;
  feedbackBody.appendChild(messageEl);
  feedbackBody.scrollTop = feedbackBody.scrollHeight;
}

function showFeedbackOptions(options) {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("feedback-chatbot__options");

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.classList.add("feedback-chatbot__option");
    btn.textContent = opt.text;
    btn.addEventListener("click", () => {
      addFeedbackMessage(opt.text, "user");
      const step = feedbackSteps[currentFeedbackStep];
      feedbackData[step.field] = opt.value;
      optionsContainer.remove();

      if (step.field === "commentNeeded" && opt.value === true) {
        feedbackInputContainer.style.display = "flex";
        feedbackInput.placeholder = "Type your comments here...";
        feedbackInput.focus();
      } else {
        setTimeout(() => nextFeedbackStep(), 500);
      }
    });
    optionsContainer.appendChild(btn);
  });
  feedbackBody.appendChild(optionsContainer);
  feedbackBody.scrollTop = feedbackBody.scrollHeight;
}

function displayFeedbackStep() {
  const step = feedbackSteps[currentFeedbackStep];
  addFeedbackMessage(step.question, "bot");
  if (step.type === "options") {
    showFeedbackOptions(step.options);
    feedbackInputContainer.style.display = "none";
  }
}

function nextFeedbackStep() {
  currentFeedbackStep++;
  if (currentFeedbackStep < feedbackSteps.length) {
    displayFeedbackStep();
  } else {
    if (feedbackData.commentNeeded === true && !feedbackData.comments) {
      feedbackInputContainer.style.display = "flex";
      feedbackInput.placeholder = "Type your comments here...";
      feedbackInput.focus();
    } else {
      addFeedbackMessage("Thank you for your feedback!", "bot");
      feedbackInputContainer.style.display = "none";
      // Optionally, process feedbackData here.
    }
  }
}

function processFeedbackText() {
  const text = feedbackInput.value.trim();
  if (text === "") return;
  addFeedbackMessage(text, "user");
  feedbackData.comments = text;
  feedbackInput.value = "";
  setTimeout(() => nextFeedbackStep(), 500);
}

feedbackSend.addEventListener("click", processFeedbackText);
feedbackInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") processFeedbackText();
});

function startFeedbackConversation() {
  addFeedbackMessage(
    "We'd love to hear your thoughts. Let's get started!",
    "bot"
  );
  setTimeout(() => displayFeedbackStep(), 800);
}
/********************
 * PIZZA DATA (15 items)
 ********************/
const pizzaData = [
  {
    id: 1,
    name: "Margherita",
    description: "Tomato sauce, mozzarella, fresh basil",
    image: "assests/pizza-1.jpg",
    price: 9,
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Tomato sauce, mozzarella, pepperoni",
    image: "assests/pizza-2.jpg",
    price: 11,
  },
  {
    id: 3,
    name: "Hawaiian",
    description: "Tomato sauce, mozzarella, ham, pineapple",
    image: "assests/pizza-3.jpg",
    price: 12,
  },
  {
    id: 4,
    name: "BBQ Chicken",
    description: "BBQ sauce, chicken, onions, mozzarella",
    image: "assests/pizza-4.jpg",
    price: 13,
  },
  {
    id: 5,
    name: "Veggie Supreme",
    description: "Bell peppers, onions, olives, mushrooms",
    image: "assests/pizza-5.png",
    price: 10,
  },
  {
    id: 6,
    name: "Meat Lovers",
    description: "Pepperoni, sausage, bacon, ham",
    image: "assests/pizza-6.jpg",
    price: 14,
  },
  {
    id: 7,
    name: "Four Cheese",
    description: "Mozzarella, cheddar, parmesan, provolone",
    image: "assests/pizza-7.webp",
    price: 12,
  },
  {
    id: 8,
    name: "Spicy Jalapeño",
    description: "Tomato sauce, mozzarella, jalapeños, chili flakes",
    image: "assests/pizza-8.webp",
    price: 11,
  },
  {
    id: 9,
    name: "Mushroom Delight",
    description: "Tomato sauce, mozzarella, mixed mushrooms",
    image: "assests/pizza-9.jpeg",
    price: 10,
  },
  {
    id: 10,
    name: "Mediterranean",
    description: "Feta, olives, tomatoes, spinach, onions",
    image: "assests/pizza-10.jpeg",
    price: 13,
  },
  {
    id: 11,
    name: "Smoky Chipotle Chicken",
    description:
      "Chipotle sauce, grilled chicken, red onions, and a hint of lime",
    image: "assests/pizza-11.jpg",
    price: 13,
  },

  {
    id: 12,
    name: "Truffle Special",
    description: "Truffle oil, wild mushrooms, arugula",
    image: "assests/pizza-12.jpg",
    price: 15,
  },
  {
    id: 13,
    name: "Caprese",
    description: "Fresh mozzarella, tomatoes, basil drizzle",
    image: "assests/pizza-13.webp",
    price: 10,
  },
  {
    id: 14,
    name: "Sicilian",
    description: "Thick crust, tomato sauce, sausage, cheese",
    image: "assests/pizza-14.jpg",
    price: 14,
  },
  {
    id: 15,
    name: "Pesto Chicken",
    description: "Pesto sauce, grilled chicken, mozzarella",
    image: "assests/pizza-15.jpg",
    price: 12,
  },
];

/********************
 * DOM ELEMENTS
 ********************/
const pizzaMenuEl = document.getElementById("pizza-menu");
const searchInput = document.getElementById("menu-search");

/********************
 * RENDER PIZZAS
 ********************/
function renderPizzas(pizzas) {
  pizzaMenuEl.innerHTML = ""; // Clear existing content

  if (pizzas.length === 0) {
    // If no pizzas match, show a message
    pizzaMenuEl.innerHTML = `<p class="no-results">No pizzas found.</p>`;
    return;
  }

  // For each pizza, create a card
  pizzas.forEach((pizza) => {
    const card = document.createElement("div");
    card.classList.add("menu__card");
    card.innerHTML = `
      <img src="${pizza.image}" alt="${pizza.name}" />
      <div class="menu__card-content">
        <h3 class="menu__card-title">${pizza.name}</h3>
        <p class="menu__card-desc">${pizza.description}</p>
        <p class="menu__card-price">$${pizza.price}</p>
      </div>
    `;
    pizzaMenuEl.appendChild(card);
  });
}

/********************
 * FILTER PIZZAS BY SEARCH
 ********************/
function filterPizzas() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filtered = pizzaData.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm)
  );
  renderPizzas(filtered);
}

/********************
 * EVENT LISTENERS
 ********************/
searchInput.addEventListener("input", filterPizzas);

/********************
 * ON PAGE LOAD
 ********************/
document.addEventListener("DOMContentLoaded", () => {
  renderPizzas(pizzaData);
});
