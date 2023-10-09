window.onload = function () {
    // フォームの追加
    add_form_element();
};


/**
 * フォームの追加
 */
//入力欄（入力例）（出力例）の初期値を指定
//function add_form_element(input,output) {
function add_form_element() {
    // フォーム内の要素の数
    var formarea = document.querySelector('#form');
    var num = 0;
    if (formarea !== null) {
        num = formarea.childElementCount;
    }
    num++;

    // ラベルの作成
    var label = create_label(num);

    // 入力欄（入力例）の作成
    var example_input_form = create_input_from(num);
    // 入力欄（出力例1）の作成
    var example_output_form1 = create_output_from(num, 1);
    // 入力欄（出力例2）の作成
    var example_output_form2 = create_output_from(num, 2);
    // 入力欄（出力例3）の作成
    var example_output_form3 = create_output_from(num, 3);


    // 削除ボタンの作成
    var del_btn = create_delete_btn(num);
    //改行用
    var br = document.createElement('br');
    // ラベル・入力欄・削除ボタンをdiv要素に追加
    var form_area = document.createElement('div');

    form_area.setAttribute('id', 'form_area_' + num);
    form_area.setAttribute('style', "flex-direction:column;display: flex; width:80%; margin-left: auto; margin-right: auto;");
    form_area.appendChild(label);//No1とかNo2とか
    form_area.appendChild(example_input_form);//入力例
    form_area.appendChild(example_output_form1);//出力例
    form_area.appendChild(example_output_form2);//出力例
    form_area.appendChild(example_output_form3);//出力例
    form_area.appendChild(del_btn);

    // フォームに要素を追加
    var form = document.getElementById('form');
    form.appendChild(form_area);

    // 削除ボタンの有効無効
    set_delete_btn_disabled();

    // 追加ボタンの有効無効
    set_add_btn_disabled();
};

/**
 * フォームの削除
 */
function delete_form_element(name) {
    // 対象フォームの削除
    var elem = document.getElementById(name);
    elem.remove();

    // 残っているフォームのラベル・IDの番号の振りなおしと削除ボタンの作り直し
    var forms = document.querySelector('#form').children;

    for (let i = 0; i < forms.length; i++) {
        // フォームのIDの番号の付け直し
        forms[i].id = 'form_area_' + (i + 1);
        // ラベルの番号の付け直し
        forms[i].children[0].innerText = "No" + (i + 1);
        // 入力欄（入力例）のIDの番号の付け直し
        forms[i].children[1].id = 'form_' + (i + 1);
        forms[i].children[1].name = 'form_' + (i + 1);
        // 入力欄（出力例）のIDの番号の付け直し
        forms[i].children[2].id = 'form_' + (i + 1);
        forms[i].children[2].name = 'form_' + (i + 1);
        // 削除ボタンは作り直し(現在改行含め4番目)
        forms[i].children[5].remove();
        var btn = create_delete_btn(i + 1);
        forms[i].appendChild(btn);
    }

    // 削除ボタンの有効無効
    set_delete_btn_disabled();

    // 追加ボタンの有効無効
    set_add_btn_disabled();
};

/**
 * ラベル
 */
function create_label(num) {
    var label = document.createElement('label');
    var label_txt = document.createTextNode('No' + num);
    label.appendChild(label_txt);
    return label;
}

/*
 入力欄（入力例）
*/
function create_input_from(num) {
    var example_input_form = document.createElement('textarea');
    example_input_form.setAttribute('type', 'text');
    example_input_form.setAttribute('id', 'form_' + num);
    example_input_form.setAttribute('name', 'form_' + num);
    example_input_form.setAttribute('rows', "3");
    example_input_form.setAttribute('placeholder', "入力例");


    return example_input_form;
}
/**
 * 入力欄（出力例）
 */
function create_output_from(num, exam_num) {
    var example_output_form = document.createElement('textarea');
    example_output_form.setAttribute('type', 'text');
    example_output_form.setAttribute('id', 'form_' + num + "_" + exam_num);
    example_output_form.setAttribute('name', 'form_' + num);
    example_output_form.setAttribute('rows', "2");
    example_output_form.setAttribute('placeholder', "解答例:" + exam_num);

    return example_output_form;
}

/**
 * 削除ボタン
 */
function create_delete_btn(num) {
    var btn = document.createElement('button');
    var btn_txt = document.createTextNode('削除');
    btn.appendChild(btn_txt);
    btn.setAttribute('class', 'del_btn');
    // これを入れないとサブミットされる
    btn.setAttribute('type', 'button');
    btn.setAttribute('onclick', 'delete_form_element("form_area_' + num + '");');
    return btn;
}

/**
 * 削除ボタンの有効無効の設定
 */
function set_delete_btn_disabled() {
    var form = document.getElementById('form');
    var buttons = form.getElementsByTagName('button');
    if (buttons.length == 1) {
        buttons[0].disabled = true;
    }
    else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
    }
}

/**
 * 追加ボタンの有効無効の設定
 */
function set_add_btn_disabled() {
    var form = document.getElementById('form');
    var buttons = form.getElementsByTagName('button');
    //フォームの最大数を設定。
    var form_max = 50
    if (buttons.length < form_max) {
        document.getElementsByClassName('add-btn')[0].disabled = false;
    }
    else {
        document.getElementsByClassName('add-btn')[0].disabled = true;
    }
}




/**
 * cookie（クッキー）の保存
*/
function save_cookie() {
    //クッキーのクリア
    deleteAllCookies();
    // 残っているフォームのラベル・IDの番号の取得
    var forms = document.querySelector('#form').children;
    //フォーム数の取得
    document.cookie = `length=${forms.length}`;
    for (let i = 0; i < forms.length; i++) {
        //idの保存
        //document.cookie = `id${i}=${forms[i]}`;
        //入力欄（入力例）の保存
        document.cookie = `input_${i}=${forms[i].children[1].value.replace(/\n/g, "")};`;
        //入力欄（出力例1）の保存
        document.cookie = `output1_${i}=${forms[i].children[2].value.replace(/\n/g, "")};`;
        //入力欄（出力例2）の保存
        document.cookie = `output2_${i}=${forms[i].children[3].value.replace(/\n/g, "")};`;
        //入力欄（出力例3）の保存
        document.cookie = `output3_${i}=${forms[i].children[4].value.replace(/\n/g, "")};`;
    }
}





/**
 * cookie（クッキー）の呼び出し、保存していた入力例を記入
*/
function load_cookie() {
    //まず追加
    add_form_element();
    //次に今のフォームを全削除
    var forms = document.querySelector("#form").children;
    var now_form_length = forms.length
    for (let i = 0; i < now_form_length; i++) {
        delete_form_element(`form_area_1`);
    }


    //cookieからフォームを作成ーーーーーーーー
    cookies = document.cookie.split(';');
    //クッキーにあるフォームの長さ取得
    var length = getCookieValue('length', cookies);


    //クッキーからフォームに出力
    for (let i = 0; i < length; i++) {
        add_form_element();
        var input = getCookieValue(`input_${i}`, cookies);
        var output1 = getCookieValue(`output1_${i}`, cookies);
        var output2 = getCookieValue(`output2_${i}`, cookies);
        var output3 = getCookieValue(`output3_${i}`, cookies);
        var forms = document.querySelector("#form").children;
        forms[i].children[1].value = input
        forms[i].children[2].value = output1
        forms[i].children[3].value = output2
        forms[i].children[4].value = output3

    }
}

//クッキーからキーで検索するための関数
function getCookieValue(key, cookies) {
    for (let cookie of cookies) {
        var cookiesArray = cookie.split('=');
        if (cookiesArray[0].trim() == key.trim()) {
            return cookiesArray[1];  // (key[0],value[1])
        }
    }
    return '';
}


//クッキーを出力（GPTへの入力用）
function get_All_Cookie() {
    //cookieからフォームを作成ーーーーーーーー
    cookies = document.cookie.split(';');
    //クッキーにあるフォームの長さ取得
    var length = getCookieValue('length', cookies);

    const iolist = []
    //クッキーからフォームに出力
    for (let i = 0; i < length; i++) {

        var input = getCookieValue(`input_${i}`, cookies);
        var output1 = getCookieValue(`output1_${i}`, cookies);
        var output2 = getCookieValue(`output2_${i}`, cookies);
        var output3 = getCookieValue(`output3_${i}`, cookies);
        //var forms = document.querySelector("#form").children;
        //forms[i].children[1].value = input
        //forms[i].children[2].value = output
        iolist.push([input, output1, output2, output3]);
    }
    return iolist

}

/**
 * cookie（クッキー）の全削除
*/
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
}
/*
現在のフォーム内容
    id:フォームID番号
    0:ラベル番号
    1:入力欄（入力例）
    2:入力欄（出力例）
    3:削除ボタン

    forms[i].id
    forms[i].children[1].id
    forms[i].children[1].name
*/



//コピー機能
function copyToClipboard(index) {
    // コピー対象をJavaScript上で変数として定義する
    var copyTarget = document.getElementById("answer" + index);

    // コピー対象のテキストを選択する
    copyTarget.select();

    // 選択しているテキストをクリップボードにコピーする
    document.execCommand("Copy");

    // コピーをお知らせする
    alert("コピーしました！ : " + copyTarget.value);
}
