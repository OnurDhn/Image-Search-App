// unsplash.com API key
const accessKey = "ow6SHSxV9gG2C6Q_DnFBo1yP8rM_F1JX5USurTxmwG4"
// to get elements of the form from index.html file
const formEl = document.querySelector("form")
// to change and search everything inside of input 
const searchInputEl = document.getElementById("search-input")
// it's a class and we need to get search results
const searchResultsEl = document.querySelector(".search-results")
// to get more images 
const showMoreButton = document.getElementById("show-more-button")


let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchResultsEl.innerHTML = "";
    }
    
    const results = data.results;
    
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    });
    
    page++;
    
    if (page > 1) {
        showMoreButton.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});