    // +4 : 4,8,12
    // +6 : 18,24,30,36,
    // +8 : 44, 52

    // 4  : 2
    // 8  : 4
    // 16 : 4
    // 20 : 5
    // 24 : 4
    // 30 : 6
    // 36 : 6
    // 42 : 7
    // 52 : 13

    const increaseGrid = () => {
    currentGridSize += 4;
    numberOfPairs = currentGridSize / 2;

    if (currentGridSize > maxGrid) {
        winner();
    } else {
        clearGrid();
        createGrid(currentGridSize);
        if (currentGridSize === 8) {
            grid.style.gridTemplateColumns = "repeat(4, 1fr)";
        } else if (currentGridSize === 20) {
            grid.style.gridTemplateColumns = "repeat(5, 1fr)";
        } else if (currentGridSize === 24) {
            grid.style.gridTemplateColumns = "repeat(6, 1fr)";
        } else if (currentGridSize === 28) {
            grid.style.gridTemplateColumns = "repeat(7, 1fr)";
        } else if (currentGridSize === 32) {
            grid.style.gridTemplateColumns = "repeat(8, 1fr)";
        } else if (currentGridSize === 36) {
            grid.style.gridTemplateColumns = "repeat(9, 1fr)";
        } else if (currentGridSize === 40) {
            grid.style.gridTemplateColumns = "repeat(10, 1fr)";
            const children = grid.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "8vw";
                child.style.width = "5vw";
            }        
        } else if (currentGridSize >= 44 && currentGridSize < 66) {
            grid.style.gridTemplateColumns = "repeat(12, 1fr)";
            const children = grid.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "5vw";
                child.style.width = "4vw";
            }        
        } else if (currentGridSize >= 66) {
            grid.style.gridTemplateColumns = "repeat(20, 1fr)";
            const children = grid.children;
        
            // Loop through each child element and set their styles
            for (const child of children) {
                child.style.height = "5vw";
                child.style.width = "4vw";
            }        
        }
    }
}