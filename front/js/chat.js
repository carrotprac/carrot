const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

let currentDate = new Date().toLocaleString("ko-KR", options);

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  console.log(msg);
  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  // socket.emit('chatMessage', msg);
  outputMessage(msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("정말 떠날거에요??");
  if (leaveRoom) {
    window.location = "./index.html";
  } else {
  }
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");

  const p = document.createElement("p");
  p.classList.add("meta");
  // p.innerText = message.username;
  p.innerHTML += `<span>${currentDate}</span>`;
  div.appendChild(p);

  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message;
  div.appendChild(para);

  document.querySelector(".chat-messages").appendChild(div);
}
