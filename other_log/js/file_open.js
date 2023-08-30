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
        //        getFileCSV(output_text)
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
        var data_msg = ""
        const log_data = element.split(/,/)
        var level = log_data[0]
        var date = log_data[1]
        var source = log_data[2]
        var eventid = log_data[3]
        var task = log_data[4]
        var msg = log_data[5]
        if (element.indexOf("\"") != -1) {
            do {
                data_msg += messages[i + 1] + '\n'
                i++;
            } while (messages[i].indexOf("\"") == -1)
            msg = log_data[5] + "\"" + data_msg
            // 出力
        }
        output_line.push(line_counter + "," + level + "," + date + "," + source + "," + eventid + "," + task + "," + msg)
        line_counter++;
    }
    /*
        for (const str1 of messages) {
        }
        */
    return output_line;
}

