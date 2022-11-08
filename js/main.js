let theme_svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`];
let menu_svg = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`];

let romaji_input = document.getElementById("romaji");
let char_div = document.getElementById("char");
let score_div = document.getElementById("score");
let game_div = document.getElementById("game");
let options_panel_div = document.getElementById("options-panel");
let options_panel_button_div = document.getElementById("options-panel-button");
let correction_div = document.getElementById("correction");
let chart_close_div = document.getElementById("chart-close-button");
let hiragana_chart_div = document.getElementById("hiragana-chart");
let katakana_chart_div = document.getElementById("katakana-chart");
let options_checkbox = [
    document.getElementById("hiragana"),
    document.getElementById("dakuten-hiragana"),
    document.getElementById("combo-hiragana"),
    document.getElementById("katakana"),
    document.getElementById("dakuten-katakana"),
    document.getElementById("combo-katakana"),
];
let options_storage = localStorage.getItem("options");
let options;
try{
    options = JSON.parse(localStorage.getItem("options"));
} catch(e){}

if(options == null){
    options = {
        checks: [true, false, false, false, false, false]
    };
}

for(let i = 0; i < options_checkbox.length; i++){
    if(i < options.checks.length && options.checks[i]){
        options_checkbox[i].checked = true;
    }
    else{
        options_checkbox[i].checked = false;
    }
}
let stuff = [
[["あ", ["a"]], ["い", ["i"]], ["う", ["u"]], ["え", ["e"]], ["お", ["o"]],
["か", ["ka"]], ["き", ["ki"]], ["く", ["ku"]], ["け", ["ke"]], ["こ", ["ko"]],
["さ", ["sa"]], ["し", ["shi", "si"]], ["す", ["su"]], ["せ", ["se"]], ["そ", ["so"]],
["た", ["ta"]], ["ち", ["chi"]], ["つ", ["tsu"]], ["て", ["te"]], ["と", ["to"]],
["な", ["na"]], ["に", ["ni"]], ["ぬ", ["nu"]], ["ね", ["ne"]], ["の", ["no"]],
["は", ["ha"]], ["ひ", ["hi"]], ["ふ", ["hu", "fu"]], ["へ", ["he"]], ["ほ", ["ho"]],
["ま", ["ma"]], ["み", ["mi"]], ["む", ["mu"]], ["め", ["me"]], ["も", ["mo"]],
["ら", ["ra"]], ["り", ["ri"]], ["る", ["ru"]], ["れ", ["re"]], ["ろ", ["ro"]],
["や", ["ya"]], ["ゆ", ["yu"]], ["よ", ["yo"]],
["わ", ["wa"]], ["を", ["wo"]], ["ん", ["n"]]],

[["が", ["ga"]], ["ぎ", ["gi"]], ["ぐ", ["gu"]], ["げ", ["ge"]], ["ご", ["go"]],
["ざ", ["za"]], ["じ", ["ji"]], ["ず", ["zu"]], ["ぜ", ["ze"]], ["ぞ", ["zo"]],
["だ", ["da"]], ["ぢ", ["di"]], ["づ", ["du"]], ["で", ["de"]], ["ど", ["do"]],
["ぱ", ["pa"]], ["ぴ", ["pi"]], ["ぷ", ["pu"]], ["ぺ", ["pe"]], ["ぽ", ["po"]],
["ば", ["ba"]], ["び", ["bi"]], ["ぶ", ["bu"]], ["べ", ["be"]], ["ぼ", ["bo"]]],

[["きゃ", ["kya"]], ["きゅ", ["kyu"]], ["きょ", ["kyo"]], ["ぎゃ", ["gya"]], ["ぎゅ", ["gyu"]],
["ぎょ", ["gyo"]], ["しゃ", ["sha"]], ["しゅ", ["shu"]], ["しょ", ["sho"]], ["じゃ", ["jya"]],
["じゅ", ["jyu"]], ["じょ", ["jyo"]], ["ちゃ", ["cha"]], ["ちゅ", ["chu"]], ["ちょ", ["cho"]],
["ぢゃ", ["dya"]], ["ぢゅ", ["dyu"]], ["ぢょ", ["dyo"]], ["にゃ", ["nya"]], ["にゅ", ["nyu"]],
["にょ", ["nyo"]], ["ひゃ", ["hya"]], ["ひゅ", ["hyu"]], ["ひょ", ["hyo"]], ["びゃ", ["bya"]],
["びゅ", ["byu"]], ["びょ", ["byo"]], ["ぴゃ", ["pya"]], ["ぴゅ", ["pyu"]], ["ぴょ", ["pyo"]],
["みゃ", ["mya"]], ["みゅ", ["myu"]], ["みょ", ["myo"]], ["りゃ", ["rya"]], ["りゅ", ["ryu"]],
["りょ", ["ryo"]]],

[["ア", ["a"]], ["イ", ["i"]], ["ウ", ["u"]], ["エ", ["e"]], ["オ", ["o"]],
["カ", ["ka"]], ["キ", ["ki"]], ["ク", ["ku"]], ["ケ", ["ke"]], ["コ", ["ko"]],
["サ", ["sa"]], ["シ", ["si", "shi"]], ["ス", ["su"]], ["セ", ["se"]], ["ソ", ["so"]],
["タ", ["ta"]], ["チ", ["chi"]], ["ツ", ["tsu"]], ["テ", ["te"]], ["ト", ["to"]],
["ナ", ["na"]], ["ニ", ["ni"]], ["ヌ", ["nu"]], ["ネ", ["ne"]], ["ノ", ["no"]],
["ハ", ["ha"]], ["ヒ", ["hi"]], ["フ", ["hu", "fu"]], ["ヘ", ["he"]], ["ホ", ["ho"]],
["マ", ["ma"]], ["ミ", ["mi"]], ["ム", ["mu"]], ["メ", ["me"]], ["モ", ["mo"]],
["ラ", ["ra"]], ["リ", ["ri"]], ["ル", ["ru"]], ["レ", ["re"]], ["ロ", ["ro"]],
["ヤ", ["ya"]], ["ユ", ["yu"]], ["ヨ", ["yo"]],
["ワ", ["wa"]], ["ヲ", ["wo"]], ["ン", ["n"]]],

[["ガ", ["ga"]], ["ギ", ["gi"]], ["グ", ["gu"]], ["ゲ", ["ge"]], ["ゴ", ["go"]],
["ザ", ["za"]], ["ジ", ["ji"]], ["ズ", ["zu"]], ["ゼ", ["ze"]], ["ゾ", ["zo"]],
["ダ", ["da"]], ["ヂ", ["di"]], ["ヅ", ["du"]], ["デ", ["de"]], ["ド", ["do"]],
["パ", ["pa"]], ["ピ", ["pi"]], ["プ", ["pu"]], ["ペ", ["pe"]], ["ポ", ["po"]],
["バ", ["ba"]], ["ビ", ["bi"]], ["ブ", ["bu"]], ["ベ", ["be"]], ["ボ", ["bo"]]],

[["キャ", ["kya"]], ["キュ", ["kyu"]], ["キョ", ["kyo"]], ["ギャ", ["gya"]], ["ギュ", ["gyu"]],
["ギョ", ["gyo"]], ["シャ", ["sha"]], ["シュ", ["shu"]], ["ショ", ["sho"]], ["ジャ", ["jya", "ja"]],
["ジュ", ["jyu", "ju"]], ["ジョ", ["jyo", "jo"]], ["チャ", ["cha"]], ["チュ", ["chu"]], ["チョ", ["cho"]],
["ヂャ", ["dya"]], ["ヂュ", ["dyu"]], ["ヂョ", ["dyo"]], ["ニャ", ["nya"]], ["ニュ", ["nyu"]],
["ニョ", ["nyo"]], ["ヒャ", ["hya"]], ["ヒュ", ["hyu"]], ["ヒョ", ["hyo"]], ["ビャ", ["bya"]],
["ビュ", ["byu"]], ["ビョ", ["byo"]], ["ピャ", ["pya"]], ["ピュ", ["pyu"]], ["ピョ", ["pyo"]],
["ミャ", ["mya"]], ["ミュ", ["myu"]], ["ミョ", ["myo"]], ["リャ", ["rya"]], ["リュ", ["ryu"]], ["リョ", ["ryo"]]]
];

let titles = [
    ["Hiragana", "Dakuten Hiragana", "Combination Hiragana"],
    ["Katakana", "Dakuten Katakana", "Combination Katakana"]
];
for(let k = 0; k < 2; k++){
    let table_div = document.getElementById("hiragana-table");
    if(k == 1) table_div = document.getElementById("katakana-table")
    for(let j = k*3; j < k*3+3; j++){
        let title = document.createElement("div");
        title.className = "chart-title";
        title.innerHTML = titles[k][j%3];
        table_div.appendChild(title);
        for(let i = 0; i < stuff[j].length; i++){
            let char_cell = document.createElement("div");
            let char_cell_small = document.createElement("div");
            char_cell.className = "chart-cell";
            char_cell_small.className = "chart-cell-small";
            char_cell.innerHTML = stuff[j][i][0];
            char_cell_small.innerHTML = stuff[j][i][1][0].toUpperCase();
            char_cell.appendChild(char_cell_small);
            table_div.appendChild(char_cell);
            if( (j%3 == 2 && (i+1)%6 == 0) || (j%3 != 2 && (i+1)%10 == 0) ){
                table_div.appendChild(document.createElement("br"));
            }
        }
        table_div.appendChild(document.createElement("br"));
    }
}

let current_char;
let current_array;
let previous_char;
let previous_array;
let wrong_chars = [];

function next_char(){
    let wrongs_chars_checked = [];
    for(let i = 0; i < wrong_chars.length; i++){
        if(wrong_chars[i][2]){
            wrongs_chars_checked.push([wrong_chars[i], i]);
        }
    }
    let done_wrong = false;
    if(wrongs_chars_checked.length > 0 && Math.floor(Math.random()*3) == 1){
        let picked_wrong = wrongs_chars_checked[Math.floor(Math.random()*wrongs_chars_checked.length)];
        current_array = picked_wrong[0][0];
        current_char = picked_wrong[0][1];
        if(current_char != previous_char || current_array != previous_array){
            wrong_chars.splice(picked_wrong[1], 1);
            done_wrong = true;
        }
    }

    if(!done_wrong){
        let array;
        let array_indices = [];
        for(let i = 0; i < options.checks.length; i++){
            if(options.checks[i]) array_indices.push(i);
        }
        current_array = array_indices[Math.floor(Math.random()*array_indices.length)];
        if(current_array === undefined) return;
        do{
            current_char = Math.floor(Math.random()*stuff[current_array].length);
        } while(current_char == previous_char && current_array == previous_array);
    }

    previous_char = current_char;
    previous_array = current_array;
    char_div.innerHTML = stuff[current_array][current_char][0];
    for(let i = 0; i < wrong_chars.length; i++){
        wrong_chars[i][2] = true;
    }
}

let score_ = 0;
romaji_input.value = "";
romaji_input.focus();
romaji_input.onkeydown = function(e){
    if(e.keyCode == 13 && romaji_input.value.length > 0){
        let c = stuff[current_array][current_char];
        if(c[1].indexOf(romaji_input.value.toLowerCase()) > -1){
            romaji_input.value = "";
            romaji_input.style.boxShadow = "none";
            score_++;
            correction_div.innerHTML = "";
        }
        else{
            romaji_input.value = "";
            romaji_input.style.boxShadow = "0px 0px 12px #f009";
            score_--;
            wrong_chars.push([current_array, current_char, false])
            correction_div.innerHTML = c[0]+" is "+(c[1]+"").toUpperCase();
        }
        next_char();
        score_div.innerHTML = "Score: "+score_;
    }
};

document.onkeydown = function(e){
    if(e.keyCode == 13) romaji_input.focus();
}

function change_check(e){
    let at_least_one_check = false;
    for(let checkbox of options_checkbox){
        if(checkbox.checked){
            at_least_one_check = true;
            break;
        }
    }
    if(at_least_one_check){
        options.checks[options_checkbox.indexOf(e)] = e.checked;
        localStorage.setItem("options", JSON.stringify(options));
    }
    else{
        e.checked = true;
    }
}

score_div.innerHTML = "Score: "+score_;
next_char();

let current_state = 0;
let options_panel_closed = true;

function update_state(){
    score_div.style.display = current_state == 0 ? "initial" : "none";
    game_div.style.display = current_state == 0 ? "initial" : "none";
    chart_close_div.style.display = current_state != 0 ? "initial" : "none";
    hiragana_chart_div.style.display = current_state == 1 ? "initial" : "none";
    katakana_chart_div.style.display = current_state == 2 ? "initial" : "none";
}

update_state();

chart_close_div.onclick = function(){
    current_state = 0;
    update_state();
};

document.getElementById("katakana-chart-button").onclick = function(){
    current_state = 2;
    if(window.innerWidth < 900){
        options_panel_closed = true;
        update_options_panel();
    }
    update_state();
}

document.getElementById("hiragana-chart-button").onclick = function(){
    current_state = 1;
    if(window.innerWidth < 900){
        options_panel_closed = true;
        update_options_panel();
    }
    update_state();
};

let theme_button = document.getElementById("light");
let theme = localStorage.getItem("theme") == null ? "light" : localStorage.getItem("theme");
theme_button.innerHTML = (theme == "light" ? theme_svg[1] : theme_svg[0])+"Switch theme";
document.body.setAttribute("data-theme", theme);

theme_button.onclick = function(){
    theme = (theme == "light") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
    this.innerHTML = (theme == "light" ? theme_svg[1] : theme_svg[0])+"Switch theme";
}

document.getElementById("options-panel-button").onclick = function(){
    options_panel_closed = !options_panel_closed;
    update_options_panel();
    update_state();
};

function update_options_panel(){
    options_panel_div.style.display = options_panel_closed ? "none" : "block";
    options_panel_button_div.innerHTML = options_panel_closed ? menu_svg[0] : menu_svg[1];
    document.body.style.overflow = options_panel_closed ? "auto" : "hidden";
}

function check_resize(){
    if(window.innerWidth < 900){
        options_panel_div.style.display = "none";
        options_panel_button_div.style.display = "block";
        options_panel_closed = true;
        options_panel_button_div.innerHTML = menu_svg[0];
    }
    else{
        options_panel_div.style.display = "block";
        options_panel_button_div.style.display = "none";
    }
}

options_panel_button_div.innerHTML = menu_svg[0];
window.addEventListener("resize", check_resize);
check_resize();