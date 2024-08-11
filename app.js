let ticket = {};
let tickets_list = JSON.parse(localStorage.getItem("tickets")) || [];
let editIndex = -1;

let currentPage = 1;
const itemsPerPage = 4;

let handleCHange = (event) => {
    let { name, value } = event.target;
    ticket[name] = value;
};

let btn = document.getElementById("btn");
let tickets = document.getElementById("tickets");
let pagination = document.getElementById("pagination");

const renderTickets = () => {
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let paginatedItems = tickets_list.slice(startIndex, endIndex);

    let tr = "";
    paginatedItems.forEach((item, index) => {
        tr += "<tr>" +
            "<td>" + (startIndex + index + 1) + "</td>" +
            "<td>" + item.full_name + "</td>" +
            "<td>" + item.phone_number + "</td>" +
            "<td>" + item.match + "</td>" +
            "<td>" + item.price + "</td>" +
            "<td>" +
            `<button class='btn btn-warning' onclick='editItem(${startIndex + index})'>Edit</button> ` +
            `<button class='btn btn-danger' onclick='deleteItem(${startIndex + index})'>Delete</button> ` +
            "</td>" +
            "</tr>";
    });
    tickets.innerHTML = tr;

    renderPagination();
};

const renderPagination = () => {
    let totalPages = Math.ceil(tickets_list.length / itemsPerPage);
    let paginationHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class='btn btn-secondary mx-1 ${i === currentPage ? 'active' : ''}' onclick='goToPage(${i})'>${i}</button>`;
    }

    pagination.innerHTML = paginationHTML;
};

const goToPage = (page) => {
    currentPage = page;
    renderTickets();
};

btn.addEventListener("click", function () {
    if (editIndex === -1) {
        tickets_list.push({ ...ticket });
    } else {
        tickets_list[editIndex] = { ...ticket };
        editIndex = -1;
    }

    localStorage.setItem("tickets", JSON.stringify(tickets_list));
    renderTickets();

    document.querySelector("form").reset();
    ticket = {};
});

let deleteItem = (index) => {
    tickets_list.splice(index, 1);
    localStorage.setItem("tickets", JSON.stringify(tickets_list));
    renderTickets();
};

let editItem = (index) => {
    ticket = tickets_list[index];
    editIndex = index;
    document.querySelector("[name='full_name']").value = ticket.full_name;
    document.querySelector("[name='phone_number']").value = ticket.phone_number;
    document.querySelector("[name='match']").value = ticket.match;
    document.querySelector("[name='price']").value = ticket.price;
};

renderTickets();
