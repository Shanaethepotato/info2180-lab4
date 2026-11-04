document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search");
  const button = document.getElementById("searchBtn");
  const result = document.getElementById("result");

  function search() {
    // Trim, then URL-encode the term so it is safe inside the query string
    const term = input.value.trim();
    const url = "superheroes.php?query=" + encodeURIComponent(term);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }
        return response.text();
      })
      .then((html) => {
        // PHP has already escaped the user's input before echoing anything
        result.innerHTML = html;
      })
      .catch((error) => {
        result.textContent = "Something went wrong. Please try again.";
        console.error(error);
      });
  }

  button.addEventListener("click", search);

  // Let Enter trigger the search as well
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") search();
  });
});