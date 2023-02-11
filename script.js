const searchIconElement = document.querySelector(".search-icon");
const messageElement = document.querySelector(".message-text");
const wordElement = document.querySelector(".word");
const meaningElement = document.querySelector(".meaning");
const meaningAreaElement = document.querySelector(".meaning-area");
const audioElement = document.querySelector(".audio audio");
const inputElement = document.querySelector(".search-bar input");

async function getMeaning(word) {
  try {
    messageElement.style.display = "block";
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const data = await fetch(url).then((res) => res.json());

    if (data.title) {
      messageElement.innerHTML = data.title;
      meaningAreaElement.style.display = "none";
    } else {
      messageElement.style.display = "none";
      meaningAreaElement.style.display = "block";
      audioElement.parentElement.style.display = 'block'
      wordElement.innerHTML = word;
      meaningElement.innerHTML = data[0].meanings[0].definitions[0].definition;
      audioElement.setAttribute(
        "src",
        data[0].phonetics[0].audio
          ? data[0].phonetics[0].audio
          : data[0].phonetics[1].audio
      );
    }
  } catch (error) {
    console.log(error);
  }
}
let wordToSearch = ''
inputElement.addEventListener("keyup", (e) => {
  wordToSearch = e.target.value;
  if (e.target.value && e.key === "Enter") {
    getMeaning(wordToSearch);
  }
});
searchIconElement.addEventListener("click", () => {
    getMeaning(wordToSearch);
});

