let ticket = {}
let tickets_list = JSON.parse(localStorage.getItem("tickets")) || []
let editIndex = -1;  

let handleCHange = (event) => {
    let { name, value } = event.target
    ticket[name] = value
} 

let btn = document.getElementById("btn");
let tickets = document.getElementById("tickets");

const renderTickets = () => {
    let tr = ""
    tickets_list.forEach((item, index) => {
        tr += "<tr>" +
            "<td>"+ (index + 1) + "</td>" +
            "<td>"+ item.full_name  +"</td>" +
            "<td>" +  item.phone_number  +"</td>" +
            "<td>"+ item.match  +"</td>" +
            "<td>"+ item.price  +"</td>" +
            "<td>"+
                `<button class='btn btn-warning' onclick='editItem(${index})'>Edit</button> ` +
                `<button class='btn btn-danger' onclick='deleteItem(${index})'>Delete</button> ` +
            "</td>" +
        "</tr>"
    })
    tickets.innerHTML = tr
}

btn.addEventListener("click", function() {
    if (editIndex === -1) {
        tickets_list.push({...ticket})
    } else {
        tickets_list[editIndex] = {...ticket}
        editIndex = -1;  
    }

    localStorage.setItem("tickets", JSON.stringify(tickets_list))
    renderTickets()

    document.querySelector("form").reset();
    ticket = {}
})

let deleteItem = (index) => {
    tickets_list.splice(index, 1)
    localStorage.setItem("tickets", JSON.stringify(tickets_list))
    renderTickets()
}

let editItem = (index) => {
    ticket = tickets_list[index]
    editIndex = index;  
    document.querySelector("[name='full_name']").value = ticket.full_name
    document.querySelector("[name='phone_number']").value = ticket.phone_number
    document.querySelector("[name='match']").value = ticket.match
    document.querySelector("[name='price']").value = ticket.price
}

renderTickets()
