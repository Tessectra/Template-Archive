document.addEventListener("DOMContentLoaded", () => {
  // Fetch the templates.json file
  fetch("templates.json")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      console.log("Templates loaded:", data);

      const templatesContainer = document.getElementById("templates-container");

      // Display templates in the container
      data.forEach(template => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${template.title}</h3><p><em>${template.category}</em></p><p>${template.message}</p>`;
        templatesContainer.appendChild(div);
      });
    })
    .catch(err => console.error("Error loading templates.json:", err));

  // Form logic for generating JSON snippet on submit
  const form = document.getElementById("template-form");
  const output = document.getElementById("json-output");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const message = document.getElementById("message").value.trim();

    if (title && category && message) {
      const jsonSnippet = {
        title: title,
        category: category,
        message: message
      };
      output.textContent = JSON.stringify(jsonSnippet, null, 2);
      form.reset();
    }
  });
});

