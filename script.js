
document.addEventListener("DOMContentLoaded", (fetch("templates.json")
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => console.log("Templates loaded:", data))
  .catch(err => console.error("Error loading templates.json:", err));
) => {
  const templatesContainer = document.getElementById("templates-container");
  const form = document.getElementById("template-form");
  const output = document.getElementById("json-output");

  // Create and insert a search input at the top
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Search templates by title or category...";
  searchInput.style.width = "100%";
  searchInput.style.marginBottom = "15px";
  templatesContainer.parentNode.insertBefore(searchInput, templatesContainer);

  let templates = [];

  // Function to render templates on the page
  function renderTemplates(list) {
    templatesContainer.innerHTML = "";
    if (list.length === 0) {
      templatesContainer.textContent = "No templates found.";
      return;
    }
    list.forEach(template => {
      const div = document.createElement("div");
      div.classList.add("template-item");
      div.innerHTML = `
        <h3>${template.title}</h3>
        <p><strong>Category:</strong> ${template.category}</p>
        <pre>${template.message}</pre>
        <hr />
      `;
      templatesContainer.appendChild(div);
    });
  }

  // Load templates.json and render templates
  fetch("templates.json")
    .then(response => response.json())
    .then(data => {
      templates = data;
      renderTemplates(templates);
    })
    .catch(() => {
      templatesContainer.textContent = "Failed to load templates.";
    });

  // Filter templates on search input
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = templates.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query) ||
      t.message.toLowerCase().includes(query)
    );
    renderTemplates(filtered);
  });

  // Handle form submit: generate JSON snippet and reset form
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
