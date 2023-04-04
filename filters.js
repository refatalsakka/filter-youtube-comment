let filtersList = [];

const filtersObj = {
    init: function (currentFiltersList = []) {
        filtersList = currentFiltersList;
    },
    add: function (filter) {
        if (filter) {
            filtersList.push(filter.trim());
        }
    },
    remove: function (filter) {
        const index = filtersList.indexOf(filter.trim());
        if (index !== -1) {
            filtersList.splice(index, 1);
        }
    },
    edit: function (oldFilter, newFilter) {
        const index = filtersList.indexOf(oldFilter.trim());
        if (index !== -1) {
            filtersList[index] = newFilter.trim();
        }
    },
    getFiltersList: function () {
        return filtersList;
    }
};

Object.freeze(filtersObj);

export default filtersObj;