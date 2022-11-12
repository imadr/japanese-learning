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

let categories_to_learn = [
{
    id: "hiragana",
    name: "Hiragana",
    content:
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
},
{
    id: "dakuten-hiragana",
    name: "Dakuten hiragana",
    content:
    [["が", ["ga"]], ["ぎ", ["gi"]], ["ぐ", ["gu"]], ["げ", ["ge"]], ["ご", ["go"]],
    ["ざ", ["za"]], ["じ", ["ji"]], ["ず", ["zu"]], ["ぜ", ["ze"]], ["ぞ", ["zo"]],
    ["だ", ["da"]], ["ぢ", ["di"]], ["づ", ["du"]], ["で", ["de"]], ["ど", ["do"]],
    ["ぱ", ["pa"]], ["ぴ", ["pi"]], ["ぷ", ["pu"]], ["ぺ", ["pe"]], ["ぽ", ["po"]],
    ["ば", ["ba"]], ["び", ["bi"]], ["ぶ", ["bu"]], ["べ", ["be"]], ["ぼ", ["bo"]]],
},
{
    id: "combo-hiragana",
    name: "Combination hiragana",
    content:
    [["きゃ", ["kya"]], ["きゅ", ["kyu"]], ["きょ", ["kyo"]], ["ぎゃ", ["gya"]], ["ぎゅ", ["gyu"]],
    ["ぎょ", ["gyo"]], ["しゃ", ["sha"]], ["しゅ", ["shu"]], ["しょ", ["sho"]], ["じゃ", ["jya"]],
    ["じゅ", ["jyu"]], ["じょ", ["jyo"]], ["ちゃ", ["cha"]], ["ちゅ", ["chu"]], ["ちょ", ["cho"]],
    ["ぢゃ", ["dya"]], ["ぢゅ", ["dyu"]], ["ぢょ", ["dyo"]], ["にゃ", ["nya"]], ["にゅ", ["nyu"]],
    ["にょ", ["nyo"]], ["ひゃ", ["hya"]], ["ひゅ", ["hyu"]], ["ひょ", ["hyo"]], ["びゃ", ["bya"]],
    ["びゅ", ["byu"]], ["びょ", ["byo"]], ["ぴゃ", ["pya"]], ["ぴゅ", ["pyu"]], ["ぴょ", ["pyo"]],
    ["みゃ", ["mya"]], ["みゅ", ["myu"]], ["みょ", ["myo"]], ["りゃ", ["rya"]], ["りゅ", ["ryu"]],
    ["りょ", ["ryo"]]],
},
{
    id: "katakana",
    name: "Katakana",
    content:
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
},
{
    id: "dakuten-katakana",
    name: "Dakuten katakana",
    content:
    [["ガ", ["ga"]], ["ギ", ["gi"]], ["グ", ["gu"]], ["ゲ", ["ge"]], ["ゴ", ["go"]],
    ["ザ", ["za"]], ["ジ", ["ji"]], ["ズ", ["zu"]], ["ゼ", ["ze"]], ["ゾ", ["zo"]],
    ["ダ", ["da"]], ["ヂ", ["di"]], ["ヅ", ["du"]], ["デ", ["de"]], ["ド", ["do"]],
    ["パ", ["pa"]], ["ピ", ["pi"]], ["プ", ["pu"]], ["ペ", ["pe"]], ["ポ", ["po"]],
    ["バ", ["ba"]], ["ビ", ["bi"]], ["ブ", ["bu"]], ["ベ", ["be"]], ["ボ", ["bo"]]],
},
{
    id: "combo-katakana",
    name: "Combination katakana",
    content:
    [["キャ", ["kya"]], ["キュ", ["kyu"]], ["キョ", ["kyo"]], ["ギャ", ["gya"]], ["ギュ", ["gyu"]],
    ["ギョ", ["gyo"]], ["シャ", ["sha"]], ["シュ", ["shu"]], ["ショ", ["sho"]], ["ジャ", ["jya", "ja"]],
    ["ジュ", ["jyu", "ju"]], ["ジョ", ["jyo", "jo"]], ["チャ", ["cha"]], ["チュ", ["chu"]], ["チョ", ["cho"]],
    ["ヂャ", ["dya"]], ["ヂュ", ["dyu"]], ["ヂョ", ["dyo"]], ["ニャ", ["nya"]], ["ニュ", ["nyu"]],
    ["ニョ", ["nyo"]], ["ヒャ", ["hya"]], ["ヒュ", ["hyu"]], ["ヒョ", ["hyo"]], ["ビャ", ["bya"]],
    ["ビュ", ["byu"]], ["ビョ", ["byo"]], ["ピャ", ["pya"]], ["ピュ", ["pyu"]], ["ピョ", ["pyo"]],
    ["ミャ", ["mya"]], ["ミュ", ["myu"]], ["ミョ", ["myo"]], ["リャ", ["rya"]], ["リュ", ["ryu"]], ["リョ", ["ryo"]]]
},
];

for(let [index, category] of categories_to_learn.entries()){
    let checkbox = document.createElement("input");
    checkbox.onclick = function(){
        change_check(index);
    };
    checkbox.id = category.id;
    checkbox.type = "checkbox";
    checkbox.checked = options.checks[index];
    let label = document.createElement("label");
    label.for = category.id;
    label.innerHTML = category.name;
    document.getElementById("checkboxes").appendChild(checkbox);
    document.getElementById("checkboxes").appendChild(label);
    document.getElementById("checkboxes").appendChild(document.createElement("br"));
    category.checkbox = checkbox;
}

function generate_charts(){
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
            for(let i = 0; i < categories_to_learn[j].content.length; i++){
                let char_cell = document.createElement("div");
                let char_cell_small = document.createElement("div");
                char_cell.className = "chart-cell";
                char_cell_small.className = "chart-cell-small";
                char_cell.innerHTML = categories_to_learn[j].content[i][0];
                char_cell_small.innerHTML = categories_to_learn[j].content[i][1][0].toUpperCase();
                char_cell.appendChild(char_cell_small);
                table_div.appendChild(char_cell);
                if( (j%3 == 2 && (i+1)%6 == 0) || (j%3 != 2 && (i+1)%10 == 0) ){
                    table_div.appendChild(document.createElement("br"));
                }
            }
            table_div.appendChild(document.createElement("br"));
        }
    }
}

let previous_element = [-1, -1];
let wrong_guesses = {};

function next_char(){
    let potential_elements = [];
    let cumulative = 0;
    for(let [index_category, category] of categories_to_learn.entries()){
        for(let [index_element, element] of category.content.entries()){
            let current_element = [index_category, index_element];
            let guess_id = current_element.join("");
            let probability = 1;
            if(guess_id in wrong_guesses){
                probability += wrong_guesses[guess_id];
            }
            if(
                (!options.checks[index_category]) ||
                (previous_element.join("") == guess_id)
            ){
                probability = 0;
            }
            cumulative += probability;
            potential_elements.push([current_element, cumulative, probability]);
        }
    }

    potential_elements.sort(function(a, b){
        return a[1]-b[1];
    });
    let rand = Math.random();
    let picked_element = -1;
    for(let i = 0; i < potential_elements.length; i++){
        let str = JSON.stringify(potential_elements[i][0])+" "+(potential_elements[i][1]/cumulative);
        if(picked_element == -1 && (potential_elements[i][1]/cumulative) >= rand){
            picked_element = i;
            break;
        }
    }
    picked_element = potential_elements[picked_element][0];
    previous_element = picked_element;
    char_div.innerHTML = categories_to_learn[picked_element[0]].content[picked_element[1]][0];
}

let score = 0;
romaji_input.value = "";
romaji_input.focus();
romaji_input.addEventListener("keydown", function(e){
    if(e.keyCode == 13 && romaji_input.value.length > 0){
        let correct = categories_to_learn[previous_element[0]].content[previous_element[1]];
        let guess_id = previous_element.join("");
        if(correct[1].indexOf(romaji_input.value.toLowerCase()) > -1){
            romaji_input.value = "";
            romaji_input.style.boxShadow = "none";
            score++;
            if(guess_id in wrong_guesses){
                wrong_guesses[guess_id]--;
                if(wrong_guesses[guess_id] == 0){
                    delete wrong_guesses[guess_id];
                }
            }
            correction_div.innerHTML = "";
        }
        else{
            romaji_input.value = "";
            romaji_input.style.boxShadow = "0px 0px 12px #f009";
            score--;
            if(guess_id in wrong_guesses){
                wrong_guesses[guess_id]++;
            }
            else{
                wrong_guesses[guess_id] = 1;
            }
            correction_div.innerHTML = correct[0]+" is "+(correct[1]+"").toUpperCase();
        }
        next_char();
        score_div.innerHTML = "Score: "+score;
    }
});

document.addEventListener("keydown", function(e){
    if(e.keyCode == 13) romaji_input.focus();
});

function change_check(index){
    let at_least_one_check = false;
    for(let [index, thing] of categories_to_learn.entries()){
        if(thing.checkbox.checked){
            at_least_one_check = true;
            break;
        }
    }
    if(at_least_one_check){
        options.checks[index] = categories_to_learn[index].checkbox.checked;
        localStorage.setItem("options", JSON.stringify(options));
    }
    else{
        e.checked = true;
    }
}

score_div.innerHTML = "Score: "+score;
next_char();

generate_charts();

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