const myInput = document.getElementById("myInput");
const keyPressed = document.querySelector(".keyPressed");
const keyCode = document.querySelector(".keyCode");
const eventType = document.querySelector(".eventType");
const history = document.querySelector(".history");
const clearHistory = document.querySelector(".clearHistory");
function loadHistory() {
    const savedHistory =
        JSON.parse(localStorage.getItem("keyEventHistory")) || [];
    savedHistory.forEach((event, index) => {
        const eventRecord = document.createElement("p");
        eventRecord.innerHTML = `${index + 1}. ${event}`;
        history.appendChild(eventRecord);
    });
    history.scrollTop = history.scrollHeight;
}

clearHistory.addEventListener("click", () => {
    localStorage.removeItem("keyEventHistory");
    history.innerHTML = "";
    window.location.reload();
});

function saveHistory(event) {
    const savedHistory =
        JSON.parse(localStorage.getItem("keyEventHistory")) || [];
    savedHistory.push(event);
    localStorage.setItem("keyEventHistory", JSON.stringify(savedHistory));
}

function displayEventDetails(e) {
    keyPressed.innerHTML = `Key Pressed: ${e.key}`;
    keyCode.innerHTML = `Key Code: ${e.keyCode}`;
    eventType.innerHTML = `Event Type: ${e.type}`;

    const eventRecord = `${history.childElementCount + 1}. Key: ${
        e.key
    }, Code: ${e.keyCode}, Type: ${e.type}`;
    const eventElement = document.createElement("p");
    eventElement.innerHTML = eventRecord;
    history.appendChild(eventElement);

    saveHistory(eventRecord);
    history.scrollTop = history.scrollHeight;
}

myInput.addEventListener("keydown", (e) => {
    displayEventDetails(e);
    myInput.value = "";
});

myInput.addEventListener("keyup", (e) => {
    displayEventDetails(e);
});

loadHistory();
