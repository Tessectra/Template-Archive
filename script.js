document.addEventListener("DOMContentLoaded", function () {
  fetch("templates.json")
    .then((response) => response.json())
    .then((data) => {
      const searchInput = document.getElementById("searchInput");
      const templateList = document.getElementById("templateList");

      function renderTemplates(templates) {
        templateList.innerHTML = "";
        templates.forEach((template) => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${template.title}</strong><p>${template.content}</p>`;
          templateList.appendChild(li);
        });
      }

      searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = data.templates.filter((t) =>
          t.title.toLowerCase().includes(keyword) ||
          t.content.toLowerCase().includes(keyword)
        );
        renderTemplates(filtered);
      });

      renderTemplates(data.templates);
    });
});
