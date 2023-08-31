initialize();
function initialize() {
    const button = document.getElementById('searchBtn');
    const input = document.getElementById('searchText');
    input.addEventListener('keypress', () => {
        if (event.key === 'Enter') filterRows();
    });
    button.onclick = filterRows;
    const searchTimeBtn = document.getElementById('searchTimeBtn');
    const searchDate_start = document.getElementById('searchDate_start');
    const searchTime_start = document.getElementById('searchTime_start');
    const searchDate_end = document.getElementById('searchDate_end');
    const searchTime_end = document.getElementById('searchTime_end');
    searchDate_start.addEventListener('keypress', () => {
        if (event.key === 'Enter') filterRowsDate();
    });
    searchDate_end.addEventListener('keypress', () => {
        if (event.key === 'Enter') filterRowsDate();
    });
    searchTimeBtn.onclick = filterRowsDate;
}

// 文字列検索
function filterRows() {
    const keyword = document.getElementById('searchText').value;
    const regex = new RegExp(keyword, 'i');
    const resultTable = document.getElementById("resultTable");
    for (let i = 0; i < resultTable.rows.length; i++) {
        const row = resultTable.rows[i];
        row.style.display = 'none';
        for (let j = 0; j < row.cells.length; j++) {
            if (row.cells[j].textContent.match(regex)) {
                row.style.display = 'table-row';
                break;
            }
        }
    }
}
// 日付検索
function filterRowsDate() {
    const searchDate_start = document.getElementById('searchDate_start').value;
    const searchTime_start = document.getElementById('searchTime_start').value;
    const searchDate_end = document.getElementById('searchDate_end').value;
    const searchTime_end = document.getElementById('searchTime_end').value;

    console.log(searchDate_start+" "+searchTime_start+","+searchDate_end+" "+searchTime_end)

    const regex = new RegExp(keyword, 'i');
    const resultTable = document.getElementById("resultTable");
    for (let i = 0; i < resultTable.rows.length; i++) {
        const row = resultTable.rows[i];
        row.style.display = 'none';
        for (let j = 0; j < row.cells.length; j++) {
            if (row.cells[j].textContent.match(regex)) {
                row.style.display = 'table-row';
                break;
            }
        }
    }
}

// テーブルソート
window.addEventListener('load', function () {
    let column_no = 0; //今回クリックされた列番号
    let column_no_prev = 0; //前回クリックされた列番号
    document.querySelectorAll('#dataTable th').forEach(elm => {
        elm.onclick = function () {
            column_no = this.cellIndex; //クリックされた列番号
            let table = this.parentNode.parentNode.parentNode;
            let sortType = 0; //0:数値 1:文字
            let sortArray = new Array; //クリックした列のデータを全て格納する配列
            for (let r = 1; r < table.rows.length; r++) {
                //行番号と値を配列に格納
                let column = new Object;
                column.row = table.rows[r];
                column.value = table.rows[r].cells[column_no].textContent;
                sortArray.push(column);
                //数値判定
                if (isNaN(Number(column.value))) {
                    sortType = 1; //値が数値変換できなかった場合は文字列ソート
                }
            }
            // TODO: 日付でソートが未実装
            if (sortType == 0) { //数値ソート
                if (column_no_prev == column_no) { //同じ列が2回クリックされた場合は降順ソート
                    sortArray.sort(compareNumberDesc);
                } else {
                    sortArray.sort(compareNumber);
                }
            } else { //文字列ソート
                if (column_no_prev == column_no) { //同じ列が2回クリックされた場合は降順ソート
                    sortArray.sort(compareStringDesc);
                } else {
                    sortArray.sort(compareString);
                }
            }
            const resultTable = document.getElementById("resultTable");
            let tbody = this.parentNode.parentNode;
            for (let i = 0; i < sortArray.length; i++) {
                resultTable.appendChild(sortArray[i].row);
            }
            //昇順／降順ソート切り替えのために列番号を保存
            if (column_no_prev == column_no) {
                column_no_prev = -1; //降順ソート
            } else {
                column_no_prev = column_no;
            }
        };
    });
});
