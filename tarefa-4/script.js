let square = document.querySelector(".child")
let btn = document.getElementById("btnChangeColor")
let dbtn = document.getElementById("btnRedefine")
let colorHistory = document.getElementById("colorHistory")

function randomColor() {
    r = Math.floor(Math.random() * 256)
    g = Math.floor(Math.random() * 256)
    b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

btn.addEventListener("click", () => {
    color = randomColor()
    square.style.backgroundColor = color
    btnRedefine.disabled = false;
    
    let li = document.createElement("li")
    li.textContent = color
    li.style.color = color
    colorHistory.appendChild(li)
})

btnRedefine.addEventListener("click", () => {
    square.style.backgroundColor = "gray"
    colorHistory.innerHTML = "";
    btnRedefine.disabled = true

    listArea.style.display = "none"
})