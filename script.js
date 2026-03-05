document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    //seter for entries
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const occupation = document.getElementById("occupation").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const role = document.getElementById("role").value.trim();
    const isleader = document.getElementById('leader').checked;
    const arrivalTime = new Date().toLocaleTimeString();

    if (!name || !phone || !occupation || !gender) {
        alert("Please fill out all fields!");
        return;
    }
    
    //Top_header
    const message = `*𝐁𝐔𝐍𝐆𝐎𝐌𝐀 𝐓𝐎𝐖𝐍𝐒𝐇𝐈𝐏 𝐀𝐋𝐓𝐄𝐑*\n\n📌 *𝙉𝙚𝙬 𝙈𝙚𝙢𝙗𝙚𝙧 𝙝𝙖𝙨 𝙍𝙚𝙜𝙞𝙨𝙩𝙚𝙧𝙚𝙙 𝙝𝙚𝙧𝙚 𝙖𝙧𝙚 𝙩𝙝𝙚 𝙙𝙚𝙩𝙖𝙞𝙡𝙨*...\n👤 *𝗡𝗮𝗺𝗲:* ${name}\n📞 *𝗣𝗵𝗼𝗻𝗲:* ${phone}\n💼 *𝗢𝗰𝗰𝘂𝗽𝗮𝘁𝗶𝗼𝗻:* ${occupation}\n⚧ *𝗚𝗲𝗻𝗱𝗲𝗿:* ${gender}\n⚧ *role:* ${role}\n⚧ *leader:* ${isleader}\n\n⏳ *The person was registered at*${arrivalTime}`;

    //get_request from telegram
    fetch(`https://api.telegram.org/bot8798259574:AAFnQuoVbM6lqCVlKGv35QeTZLPcJcr0oUA/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: "6905578808", text: message, parse_mode: "Markdown" })
    });

    document.getElementById("registrationForm").reset();

    // Store recent registrations
    addToHistory(name, arrivalTime);
});

// Toggle About Us Modal
document.getElementById("aboutBtn").addEventListener("click", function() {
    document.getElementById("aboutModal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("aboutModal").style.display = "none";
});

// Store last 5 registrations
function addToHistory(name, time) {
    const historyList = document.getElementById("historyList");
    const entry = document.createElement("li");
    entry.textContent = `👤 ${name} - 🕒 ${time}`;
    historyList.prepend(entry);

    if (historyList.children.length > 70) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Get User Location
document.getElementById("getLocation").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            alert(`📍 Location: Latitude ${position.coords.latitude}, Longitude ${position.coords.longitude}`);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});