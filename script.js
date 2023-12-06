document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.getElementById('cards');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const tableViewBtn = document.getElementById('tableViewBtn');
    const searchInput = document.getElementById('searchInput');

    let currentPage = 1;
    const itemsPerPage = 10;
    const maxTotalItems = 80;

    // Fetching data and rendering cards initially
    fetchDataAndRenderCards();

    // Event listeners for grid and table view buttons
    gridViewBtn.addEventListener('click', function () {
        resetAndFetchData();
        cardsContainer.className = 'grid-view';
    });

    tableViewBtn.addEventListener('click', function () {
        resetAndFetchData();
        cardsContainer.className = 'table-view';
    });

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        applySearchFilter(searchInput.value.toLowerCase());
    });

    // Event listener for scrolling
    window.addEventListener('scroll', function () {
        if (shouldFetchNextPage()) {
            fetchNextPage();
        }
    });

    function resetAndFetchData() {
        currentPage = 1;
        fetchDataAndRenderCards();
    }

    function fetchDataAndRenderCards() {
        fetch(`https://6569b2fade53105b0dd77d63.mockapi.io/astra/v1/sample?_page=${currentPage}&_limit=${itemsPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                renderCards(data);
                currentPage++;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    function shouldFetchNextPage() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;

        return currentPage <= Math.ceil(maxTotalItems / itemsPerPage) && scrollPosition + windowHeight >= bodyHeight - 200;
    }

    function fetchNextPage() {
        fetchDataAndRenderCards();
    }

    function renderCards(data) {
        let data1 = "";
        data.forEach((values) => {
            data1 += `<div class="card">
                <h1 class="title">${values.title}</h1>
                <img src=${values.url} alt="img" class="images">
                <p>${values.thumbnailUrl}</p>
            </div>`;
        });
        cardsContainer.innerHTML += data1;
    }

    function applySearchFilter(searchText) {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            const title = card.querySelector('.title').textContent.toLowerCase();
            const thumbnail = card.querySelector('p').textContent.toLowerCase();
            const isVisible = title.includes(searchText) || thumbnail.includes(searchText);
            card.style.display = isVisible ? 'block' : 'none';
        });
    }
});