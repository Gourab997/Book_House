const loadBook = () => {
    const searchInputText = document.getElementById('search-input')
    const displayCountDiv = document.getElementById('total-count')
    const searchText = searchInputText.value
    searchInputText.value = ''
    displayBooks('none')
    displaySpinner('block')

    try {
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displayResult(data))
    }
    catch (err) {
        displayCountDiv.innerHTML = `<h3> ${err.message} </h3>`;
    }




}

const displayBooks = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

const displaySpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}


const displayResult = books => {


    const bookAll = books.docs
    const displayDiv = document.getElementById('search-result')
    const displayCountDiv = document.getElementById('total-count')

    displayCountDiv.innerHTML = `<p class= d-block> Search result  ${books.numFound} founds </p> `

    if (bookAll.length === 0) {

        const h3 = document.createElement('h3')
        h3.classList = "text-danger text-center"
        h3.innerText = "No result Found"

        displayCountDiv.appendChild(h3)
        displaySpinner('none')

    } else {
        bookAll?.forEach(book => {

            if (typeof (book.author_name) !== "undefined") {
                const div = document.createElement('div')
                div.classList = "container card-group"
                div.innerHTML = `

    <div class="card "w-50 ">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="image-result" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                
                <p class="card-text fs-6">By ${book.author_name[0] ? book.author_name[0] : ''}</p>
                <p class="card-text">First published in ${book.first_publish_year ? book.first_publish_year : ' '}</p>
                <p class="card-text fs-6">Publisher: ${book.publisher ? book.publisher : ' '}</p>
                
            </div>
    
    `

                displayDiv.appendChild(div)
                displayBooks('grid')
            }




        });
    }


    displaySpinner('none')
}


