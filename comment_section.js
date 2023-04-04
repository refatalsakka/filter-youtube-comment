let filtersList = [];

function removeComments() {
    chrome.runtime.sendMessage({ type: 'filter_comments', filtersList });
}

const commentSectionObj = {
    init: function (currentFiltersList) {
        filtersList = currentFiltersList;
        this.update();
    },
    update: function () {
        removeComments();
    }
};

Object.freeze(commentSectionObj);

export default commentSectionObj;