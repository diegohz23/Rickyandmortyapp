const url = 'https://rickandmortyapi.com/api/character'
const container = document.querySelector('.container')
const details = document.querySelector('.details')
const inputSearch = document.querySelector('#inputSearch')
const btnSearch = document.querySelector('#btnSearch')

const getData = (url) => fetch(url).then(res => res.json())

const createCard = (character) => {
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}">
        <button class="btn" data-id="${character.id}">Detalles</button>
    `
    return div
}

const switchInvisible = () => {
    container.classList.toggle('invisible')
    details.classList.toggle('invisible')
}

const searchById = (e) => {
    if (e.target.classList.contains('btn')) {
        const id = e.target.dataset.id
        getData(url + '/' + id).then(character => {

            const statusClass =
                character.status === 'Alive' ? 'alive' :
                character.status === 'Dead' ? 'dead' : 'unknown'

            details.querySelector('div').innerHTML = `
                <h2>${character.name}</h2>
                <img src="${character.image}">
                <p><strong>Género:</strong> ${character.gender}</p>
                <p class="status ${statusClass}">${character.status}</p>
                <p><strong>Origen:</strong> ${character.origin.name}</p>
                <p><strong>Ubicación:</strong> ${character.location.name}</p>
            `
            switchInvisible()
        })
    }
}

const searchByName = () => {
    const name = inputSearch.value
    if (name) {
        getData(url + '?name=' + name).then(data => {
            container.innerHTML = ''
            data.results.forEach(c => container.appendChild(createCard(c)))
        })
    }
}

const page = Math.floor(Math.random() * 42) + 1
getData(url + '?page=' + page).then(data => {
    data.results.forEach(c => container.appendChild(createCard(c)))
})

container.addEventListener('click', searchById)
btnSearch.addEventListener('click', searchByName)
