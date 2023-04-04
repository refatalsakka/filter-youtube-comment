import filtersObj from "./filters.js";
import listObj from "./list.js";
import commentSectionObj from "./comment_section.js";
import { LOCAL_STORAGE_KEY } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.querySelector('#textInput');
    const listGroup = document.querySelector('.list-group');

    chrome.storage.sync.get(LOCAL_STORAGE_KEY, function (res) {
        filtersObj.init(res[LOCAL_STORAGE_KEY] ? JSON.parse(res[LOCAL_STORAGE_KEY]) : []);
        listObj.init(filtersObj.getFiltersList());
        commentSectionObj.init(filtersObj.getFiltersList());

        textInput.addEventListener("keydown", function (event) {
            if (event.key !== "Enter") {
                return;
            }
            filtersObj.add(textInput.value);
            listObj.update();
            commentSectionObj.update();
            chrome.storage.sync.set({[LOCAL_STORAGE_KEY]: JSON.stringify(filtersObj.getFiltersList())});
            textInput.value = ""
        });
    
    
        listGroup.addEventListener("click", function (e) {
            const removeButton = e.composedPath().find((elm) => elm.classList?.contains('remove-item'));
    
            if (!removeButton) {
                return;
            }
    
            const filter = removeButton.closest(".list-group-item").querySelector('span').textContent;
    
            filtersObj.remove(filter);
            listObj.update();
            commentSectionObj.update();
            chrome.storage.sync.set({[LOCAL_STORAGE_KEY]: JSON.stringify(filtersObj.getFiltersList())});
        });
    });
});