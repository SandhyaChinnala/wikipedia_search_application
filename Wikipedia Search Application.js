let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //create result item -- Div container --- result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    searchResultsEl.appendChild(resultItemEl);

    //create Title Element -- Anchor -- title --- result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";

    resultItemEl.appendChild(resultTitleEl);

    //create Break Element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //create URL Element -- Anchor --- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;

    resultItemEl.appendChild(urlEl);
    //create Break Element
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //create Description Element -- paragraph --- link-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;

    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            methos: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }

}

searchInputEl.addEventListener("keydown", searchWikipedia);