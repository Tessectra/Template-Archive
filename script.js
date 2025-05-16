
document.addEventListener("DOMContentLoaded", () => {
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
