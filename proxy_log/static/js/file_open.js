/*
document.querySelector('input').addEventListener('change', (evt) => {
    console.log(evt.target.files[0]);
  });
*/
// テーブル列を非表示にする
/*
window.onload = function () {
    var array = ["res", "type", "url"];
    for (var j = 0; j < array.length; j++) {
        var id = array[j] + "_display";
        var obj = array[j] + "_check";
        var CELL = document.getElementById(id);
        var TABLE = CELL.parentNode.parentNode.parentNode;
        for (var i = 0; TABLE.rows[i]; i++) {
            TABLE.rows[i].cells[CELL.cellIndex].style.display = (document.getElementById(obj).checked) ? '' : 'none';
        }
    }
}
function checkbox_cell(obj, id) {
    var CELL = document.getElementById(id);
    var TABLE = CELL.parentNode.parentNode.parentNode;
    for (var i = 0; TABLE.rows[i]; i++) {
        TABLE.rows[i].cells[CELL.cellIndex].style.display = (obj.checked) ? '' : 'none';
    }
}
*/

const selectFile = () => {
    // table initialize
    document.querySelector('table').innerHTML = "";
    document.querySelector('thead').innerHTML = "";
    document.querySelector('tbody').innerHTML = "";
    // FileListオブジェクト取得
    const selectFiles = document.querySelector("#select-file").files

    // Fileオブジェクト取得
    const file = selectFiles[0]

    // FileReaderオブジェクト取得
    const reader = new FileReader()
    reader.readAsText(file)

    // ファイル読み込み完了時の処理
    reader.onload = () => {
        let output_text = logAnalyzer(reader.result);
        let output_header = reader.result.slice(0, reader.result.indexOf('\n'))
        //        getFileCSV(output_text)
        createTheader(output_header)
        createTable(createArray(output_text.slice(1)))
        /*
                for (const line of output_text) {
                    //document.querySelector("#output").innerHTML = line
                    document.getElementById("output").value += line + "\n";
                }
        */
    }

    // ファイル読み込みエラー時の処理
    reader.onerror = () => {
        console.log("ファイル読み込みエラー")
    }
}

// ログ解析関数
function logAnalyzer(strline) {

    // ログ出力用配列
    let output_line = [];
    var d = new Date();

    const messages = strline.split(/\n/);
    messages.shift();

    var element = ""

    // 1行見てダブルクォーテーションがあれば次のダブルクォーテーションまで探す
    var line_counter = 0;
    for (let i = 0; i < messages.length; i++) {
        element = messages[i];
        const log_data = element.split(/ /)
        var data_msg = ""
        for (let j = 2; j < log_data.length; j++) {
            if (j != 2) {
                data_msg += "," + log_data[j];
            } else {
                data_msg += log_data[j];
            }
        }

        var log_date = log_data[0] + log_data[1]

        output_line.push(line_counter + "," + log_date + "," + data_msg)
        line_counter++;
    }
    /*
        for (const str1 of messages) {
        }
        */
    return output_line;
}

