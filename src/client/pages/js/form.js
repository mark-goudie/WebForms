document.getElementById("user-form").onsubmit = function (e) {
  e.preventDefault(); // Prevent page reload

  var formData = {
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    email: document.getElementById("email").value,
  };

  // Send form data to server
  fetch("http://localhost:3000/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
};
