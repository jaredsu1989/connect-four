document.addEventListener('DOMContentLoaded', () => {
    //grid setup
    for (let i = 0; i < 42; i++) {
        let child = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        child.classList.add('grid-item');
        child.classList.add('id');
        child.setAttribute('id', i);
        child.addEventListener('click', clickEvent);
        document.querySelector('#grid').appendChild(child);
    }

    let player = document.getElementById('player');
    let numberOfCircles = 0;
    //grid onclick event listener
    function clickEvent() {
        //selected grid-items append circle
        //circle creation
        let child = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        let thisGrid = this;
        let thisGridClass = this.classList;
        let getGridId = Number(this.getAttribute('id'));
        function ensuringStack() {

            if (getGridId < 35) {
                let checkGridIdHasCircle = (document.querySelectorAll('svg')[getGridId + 7].children).length;

                if (checkGridIdHasCircle == 0) {
                    alert('Sorry, cannot place it here!');
                } else if (checkGridIdHasCircle > 0) {
                    circleCreation();
                    changePlayer();
                }

            } else {
                circleCreation();
                changePlayer();
            }
        }
        function circleCreation() {
            if (thisGridClass.length < 3) {
                child.classList.add('circle');
                child.setAttribute('cx', 35);
                child.setAttribute('cy', 35);
                child.setAttribute('r', 34);
                child.setAttribute('stroke', 'black');
                child.setAttribute('fill', chipColor());
                thisGrid.appendChild(child);
                thisGrid.classList.add(chipColor());

            }

        }


        function chipColor() {
            if (thisGridClass.length == 2) {
                if (player.innerText == 'redplayer') {
                    numberOfCircles += 1;

                    return 'red';
                } else if (player.innerText == 'blueplayer') {
                    numberOfCircles += 1;
                    return 'blue';
                } else {
                    return 'blank';
                }
            } else {
                if (thisGridClass[2] == 'red') {
                    return 'red';
                } else {
                    return 'blue';
                }
            }

        }
        //changes player unless game is over
        function changePlayer() {
            if (player.innerText == 'redplayer') {
                player.innerText = 'blueplayer';
            } else {
                player.innerText = 'redplayer';
            }
        }
        //Game over with either winning message or restarting game
        function gameOver() {
            //board filled up
            let circle = document.querySelectorAll('circle');
            if (numberOfCircles >= 126 && winner() == false) {
                alert('It\'s a draw');
                gridItemsss.forEach(ele => { ele.classList.remove('red') });
                gridItemsss.forEach(ele => { ele.classList.remove('blue') });
                circle.forEach(ele => {ele.remove()});
            } else if (winner() == true) {
                let gridItemsss = document.querySelectorAll('.grid-item');
                alert(chipColor() + ' player is the winner!');
                gridItemsss.forEach(ele => { ele.classList.remove('red') });
                gridItemsss.forEach(ele => { ele.classList.remove('blue') });
                circle.forEach(ele => {ele.remove()});

            }
            //one player wins
            function winner() {
                let grid = document.querySelectorAll('.grid-item');
                function crossCheck() {
                    let gridContent = [];
                    let gridContentWCircles = [];
                    let result = false;
                    for (i = 0; i < 6; i++) {
                        gridContent[i] = [];
                        for (j = 0; j < 7; j++) {
                            gridContent[i].push(grid[j + 7 * i].classList[2]);

                        }
                    }
                    gridContentWCircles = gridContent.map(ele => ele.toString());
                    gridContentWCircles.forEach(ele => {
                        if (ele.includes('red,red,red,red') || ele.includes('blue,blue,blue,blue')) {
                            result = true;
                        }
                    });
                    return result;
                }

                function verticalCheck() {
                    let gridContent = [];
                    let gridContentWCircles = [];
                    let result = false;
                    for (i = 0; i < 7; i++) {
                        gridContent[i] = [];
                        for (j = 0; j < 6; j++) {
                            gridContent[i].push(grid[i + 7 * j].classList[2]);

                        }
                    }
                    gridContentWCircles = gridContent.map(ele => ele.toString());
                    //console.log(gridContentWCircles);

                    gridContentWCircles.forEach(ele => {
                        if (ele.includes('red,red,red,red') || ele.includes('blue,blue,blue,blue')) {
                            result = true;
                        }
                    });
                    return result;
                }

                function leftDiagCheck() {
                    let gridContent1 = [];
                    let gridContent2 = [];
                    let gridContent3 = [];
                    let gridContent4 = [];
                    let gridContent5 = [];
                    let gridContent6 = [];

                    let result = false;

                    for (i = 3; i <= 21; i += 6) {
                        gridContent1.push(grid[i].classList[2]);
                    }
                    for (i = 4; i <= 28; i += 6) {
                        gridContent2.push(grid[i].classList[2]);
                    }
                    for (i = 5; i <= 35; i += 6) {
                        gridContent3.push(grid[i].classList[2]);
                    }
                    for (i = 6; i <= 36; i += 6) {
                        gridContent4.push(grid[i].classList[2]);
                    }
                    for (i = 13; i <= 37; i += 6) {
                        gridContent5.push(grid[i].classList[2]);
                    }
                    for (i = 20; i <= 38; i += 6) {
                        gridContent6.push(grid[i].classList[2]);
                    }

                    let content1Str = gridContent1.toString();
                    let content2Str = gridContent2.toString();
                    let content3Str = gridContent3.toString();
                    let content4Str = gridContent4.toString();
                    let content5Str = gridContent5.toString();
                    let content6Str = gridContent6.toString();

                    if (content1Str.includes('red,red,red,red') || content1Str.includes('blue,blue,blue,blue')
                        || content2Str.includes('red,red,red,red') || content2Str.includes('blue,blue,blue,blue')
                        || content3Str.includes('red,red,red,red') || content3Str.includes('blue,blue,blue,blue')
                        || content4Str.includes('red,red,red,red') || content4Str.includes('blue,blue,blue,blue')
                        || content5Str.includes('red,red,red,red') || content5Str.includes('blue,blue,blue,blue')
                        || content6Str.includes('red,red,red,red') || content6Str.includes('blue,blue,blue,blue')
                    ) {
                        result = true;
                    }

                    return result;
                }

                function rightDiagCheck() {
                    let gridContent1 = [];
                    let gridContent2 = [];
                    let gridContent3 = [];
                    let gridContent4 = [];
                    let gridContent5 = [];
                    let gridContent6 = [];

                    let result = false;

                    for (i = 14; i <= 38; i += 8) {
                        gridContent1.push(grid[i].classList[2]);
                    }
                    for (i = 7; i <= 39; i += 8) {
                        gridContent2.push(grid[i].classList[2]);
                    }
                    for (i = 0; i <= 40; i += 8) {
                        gridContent3.push(grid[i].classList[2]);
                    }
                    for (i = 1; i <= 41; i += 8) {
                        gridContent4.push(grid[i].classList[2]);
                    }
                    for (i = 2; i <= 34; i += 8) {
                        gridContent5.push(grid[i].classList[2]);
                    }
                    for (i = 3; i <= 27; i += 8) {
                        gridContent6.push(grid[i].classList[2]);
                    }

                    let content1Str = gridContent1.toString();
                    let content2Str = gridContent2.toString();
                    let content3Str = gridContent3.toString();
                    let content4Str = gridContent4.toString();
                    let content5Str = gridContent5.toString();
                    let content6Str = gridContent6.toString();

                    if (content1Str.includes('red,red,red,red') || content1Str.includes('blue,blue,blue,blue')
                        || content2Str.includes('red,red,red,red') || content2Str.includes('blue,blue,blue,blue')
                        || content3Str.includes('red,red,red,red') || content3Str.includes('blue,blue,blue,blue')
                        || content4Str.includes('red,red,red,red') || content4Str.includes('blue,blue,blue,blue')
                        || content5Str.includes('red,red,red,red') || content5Str.includes('blue,blue,blue,blue')
                        || content6Str.includes('red,red,red,red') || content6Str.includes('blue,blue,blue,blue')
                    ) {
                        result = true;
                    }

                    return result;
                }
                //crossCheck();
                //verticalCheck();
                //leftDiagCheck();
                //rightDiagCheck();

                if (crossCheck() || verticalCheck() || leftDiagCheck() || rightDiagCheck()) {
                    return true;
                } else {
                    return false;
                }

            }

        }
        ensuringStack();
        gameOver();

    }
})



















