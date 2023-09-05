// 3文字の月を数字に変換
function changeMonth(month_str) {
    var month_num = 0
    switch (month_str) {
        case 'Jun':
            month_num = 0;
            break;
        case 'Feb':
            month_num = 1;
            break;
        case 'Mar':
            month_num = 2;
            break;
        case 'Apr':
            month_num = 3;
            break;
        case 'May':
            month_num = 4;
            break;
        case 'Jun':
            month_num = 5;
            break;
        case 'Jul':
            month_num = 6;
            break;
        case 'Aug':
            month_num = 7;
            break;
        case 'Sep':
            month_num = 8;
            break;
        case 'Oct':
            month_num = 9;
            break;
        case 'Nov':
            month_num = 10;
            break;
        case 'Dec':
            month_num = 11;
            break;
    }
    return month_num
}

function formatDate(date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
};

function getType(msg) {
    var start = 0;
    var end = msg.indexOf("[", start)
    var result = msg.slice(start, end)
    return result
};

function getResponse(msg) {
    var start = msg.indexOf("[", 0);
    var end = msg.indexOf("]", start) + 1
    var result = msg.slice(start, end)
    return result
};

// 未完
function getFromAddress(msg) {
    var start = msg.indexOf(" from ") + 6
    var end = msg.indexOf(",", start)
    var result = msg.slice(start, end)
    return result
};

function getToUrl(msg) {
    var start = msg.indexOf(" url ") + 5
    var end = msg.indexOf(" ", start)
    var result = msg.slice(start, end)
    if (msg.indexOf(" url ") == -1) { result = "" }
    return result
};
function getToDomain(msg) {
    var start = msg.indexOf("]:") + 2
    var end = msg.indexOf(" ", start)
    var result = msg.slice(start, end)
    if (msg.indexOf("]:") == -1) { result = "" }
    return result
};
function getToAddress(msg) {
    var start = msg.indexOf(" to ") + 4
    var end = msg.indexOf(" ", start)
    var result = msg.slice(start, end);
    return result
};

const output = () => {
    const table = document.getElementById('dataTable')
    const escaped = /,|\r?\n|\r|"/;
    const e = /"/g;
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
    const csv = []
    const row = []

    for (let r = 0; r < table.rows.length; r++) {
      row.length = 0
      for (let c = 0; c < table.rows[r].cells.length; c++) {
        const field = table.rows[r].cells[c].textContent
        row.push(escaped.test(field) ? '"' + field.replace(e, '""') + '"' : field)
      }
      csv.push(row.join(','))
    }
    const blob = new Blob([bom, csv.join('\n')], {
      'type': 'text/csv'
    })
    const a = document.getElementById('output_btn')
    a.download = 'output.csv'
    a.href = window.URL.createObjectURL(blob)

  }

function createArray(output_text) {
    let result = [];
    for (const line of output_text) {
        result.push(line.split(/,/))
    }
    return result;
}

function createTable(result) {
    const resultTable = document.getElementById("resultTable");
    result.forEach((line) => {
        const tr = document.createElement("tr");
        resultTable.appendChild(tr);
        const objArray = Object.entries(line);
        objArray.forEach((arr) => {
            const td = document.createElement("td");
            td.textContent = arr[1];
            tr.appendChild(td);
        });
    });
}

const clearTable = () => {
    const resultTable = document.getElementById("resultTable");
    resultTable.remove()
}