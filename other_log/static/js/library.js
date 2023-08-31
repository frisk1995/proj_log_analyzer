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
            if (arr[1].indexOf("\"") != -1) {
                log_msg = arr[1].split(/\r/)
                for (const msg of log_msg) {
                    log_msg_body += msg.replace("\"", "").replace("\"", "") + "<br>"
                    td.innerHTML = log_msg_body;
                }
            } else {
                td.textContent = arr[1];
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