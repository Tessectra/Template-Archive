document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const templateList = document.getElementById("templateList");

  fetch("templates.json")
    .then((res) => res.json())
    .then((templates) => {
      input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        const results = templates.filter((template) =>
          template.keywords.some((k) => k.toLowerCase().includes(query))
        );

        templateList.innerHTML = "";

        if (results.length === 0) {
          templateList.innerHTML = "<p>No matching templates found.</p>";
        } else {
          results.forEach((template) => {
            const div = document.createElement("div");
            div.className = "template";
            div.innerHTML = `<h2>${template.title}</h2><p>${template.content}</p>`;
            templateList.appendChild(div);
          });
        }
      });
    });
});
