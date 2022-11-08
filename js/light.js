let css_file = document.createElement("link");
css_file.rel = "stylesheet";
css_file.type = "text/css";
css_file.href = location.pathname == "/" ? "css/style-theme.css" : "../css/style-theme.css";
document.head.appendChild(css_file);

let theme = localStorage.getItem("theme") == null ? "light" : localStorage.getItem("theme");
document.body.setAttribute("data-theme", theme);

let dark_icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
let light_icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`;

if(document.getElementById("navbar-right")){
    document.getElementById("navbar-right").innerHTML += `<button id="light"></button>`;
    let theme_button = document.getElementById("light");
    theme_button.innerHTML = theme == "light" ? dark_icon : light_icon;

    theme_button.onclick = function(){
        theme = (theme == "light") ? "dark" : "light";
        localStorage.setItem("theme", theme);
        document.body.setAttribute("data-theme", theme);
        this.innerHTML = theme == "light" ? dark_icon : light_icon;
    }
}