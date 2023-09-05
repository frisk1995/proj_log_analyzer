/*
document.querySelector('input').addEventListener('change', (evt) => {
    console.log(evt.target.files[0]);
  });
*/
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

const selectFile = () => {
    // table initialize
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

    output_line.push("No,datetime,Type,response,fromAddress,fromPort,toAddress,toPort,toDomain,toUrl")

    // ログファイルを改行単位で分割
    const messages = strline.split(/\n/);
    var line_counter = 1;
    for (const str1 of messages) {
        const log_date = str1.split(/ +/)
        const log_msg = str1.split(/Proxy /);
        // get YYYY/MM/dd hh:mm:ss
        // rsyslogだと日付がずれるから修正する必要あり
        var year = ""
        var month = ""
        var day = ""
        var time = ""
        if (log_date[2].indexOf(":") != -1) {
            year = "2023"
            month = changeMonth(log_date[0])
            day = log_date[1]
            time = log_date[2]
        } else {
            year = log_date[2]
            month = changeMonth(log_date[0])
            day = log_date[1]
            time = log_date[3]
        }

        var type = getType(log_msg[1])
        var response = getResponse(log_msg[1])
        var fromAddress = getFromAddress(log_msg[1])
        var toUrl = getToUrl(log_msg[1])
        var toDomain = getToDomain(log_msg[1])
        var toAddress = getToAddress(log_msg[1])
        var fromPort = fromAddress.split(/:/)[1]
        var toPort = toAddress.split(/:/)[1]

        if (typeof fromPort === 'undefined') { fromPort = "" }
        if (typeof toPort === 'undefined') { toPort = "" }
        // methodごとに処理を分ける
        // 出力
        const d = new Date(year, month, day)
        output_line.push(line_counter + "," + d.toLocaleDateString({ year: "numeric", month: "2-digit" }) + " " + time + "," + type + "," + response + "," + fromAddress.split(/:/)[0] + "," + fromPort + "," + toAddress.split(/:/)[0] + "," + toPort + "," + toDomain + "," + toUrl);
        line_counter++;
    }
    return output_line;
}

