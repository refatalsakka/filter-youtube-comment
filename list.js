const listGroup = document.querySelector('.list-group');
let filtersList = [];

function remove() {
    const items = listGroup.querySelectorAll('.list-group-item span');

    [...items].forEach((item) => {
        if (!filtersList.includes(item.textContent)) {
            item.closest('.list-group-item').remove();
        }
    });
}

function add() {
    const items = listGroup.querySelectorAll('.list-group-item span');

    filtersList.forEach((filter) => {
        const wasAddedd = [...items].map((item) => item.textContent).includes(filter);

        if (!wasAddedd) {
            const newItemHtml = `
                <li class="list-group-item">
                    <div>
                        <span>${filter}</span>
                    </div>
                    <div class="buttons-add-edit">
                        <button class="btn btn-danger remove-item">&#215;</button>
                    </div>
                </li>
            `;
            listGroup.insertAdjacentHTML("afterbegin", newItemHtml);
        }
    });
}


const listObj = {
    init: function (currentFiltersList) {
        filtersList = currentFiltersList;
        this.update();
    },
    update: () => {
        add();
        remove();
    }
};

Object.freeze(listObj);

export default listObj;