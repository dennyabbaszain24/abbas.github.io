// penangkap class html

// const searchButton = document.querySelector('.search-button')



// // fungsi search film

// searchButton.addEventListener('click', () => {

//     const inputKeyword = document.querySelector('.input-keyword')
//     fetch('http://www.omdbapi.com/?apikey=b673cdd1&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             const movies = response.Search;
//             let card = '';
//             movies.forEach(m => {
//                 card += cardHtml(m);
//                 const cards = document.querySelector('.movie-card')
//                 cards.innerHTML = card;


//                 // fungsi modal movie detail
//                 const modalButton = document.querySelectorAll('.modal-button')
//                 modalButton.forEach(mb => {
//                     mb.addEventListener('click', function () {
//                         const imdbid = this.dataset.imdbid

//                         fetch('http://www.omdbapi.com/?apikey=b673cdd1&i=' + imdbid)
//                             .then(result => result.json())
//                             .then(result => {
//                                 let modalM = '';
//                                 modalM += modalHtml(result)
//                                 const modalContainer = document.querySelector('.modal-body')
//                                 modalContainer.innerHTML = modalM
//                             })
//                     })

//                 })



//             })
//         })

// })



// function pencarian 

const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async () => {
    try {
        const inputKeyword = document.querySelector('.input-keyword')
        const movies = await getMovies(inputKeyword.value);
        UIs(movies)
    } catch (error) {
        const err = document.querySelector('.movie-card')
        const salah = conge(error)

        err.innerHTML = salah

    }

})

function conge(error) {
    return `<div class="col-md-3 imgB justify-content-center text-center">
                <img src="img/2.jfif" class="img-fluid">
                <h5>${error}</h5>
            </div>`
}

// event binding

document.addEventListener('click', async e => {
    if (e.target.classList.contains('modal-button')) {
        const imdbid = e.target.dataset.imdbid
        const result = await getDetail(imdbid)
        UIsdetail(result)
    }
})


// function modal


function getDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=b673cdd1&i=' + imdbid)
        .then(result => result.json())
        .then(result => result)
}


// function card

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=b673cdd1&s=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(response => {
            if (response.Response === 'False') {
                throw new Error(response.Error)
            }
            return response.Search
        })
}


function UIsdetail(result) {
    let modalM = '';
    modalM += modalHtml(result)
    const modalContainer = document.querySelector('.modal-body')
    modalContainer.innerHTML = modalM
}




function UIs(movies) {
    let card = '';
    movies.forEach(m => {
        card += cardHtml(m);
        const cards = document.querySelector('.movie-card')
        cards.innerHTML = card;

    })
}





function cardHtml(m) {
    return `<div class="col-md-4 my-3">
                <div class = "card" >
                <img src="${m.Poster}" class="card-img-top" >
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                     <a href ="#" class="btn btn-primary modal-button"
                     data-toggle ="modal"
                     data-target ="#movieDetailModal" data-imdbid="${m.imdbID}"> Show Details </a>
                     </div>
                     </div>
                     </div>
                     
             `
}

function modalHtml(result) {
    return ` <div class="container-fluid modal-container">
                            <div class="row">
                                <div class="col-md-3 imgB">
                                    <img src="${result.Poster}" class="img-fluid">
                                </div>
                                <div class="col-md">
                                    <ul class="list-group">
                                        <li class="list-group-item ">
                                            <h5>${result.Title}</h5>
                                            <h6>(${result.Year})</h6>
                                            <h6><strong>Alur : </strong>${result.Plot}</h6>
                                        </li>
                                        <li class="list-group-item"><strong>Genre : </strong>${result.Genre}</li>
                                        <li class="list-group-item"><strong>Tanggal Rilis : </strong>${result.Released}</li>
                                        <li class="list-group-item"><strong>Runtime : </strong>${result.Runtime}</li>
                                        <li class="list-group-item"><strong>Direktur : </strong>${result.Director}</li>
                                        <li class="list-group-item"><strong>Imdb Rating : </strong>${result.imdbRating}</li>
                                        <li class="list-group-item"><strong>Negara : </strong>${result.Country}</li>
                                        <li class="list-group-item"><strong>Anggaran : </strong> ${result.BoxOffice}</li>
                                        <li class="list-group-item"><strong>Produksi : </strong>${result.Production}</li>
                                        <li class="list-group-item"><strong>Pemeran : </strong>${result.Actors}</li>
                                    </ul>

                                </div>
                            </div>
                        </div>`
}