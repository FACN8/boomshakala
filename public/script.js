const search = document.getElementById('input');
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
    const url = "/?search=" + search;
    fetchData(url, (data) => {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        data.forEach(element => {
            var item = document.createElement('li');
            item.className = 'li-suggestion round-corners';
            var span = document.createElement('span');
            span.textContent = element;
            item.appendChild(span);
            ul.appendChild(item);
        })
        if (ul.firstChild) {
            document.querySelector('input').style.borderRadius = '25px 25px 0 0';
        } else {
            document.querySelector('input').style.borderRadius = '25px 25px 25px 25px';
        }
    });
}

search.addEventListener('input', () => searchAnimals(search.value));
search.addEventListener('submit', (event) => { event.preventDefault(); });