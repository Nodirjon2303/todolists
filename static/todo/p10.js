function send_data(status = 'create', id = 0) {
    console.log("Ishladi")
    description = document.getElementById("todo_description").value;
    datetime = document.getElementById('todotime').value;


    console.log(description)
    console.log(datetime)
    if (description && datetime) {
        var url = `/`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                "description": description,
                'datetime': datetime,
                'status': status,
                'id': id
            })
        })
            .then((response) => {
                response.json().then((data) => {
                    console.log(data)
                    window.location.href = '/'
                })
            })
    }

}


function delete_todo(todo_id) {
    console.log("O'chirish kerak", todo_id)
    var url = `/delete/`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'delete_id': todo_id
        })
    })
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                window.location.href = '/'
            })
        })
}


function check_todo(todo_id) {
    console.log("Check qilish kerak", todo_id)
    var url = `/check/`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'todo_id': todo_id
        })
    })
        .then((response) => {
            response.json().then((data) => {
                console.log(data)
                window.location.href = '/'
            })
        })


}


function filter_todo() {
    filter = document.getElementById('filter_todo').value;
    console.log(filter)
    var url = `/filter/`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'filter': filter
        })
    })
        .then((response) => {
            response.json().then((data) => {
                data = data['data']
                console.log(data)
                html = ``

                for (i = 0; i < data.length; i++) {
                    html += `
                        <div class="row px-3 align-items-center todo-item rounded">
                    <div class="col-auto m-1 p-0 d-flex align-items-center">
                        <h2 class="m-0 p-0">`
                            if ( data[i].status == 'done' ) {
                                html+=` <i class="fa fa-square-o text-primary btn m-0 p-0 d-none" data-toggle="tooltip"
                                   data-placement="bottom" title="Mark as complete"></i>
                                <i class="fa fa-check-square-o text-primary btn m-0 p-0" data-toggle="tooltip"
                                   data-placement="bottom" title="Mark as todo"></i>`
                            }
                            else {
                                html+= ` <i class="fa fa-square-o text-primary btn m-0 p-0" data-toggle="tooltip"
                                   data-placement="bottom" title="Mark as complete"></i>
                                <i class="fa fa-check-square-o text-primary btn m-0 p-0 d-none" data-toggle="tooltip"
                                   data-placement="bottom" title="Mark as todo"></i>`
                            }
                            html+=`
                        </h2>
                    </div>
                    <div class="col px-1 m-1 d-flex align-items-center">
                        <input type="text"
                               class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
                               readonly value="${data[i].title}" title="Renew car insurance"/>
                        <input type="text"
                               class="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"
                               value="${data[i].title}"/>
                    </div>
                    <div class="col-auto m-1 p-0 px-3">
                        <div class="row">
                            <div class="col-auto d-flex align-items-center rounded bg-white border border-warning">
                                <i class="fa fa-hourglass-2 my-2 px-2 text-warning btn" data-toggle="tooltip"
                                   data-placement="bottom" title="" data-original-title="Due on date"></i>
                                <h6 class="text my-2 pr-2">${data[i].duetime}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto m-1 p-0 todo-actions">
                        <div class="row d-flex align-items-center justify-content-end">
                            <h5 class="m-0 p-0 px-2">
                                <i class="fa fa-check" onclick="check_todo(${data[i].id})" data-toggle="tooltip"
                                   data-placement="bottom" title="Edit todo"></i>
                            </h5>
                            <h5 class="m-0 p-0 px-2">
                                <i class="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip"
                                   data-placement="bottom" title="Edit todo"></i>
                            </h5>
                            <h5 class="m-0 p-0 px-2">
                                <i onclick="delete_todo(${data[i].id})" class="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip"
                                   data-placement="bottom" title="Delete todo"></i>
                            </h5>
                        </div>
                        <div class="row todo-created-info">
                            <div class="col-auto d-flex align-items-center pr-2">
                                <i class="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip"
                                   data-placement="bottom" title="" data-original-title="Created date"></i>
                                <label class="date-label my-2 text-black-50">28th Jun 2020</label>
                            </div>
                        </div>
                    </div>
                </div>
                        `
                }

                document.getElementById('all_todos').innerHTML = html
            })
        })


}



function editTodo(todo_name, date, todoid){
    console.log(todo_name, date)
    document.getElementById('todo_description').value = todo_name
    document.getElementById('todotime').value = date

    document.getElementById('buttonid').innerHTML = `<button type="button" class="btn btn-primary" onclick="send_data('update', ${todoid})" id='add_button'>Update</button>`



}