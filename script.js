// --- 1. LOGIN LOGIC (For index.html) ---
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if (username === "123" && password === "123") {
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'auctions.html';
    } else {
        errorMsg.textContent = "Invalid ID or Password. Please try again.";
        errorMsg.classList.remove('d-none');
    }
}

// --- 2. AUCTION PAGE LOGIC (For auctions.html) ---
const AUCTIONS = [
    { id: "A-26-9734", name: "THE INDIA CEMENTS LIMITED (UNIT: VISHNUPURAM WORKS)" },
    { id: "A-26-9735", name: "Hindalco Industries Limited - Hirakud (Unit: Hirakud, Sambalpur (Odisha))" },
    { id: "A-26-9741", name: "GREENPANEL PRIVATE LIMITED (UNIT- ANDHRA PRADESH)" },
    { id: "A-26-9747", name: "Ultratech Cement Ltd (Unit: Aditya Cement Works chittorgarh)" }
];

// Check login state on page load
if (window.location.pathname.includes('auctions.html')) {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    } else {
        renderAuctions();
    }
}

function renderAuctions() {
    const listContainer = document.getElementById('auctionList');
    if (!listContainer) return;

    let html = '';
    AUCTIONS.forEach((auction, index) => {
        // We use unique names for the radio buttons based on the index so they act as separate groups
        const radioGroupName = `status_${index}`;

        html += `
        <div class="auction-row">
            <div class="auction-details">
                <span class="auction-id-box">${auction.id}</span>
                <span class="company-name-box">${auction.name}</span>
            </div>
            
            <div class="status-options">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="${radioGroupName}" id="int_${index}" value="Interested" required>
                    <label class="form-check-label" for="int_${index}">Interested</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="${radioGroupName}" id="not_${index}" value="Not Interested">
                    <label class="form-check-label" for="not_${index}">Not Interested</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="${radioGroupName}" id="later_${index}" value="I will check later">
                    <label class="form-check-label" for="later_${index}">I will check later</label>
                </div>
            </div>
        </div>
        `;
    });
    listContainer.innerHTML = html;
}

function handleAuctionSubmit(event) {
    event.preventDefault();
    
    const errorMsg = document.getElementById('selectionError');
    
    // Validate that every auction has a selection
    // We loop through the number of auctions and check if a radio button is selected for that group
    let allSelected = true;
    for (let i = 0; i < AUCTIONS.length; i++) {
        const radios = document.getElementsByName(`status_${i}`);
        const isChecked = Array.from(radios).some(radio => radio.checked);
        if (!isChecked) {
            allSelected = false;
            break;
        }
    }

    if (!allSelected) {
        errorMsg.classList.remove('d-none'); // Show warning
    } else {
        errorMsg.classList.add('d-none'); // Hide warning
        
        // Here you would normally collect the data. For example:
        // let responses = [];
        // for (let i = 0; i < AUCTIONS.length; i++) {
        //     let selectedStatus = document.querySelector(`input[name="status_${i}"]:checked`).value;
        //     responses.push({ id: AUCTIONS[i].id, status: selectedStatus });
        // }
        // console.log(responses);

        // Hide Form, Show Success Message
        document.getElementById('formView').classList.add('d-none');
        document.getElementById('successView').classList.remove('d-none');
    }
}
