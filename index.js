const inputField = document.getElementById('inputField');
const saveBtn = document.getElementById('saveBtn');
const tabBtn = document.getElementById('tabBtn');
const deleteBtn = document.getElementById('deleteBtn');
const linkContent = document.getElementById('linkContent');

let myLinks = []; // make an array for contain value
let getLocalStorageData = JSON.parse(localStorage.getItem('MyLinks')); // get the data from localstorage
if (getLocalStorageData) { // check localStorage has any value or not
    myLinks = getLocalStorageData;
    render(myLinks);
}
function render(links) { // showing the data to UI
    let listItems = '';
    for (let i = 0; i < links.length; i++) {
        listItems += `
                <li>
                    <a target='_blank' href='${links[i]}'>${links[i]}</a>
                </li>
            `
    }
    linkContent.innerHTML = listItems;
}
// Save Button Click To Save content
saveBtn.addEventListener('click', function () {
    if (inputField.value == '') {
        alert("Enter an URL");
    } else {
        myLinks.push(inputField.value);
        localStorage.setItem('MyLinks', JSON.stringify(myLinks));
        render(myLinks);
        inputField.value = '';
    }
})


tabBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("MyLinks", JSON.stringify(myLinks));
        render(myLinks);
    })
})

// Delete Functionality
deleteBtn.addEventListener('click', function () {
    localStorage.clear();
    myLinks = [];
    render(myLinks);
})