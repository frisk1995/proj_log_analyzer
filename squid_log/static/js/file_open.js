
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
        for (let j = 0; j < log_data.length; j++) {
            if (log_data[j].indexOf("\"") != -1) {
                do {
                    data_msg += log_data[j + 1] + ' '
                    console.log(data_msg)
                    j++;
                } while (log_data[j].indexOf("\"") == -1)
            }
            if (j != 0) {
                data_msg += "," + log_data[j];
            } else {
                data_msg += log_data[j];
            }
        }
        var log_date = log_data[3] + log_data[4]

        output_line.push(line_counter + "," + log_date + "," + data_msg)
        line_counter++;
    }
    /*
        for (const str1 of messages) {
        }
        */
    return output_line;
}

