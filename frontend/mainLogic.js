function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function displayItems(arrayOfObjects) {
    const wrapperMain = document.querySelector(".wrapper__main");
    const newWrapper = document.createElement('section');
    newWrapper.classList.add('box-list');
    wrapperMain.appendChild(newWrapper);
    arrayOfObjects.forEach((e) => {
        const imageJson = checkResolution(e);
        changeHighResolutionSizeImg(imageJson);
        const subscriberCount = parseInt(e.statistics.subscriberCount).toLocaleString('en-US');
        const videoCount = parseInt(e.statistics.videoCount).toLocaleString('en-US');
        const viewCount = parseInt(e.statistics.viewCount).toLocaleString('en-US');
        const newChannel = document.createElement('article');
        newChannel.classList.add('box');
        newChannel.innerHTML =
            `<a href="${e.customUrl}"><img class="box__image" src="${imageJson.url}" style="width:${imageJson.width}px; height:${imageJson.height}px;" alt="logo page" title="picture page"></a> 
    <h2 class="box__heading" id="heading-title">${e.title}</h2>
    <div class="box__items">
        <ul class="items__informations">
            <li class="informations-paragraph">Subscribers:</li>
            <li class="informations-numbers" id="informations-subscribers">${subscriberCount}</li>
        </ul>
        <ul class="items__informations">
            <li class="informations-paragraph">Videos:</li>
            <li class="informations-numbers" id="informations-video">${videoCount}</li>
        </ul>
        <ul class="items__informations">
            <li class="informations-paragraph">Views:</li>
            <li class="informations-numbers" id="informations-view">${viewCount}</li>
        </ul>
    </div>`
        newWrapper.appendChild(newChannel);
    });
}

function checkResolution(e) {
    if (window.screen.width >= 320 && window.screen.width <= 768) {
        return e.thumbnails.default;
    } else if (window.screen.width > 768 && window.screen.width <= 1440) {
        return e.thumbnails.medium;
    } else if (window.screen.width > 1440) {
        return e.thumbnails.high;
    }
}

function changeHighResolutionSizeImg(imageJson) {
    if (window.screen.width > 1440) {
        imageJson.width = 300;
        imageJson.height = 300;
    }
}

function checkWhatIsMarkedAsSearchSortItem() {
    const buttonsArr = Array.from(document.querySelectorAll('.choice--radio'));
    const checkedButton = buttonsArr.filter(button => button.checked === true);
    if (checkedButton[0].id === 'sort-title')
        return '#heading-title';
    else if (checkedButton[0].id === 'sort-subscribers')
        return '#informations-subscribers';
    else if (checkedButton[0].id === 'sort-videos')
        return '#informations-video';
    else if (checkedButton[0].id === 'sort-views')
        return '#informations-view';
    else
        return undefined;
}

function removePolishSigns(text) {
    return text.replace(/ą/g, "a").replace(/ć/g, "c")
        .replace(/ę/g, "e").replace(/ł/g, "l")
        .replace(/ń/g, "n").replace(/ó/g, "o")
        .replace(/ś/g, "s").replace(/ż|ź/g, "z");
}

const searchEngine = e => {
    const boxes = document.querySelectorAll('.box');
    const text = e.target.value.toLowerCase();
    const textWithoutPolishSigns = removePolishSigns(text);
    const whatToSearchFor = checkWhatIsMarkedAsSearchSortItem();
    boxes.forEach(el => {
        const contentString = el.querySelector(whatToSearchFor);
        if (contentString.innerHTML.toLowerCase().indexOf(textWithoutPolishSigns) !== -1) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
};

const sortItems = e => {
    const sortButton = document.querySelector('.change-sort');
    sortButton.classList.toggle('asc');
    const sortedAsc = !!document.querySelector('.asc');
    const buttonsArr = Array.from(document.querySelectorAll('.choice--radio'));
    const checkedButton = buttonsArr.filter(button => button.checked === true);
    if (checkedButton[0].id === 'sort-title' && sortedAsc === true) {
        const sortedByTitleAsc = JSON.parse(httpGet('http://localhost:3000/api/data/sortedByTitleAsc'));
        const existingWrapper = document.querySelector('section');
        existingWrapper.remove();
        displayItems(sortedByTitleAsc);
    }
    if (checkedButton[0].id === 'sort-title' && sortedAsc === false) {
        const sortedByTitleDesc = JSON.parse(httpGet('http://localhost:3000/api/data/sortedByTitleDesc'));
        const existingWrapper = document.querySelector('section');
        existingWrapper.remove();
        displayItems(sortedByTitleDesc);
    }
    if (checkedButton[0].id === 'sort-subscribers' && sortedAsc === true) {
        const sortedBySubscribersAsc = JSON.parse(httpGet('http://localhost:3000/api/data/sortedBySubscribersAsc'));
        const existingWrapper = document.querySelector('section');
        existingWrapper.remove();
        displayItems(sortedBySubscribersAsc);
    }
    if (checkedButton[0].id === 'sort-subscribers' && sortedAsc === false) {
        const sortedBySubscribersDesc = JSON.parse(httpGet('http://localhost:3000/api/data/sortedBySubscribersDesc'));
        const existingWrapper = document.querySelector('section');
        existingWrapper.remove();
        displayItems(sortedBySubscribersDesc);
    }
    if (checkedButton[0].id === 'sort-videos' && sortedAsc === true) {
        const sortedByVideoCountAsc = JSON.parse(httpGet('http://localhost:3000/api/data/sortedByVideoCountAsc'));
        const existingWrapper = document.querySelector('section');
        existingWrapper.remove();
        displayItems(sortedByVideoCountAsc);
    }
    if (checkedButton[0].id === 'sort-videos' && sortedAsc === false) {
        const sortedByVideoCountDesc = JSON.parse(httpGet('http://localhost:3000/api/data/sortedByVideoCountDesc'));
        const existingWrapper = document.querySelector('section');
        existingWrapper.remove();
        displayItems(sortedByVideoCountDesc);
    }
    if (checkedButton[0].id === 'sort-views' && sortedAsc === true) {
        const sortedByViewsCountAsc = JSON.parse(httpGet('http://localhost:3000/api/data/sortedByViewsCountAsc'));
        const existingWrapper = document.querySelector('section');
        existingWrapper.remove();
        displayItems(sortedByViewsCountAsc);
    }
    if (checkedButton[0].id === 'sort-views' && sortedAsc === false) {
        const sortedByViewsCountDesc = JSON.parse(httpGet('http://localhost:3000/api/data/sortedByViewsCountDesc'));
        const existingWrapper = document.querySelector('section');
        existingWrapper.remove();
        displayItems(sortedByViewsCountDesc);
    }
};

const arrayOfObjectsUnsorted = JSON.parse(httpGet('http://localhost:3000/api/data/unsorted'));
displayItems(arrayOfObjectsUnsorted);

const filterInput = document.querySelector('.filter__input');
filterInput.addEventListener('keyup', searchEngine);

const sortButton = document.querySelector('.change-sort');
sortButton.addEventListener('click', sortItems);


const clearBtn = document.querySelector(".button");
const radioBtn = document.querySelector(".choice");
const clearEverything = () => {
    const buttonsArr = Array.from(document.querySelectorAll('.choice--radio'));
    buttonsArr.forEach(el => {
        el.checked = false;
    })
    filterInput.value = '';
    const existingWrapper = document.querySelector('section');
    existingWrapper.remove();
    displayItems(arrayOfObjectsUnsorted);
}
clearBtn.addEventListener('click', clearEverything);





