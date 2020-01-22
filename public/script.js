const search = document.getElementById('input');
const matchList = document.getElementById('match-list');
const ul = document.getElementById('ul');

function fetchData(url, callback) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            callback(data);
        })
        .catch(function() {
            callback(null);
        })
};

function searchAnimals(search) {
    const url = "http://localhost:8080/?search=" + search;
    fetchData(url, (data) => {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild)
        }
        console.log(data);
        data.forEach(element => {
            var item = document.createElement('li');
            var span = document.createElement('span');
            span.textContent = element
            item.appendChild(span)
            ul.appendChild(item)
        })
    });
}
search.addEventListener('input', () => searchAnimals(search.value));