const search = document.getElementById('input');
const form = document.getElementById('searchForm');
const ul = document.getElementById('ul');
const liSuggestion = document.querySelectorAll('.li-suggestion');

var currentSelected = 0;
var itemsLength = 0;

//Dynamic function to fetch data from URL
function fetchData(url, callback) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            callback(data);
        })
        .catch(function () {
            callback(null);
        })
};

//Event handler for user input (autocomplete list)
function searchAnimals(search) {
    const url = "/?search=" + search;
    currentSelected = 0;
    fetchData(url, (data) => {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        itemsLength = data.length;

        //Populating <ul> list for autocomplete options
        data.forEach(element => {
            var a = document.createElement('a');
            var str = element;
            while (str.includes(' ')) str = str.replace(' ', '_');
            a.setAttribute('href', "http://wikipedia.org/wiki/" + str);
            var item = document.createElement('li');
            item.className = 'li-suggestion round-corners';
            var span = document.createElement('span');
            span.textContent = element;
            item.appendChild(span);
            a.appendChild(item);
            ul.appendChild(a);
        })
        if (ul.firstChild) {
            document.querySelector('input').style.borderRadius = '30px 30px 0 0';
            ul.childNodes[currentSelected].firstChild.style.background = 'rgb(228, 228, 228)';
        } else {
            document.querySelector('input').style.borderRadius = '30px 30px 30px 30px';
        }
    });
}

search.addEventListener('keyup', (event) => {
    ul.childNodes[currentSelected].firstChild.style.background = 'white';
    if (event.keyCode === 40) { // 40 is key code for Arrow Down
        currentSelected++;
        if (currentSelected > itemsLength - 1) {
            currentSelected = 0;
        }
    }
    else if (event.keyCode === 38) { // 38 is key code for Arrow Up
        currentSelected--;
        if (currentSelected < 0) {
            currentSelected = itemsLength - 1;
        }
    } else if (event.keyCode === 13) { // 13 is key code for Enter
        window.location.href = ul.childNodes[currentSelected];
    }
    ul.childNodes[currentSelected].firstChild.style.background = 'rgb(228, 228, 228)';
});

search.addEventListener('input', () => searchAnimals(search.value));
form.addEventListener('submit', (event) => { event.preventDefault(); });