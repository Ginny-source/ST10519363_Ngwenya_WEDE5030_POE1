// Track slide positions for each unique slider element
const sliderPositions = {
    track1: 0,
    track2: 0
};

// Handles sliding mechanism animations
function moveSlider(trackId, direction) {
    const track = document.getElementById(trackId);
    const cards = track.querySelectorAll('.coffee-card');
    
    // Total visible cards structure calculations 
    const cardWidth = 250 + 20; // card spacing width + gap element space
    const maxVisibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;
    const totalCards = cards.length;
    const maxSlides = totalCards - maxVisibleCards;

    // Increment or decrement current positioning state
    sliderPositions[trackId] += direction;

    // Bounds constraints configuration checks
    if (sliderPositions[trackId] < 0) {
        sliderPositions[trackId] = 0; // stop left boundary
    } else if (sliderPositions[trackId] > maxSlides) {
        sliderPositions[trackId] = maxSlides; // stop right boundary
    }

    // Calculate exact translation transition pixel offset 
    const newTransformValue = -(sliderPositions[trackId] * cardWidth);
    track.style.transform = `translateX(${newTransformValue}px)`;
}

// Cart Data State Management Array
let cart = [submitCheckout];

function toggleCart() {
    document.getElementById('checkoutSidebar').classList.toggle('open');
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    // Update basket count tracker badges text variables
    document.getElementById('cart-count').innerText = cart.length;

    const listContainer = document.getElementById('cartItemsList');
    const totalDisplay = document.getElementById('totalPrice');

    if (cart.length === 0) {
        listContainer.innerHTML = `<p style="color:#888; text-align:center; margin-top:40px;">Your basket is empty.</p>`;
        totalDisplay.innerText = "0.00$";
        return;
    }

    // Render loop compiler
    listContainer.innerHTML = '';
    let combinedTotal = 0;

    cart.forEach((item, index) => {
        combinedTotal += item.price;
        
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <span style="color:#A3704C">${item.price.toFixed(2)}$</span>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
        `;
        listContainer.appendChild(itemRow);
    });

    totalDisplay.innerText = combinedTotal.toFixed(2) + '$';
}

function submitCheckout() {
    if(cart.length === 0) {
        alert("Your basket is empty! Please add a delicious coffee first.");
        return;
    }
    alert("Order Sent! Processing your checkout total of: " + document.getElementById('totalPrice').innerText);
    cart = [submitCheckout];
    updateCartUI();
    toggleCart();
}



document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const successPopup = document.getElementById("successPopup");
    const closePopup = document.getElementById("closePopup");

    // Validation patterns
    const alphabetPattern = /^[A-Za-z ]+$/;

    const emailPattern =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


    // Display error messages
    function showError(field, text) {

        const formGroup = field.parentElement;

        const error = document.createElement("small");

        error.className = "error-message";
        error.textContent = text;

        field.classList.add("input-error");

        formGroup.appendChild(error);
    }


    // Remove previous errors
    function clearErrors() {

        document.querySelectorAll(".error-message").forEach(error => {
            error.remove();
        });

        document.querySelectorAll(".input-error").forEach(field => {
            field.classList.remove("input-error");
        });

    }


    // Form submission
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        let isValid = true;

        // Check empty fields
        const fields = [name, email, subject, message];

        fields.forEach(field => {

            if (field.value.trim() === "") {

                showError(field, "Empty field");

                isValid = false;

            }

        });


        // Name validation
        if (name.value.trim() !== "" &&
            !alphabetPattern.test(name.value.trim())) {

            showError(name, "Name must contain alphabets only.");

            isValid = false;
        }


        // Email validation
        if (email.value.trim() !== "" &&
            !emailPattern.test(email.value.trim())) {

            showError(email, "Please enter a valid email address.");

            isValid = false;
        }


        // Subject validation
        if (subject.value.trim() !== "" &&
            !alphabetPattern.test(subject.value.trim())) {

            showError(subject, "Subject must contain alphabets only.");

            isValid = false;
        }


        // Message validation
        if (message.value.trim() !== "" &&
            !alphabetPattern.test(message.value.trim())) {

            showError(message, "Message must contain alphabets only.");

            isValid = false;
        }


        // Successful submission
        if (isValid) {

            successPopup.style.display = "flex";

            form.reset();

        }

    });


    // Close success popup
    closePopup.addEventListener("click", function () {

        successPopup.style.display = "none";

    });

});

