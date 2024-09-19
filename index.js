const colluns = document.querySelectorAll(".collun")
const texto = document.getElementById("texto")
const resetB = document.getElementById("reset")
let floor = [7,7,7,7,7,7,7,7]
let players = [["●","crimson"],["■","aquamarine"]];
let board = [["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ]
let playerCount = 1;
let next2P = 0
let isRunning = true;
colluns.forEach(collun =>{collun.addEventListener("click",collunClicked)})
resetB.addEventListener("click",reset)
function collunClicked()
{
    if (isRunning)
    {
    pos = this.getAttribute("posC")
    const selected = players[next2P]
    if (floor[pos] != -1){
    draw(this,pos,selected)
    checkWin(pos,selected[0])
    floor[pos] -= 1
    }
    }
}

function draw(collun,pos,selected)
{  
    const chosen = collun.children[floor[pos]]
    chosen.innerText = selected[0]
    board [floor[pos]][pos] = selected[0]
    chosen.style.color = selected[1]
    console.log(board[floor[pos]])
}

function checkWin(pos,char)
{
    //horizontal
    let checks = 0
    for (let i = pos; i < 8 && board[floor[pos]][i] == char; i++)
    {
        checks++
    }
    for (let i = pos-1;i >= 0 && board[floor[pos]][i] == char;i--)
    {
        checks++
    } 
    if (checks >= 4){win(); return;}
    //vertical
    checks = 0
    for (let i = floor[pos]; i < 8 && board[i][pos] == char;i++)
    {
        checks++
    }
    for (let i = floor[pos]-1; i > 0 && board[i][pos] == char;i--)
    {
        checks++
    }
    if (checks >= 4){win(); return;}
    // diagonal \
    checks = 0
    for (let i = floor[pos],j = pos; i < 8 && j < 8 && board[i][j] == char;i++,j++)
    {
        checks++
    }
    for (let i = floor[pos]-1,j = pos-1; i >= 0 && j >= 0 && board[i][j] == char;i--,j--)
    {
        checks++
    }
    if (checks >= 4){win(); return;}
    // diagonal /
    checks = 0
    for (let i = floor[pos],j = pos; i >= 0 && j < 8 && board[i][j] == char;i--,j++)
    {
        checks++
    }
    for (let i = floor[pos]+1,j = pos-1; i < 8 && j >= 0 && board[i][j] == char;i++,j--)
    {
        checks++
    }
    if (checks >= 4)
    {win(); return;}
    turnChange()
}

function win()
{
texto.textContent = `o jogador ${next2P + 1} ganhou`
isRunning = false
colluns.forEach(collun =>
    {
        collun.style.cursor = "initial"
    }
    )
}

function turnChange()
{
    if (next2P < playerCount)
    {
        next2P++
    }
    else
    {
        next2P = 0;
    }
    texto.innerText = `Vez do jogador ${next2P + 1}`
}

function reset() {location.reload()}

