const containerVideos = document.querySelector(".videos__container")

async function fetchAndShowVideos(){
    try{
        const search = await fetch("http://localhost:3000/videos");
        const videos = await search.json();

            videos.forEach((video)=> {
                if(video.categoria == ""){
                    throw new Error('Vídeo não tem categoria');
                }
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
            })
    } catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

fetchAndShowVideos();

const searchBar = document.querySelector(".pesquisar__input")
searchBar.addEventListener("input", filterSearch)

function filterSearch() {
    const videos = document.querySelectorAll(".videos__item")
    const filterValue = searchBar.value.toLowerCase()

    videos.forEach((video) => {
        const title = video.querySelector('.titulo-video').textContent.toLowerCase()
        video.style.display = filterValue ? title.includes(filterValue) ? 'block': 'none' : 'block';
    })
}

const categoryButton = document.querySelectorAll(".superior__item");

categoryButton.forEach((button) => {
    let categoryName = button.getAttribute("name");
    button.addEventListener('click', () => filterCategory(categoryName));
})

function filterCategory(filter) {
    const videos = document.querySelectorAll(".videos__item");
    for (let video of videos) {
        let category = video.querySelector(".categoria").textContent.toLocaleLowerCase();
        let filterValue = filter.toLocaleLowerCase();

        if (!category.includes(filterValue) && filterValue != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}
