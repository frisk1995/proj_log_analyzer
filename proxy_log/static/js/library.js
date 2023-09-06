// ファイル出力
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

// カンマ区切りを連想配列に変換
function createArray(output_text) {
    let result = [];
    for (const line of output_text) {
        result.push(line.split(/,/))
    }
    return result;
}
// テーブルヘッダ作成
function createTheader(result) {
    const resultHeader = document.getElementById("resultHeader");
    var headerArray = result.split(" ")
    const tr = document.createElement("tr");
    resultHeader.appendChild(tr);
    const tmp = document.createElement("th");
    tmp.textContent = "#"
    tr.appendChild(tmp);
    headerArray.forEach(element => {
        const th = document.createElement("th");
        th.textContent = element
        tr.appendChild(th);
    });
}

// データテーブル作成
function createTable(result) {
    const resultTable = document.getElementById("resultTable");
    result.forEach((line) => {
        const tr = document.createElement("tr");
        resultTable.appendChild(tr);
        const objArray = Object.entries(line);
        objArray.forEach((arr) => {
            const td = document.createElement("td");
            var log_msg = "";
            var log_msg_body = "";
            td.textContent = arr[1];

            if (arr[1].indexOf("\"") != -1) {
                log_msg = arr[1]
                for (const msg of log_msg) {
                    log_msg_body += msg.replace("\"", "").replace("\"", "") + "<br>"
                }
            }
            // 改行してるデータをtdに入れる
            tr.appendChild(td);
        });
    });
}

const clearTable = () => {
    const resultTable = document.getElementById("resultTable");
    resultTable.remove()
}

function checkbox_cell(obj, id) {
    var CELL = document.getElementById(id);
    var TABLE = CELL.parentNode.parentNode.parentNode;
    for (var i = 0; TABLE.rows[i]; i++) {
        TABLE.rows[i].cells[CELL.cellIndex].style.display = (obj.checked) ? '' : 'none';
    }
}

//数値ソート（昇順）
function compareNumber(a, b) {
    return a.value - b.value;
}
//数値ソート（降順）
function compareNumberDesc(a, b) {
    return b.value - a.value;
}
//文字列ソート（昇順）
function compareString(a, b) {
    if (a.value < b.value) {
        return -1;
    } else {
        return 1;
    }
    return 0;
}
//文字列ソート（降順）
function compareStringDesc(a, b) {
    if (a.value > b.value) {
        return -1;
    } else {
        return 1;
    }
    return 0;
}