// matrix placeholder exxample (roles x employees)
const scores = [
    [15,10,18,12,16],
    [19,15,14,17,20],
    [11,18,10,12,13],
    [15,16,17,18,14],
    [13,12,19,11,15]
];


// Choose which score matrix to use
const currentScores = scores;

const originalRoleCount = currentScores.length;
const originalEmployeeCount = currentScores[0].length;

// Use a consistent floating-point tolerance
const FLOAT_TOL = 1e-6;

// Add tiny noise to break ties 
function addTinyNoise(matrix, epsilon = FLOAT_TOL) {
    return matrix.map((row, i) =>
        row.map((val, j) => val + epsilon * (i * matrix[0].length + j + 1))
    );
}

//Pad to make the matrix a Square Matrix (use -Infinity for maximization)
function padToSquare(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const size = Math.max(numRows, numCols);
    const padded = matrix.map(row => {
        const newRow = row.slice();
        while (newRow.length < size) newRow.push(-Infinity); // for maximization
        return newRow;
    });
    while (padded.length < size) {
        padded.push(new Array(size).fill(-Infinity));
    }
    return padded;
}

const paddedMatrix = padToSquare(addTinyNoise(currentScores));

// Hungarian Algorithm - start
function hungarianAlgorithm(scoreMatrix) {
    const n = scoreMatrix.length;
    const maxVal = Math.max(...scoreMatrix.flat().filter(Number.isFinite));
    // Convert to minimization problem: C_ij = M - A_ij
    const costMatrix = [];
    for (let i = 0; i < n; i++) {
        costMatrix[i] = [];
        for (let j = 0; j < n; j++) {
            costMatrix[i][j] = !Number.isFinite(scoreMatrix[i][j]) ? maxVal + 1 : maxVal - scoreMatrix[i][j];
        }
    }
    let mask = Array.from({ length: n }, () => Array(n).fill(0));
    let rowCover = Array(n).fill(false);
    let colCover = Array(n).fill(false);
    // Step 1: Subtract row minima
    for (let i = 0; i < n; i++) {
        const minVal = Math.min(...costMatrix[i]);
        for (let j = 0; j < n; j++) {
            costMatrix[i][j] -= minVal;
        }
    }

    // Step 2: Subtract column minima
    for (let j = 0; j < n; j++) { // Iterate through columns
        let minVal = Infinity;
        for (let i = 0; i < n; i++) { // Find minimum in the current column
            minVal = Math.min(minVal, costMatrix[i][j]);
        }
        for (let i = 0; i < n; i++) { // Subtract minimum from all elements in the column
            costMatrix[i][j] -= minVal;
        }
    }

    // Step 3: Initial starring of zeros
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (Math.abs(costMatrix[i][j]) < FLOAT_TOL && !rowCover[i] && !colCover[j]) {
                mask[i][j] = 1; // Starred zero
                rowCover[i] = true;
                colCover[j] = true;
            }
        }
    }
    rowCover.fill(false);
    colCover.fill(false);
    // Debug: Print costMatrix and mask after initial steps
    console.log('Cost Matrix after row reduction:', costMatrix);
    console.log('Mask after initial starring:', mask);
    // Main loop of Munkres' algorithm
    let step = 3;
    let path = [];
    while (step !== 7) {
        switch (step) {
            case 3:
                step = step3_coverColumnsWithStars(mask, colCover, n);
                break;
            case 4:
                const resultStep4 = step4_findUncoveredZeroAndPrime(costMatrix, rowCover, colCover, mask, n);
                step = resultStep4.nextStep;
                if (resultStep4.path) {
                    path = resultStep4.path;
                }
                break;
            case 5:
                step = step5_augmentPath(mask, path, rowCover, colCover, n);
                break;
            case 6:
                step = step6_adjustMatrix(costMatrix, rowCover, colCover, n);
                break;
            default:
                console.error("Error: Invalid step encountered in Hungarian Algorithm!");
                return { assignment: [], totalScore: 0 };
        }
    }
    // Debug: Print final mask
    console.log('Final mask:', mask);
    const assignment = [];
    let totalScore = 0;
    for (let i = 0; i < n; i++) {
        const j = mask[i].indexOf(1);
        if (j !== -1) {
            assignment.push({ role: i, employee: j });
        }
    }
    return { assignment, totalScore };
}

// Munkres' Algorithm Steps Breakdown (Helper Functions):

// Step 3: Cover columns containing starred zeros.
function step3_coverColumnsWithStars(mask, colCover, n) {
    colCover.fill(false); // Reset
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (mask[i][j] === 1) {
                colCover[j] = true;
            }
        }
    }
    const coveredColsCount = colCover.filter(Boolean).length;
    if (coveredColsCount === n) {
        return 7; // All columns covered, solution found
    } else {
        return 4; // Not enough covered, proceed to Step 4
    }
}

// Step 4: Find an uncovered zero and prime it.
function step4_findUncoveredZeroAndPrime(costMatrix, rowCover, colCover, mask, n) {
    while (true) {
        let [r, c] = findUncoveredZero(costMatrix, rowCover, colCover);

        if (r === -1) { // No uncovered zero found
            return { nextStep: 6 }; // Go to Step 6 (Adjust matrix)
        } else {
            mask[r][c] = 2; // Prime the zero (Z_0)

            const starColInRow = findStarInRow(mask, r, n);
            if (starColInRow === -1) { // No starred zero in this row (augmenting path found)
                const localPath = buildPath(mask, r, c, n); // Build the path starting from Z_0
                return { nextStep: 5, path: localPath }; // Go to Step 5 (Augment path)
            } else { // Starred zero (S_1) found in the same row as Z_0
                rowCover[r] = true; // Cover the row of Z_0
                colCover[starColInRow] = false; // Uncover the column of S_1
            }
        }
    }
}

// Helper: Find an uncovered zero
function findUncoveredZero(matrix, rowCover, colCover) {
    for (let i = 0; i < matrix.length; i++) {
        if (!rowCover[i]) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (!colCover[j] && Math.abs(matrix[i][j]) < FLOAT_TOL) {
                    return [i, j];
                }
            }
        }
    }
    return [-1, -1];
}

// Helper: Find a starred zero in a given row
function findStarInRow(mask, row, n) {
    for (let j = 0; j < n; j++) {
        if (mask[row][j] === 1) {
            return j;
        }
    }
    return -1;
}

// Helper: Find a primed zero in a given column
function findPrimeInCol(mask, col, n) {
    for (let i = 0; i < n; i++) {
        if (mask[i][col] === 2) {
            return i;
        }
    }
    return -1;
}

// Step 5: Augmenting Path Found
function step5_augmentPath(mask, path, rowCover, colCover, n) {
    for (const { row, col } of path) {
        if (mask[row][col] === 1) { // Starred zero becomes unstarred
            mask[row][col] = 0;
        } else { // Primed zero becomes starred
            mask[row][col] = 1;
        }
    }

    // Clear all primed zeros
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (mask[i][j] === 2) {
                mask[i][j] = 0;
            }
        }
    }
    // Reset covers for next iteration of the main loop
    rowCover.fill(false);
    colCover.fill(false);
    return 3; // Go back to Step 3
}

// Helper: Build the augmenting path
function buildPath(mask, r, c, n) {
    const localPath = [];
    let pathIndex = 0;
    localPath[pathIndex] = { row: r, col: c };
    while (true) {
        const currentPrimeCol = localPath[pathIndex].col;
        const foundStarRowInCol = findStarInCol(mask, currentPrimeCol, n);
        if (foundStarRowInCol !== -1) {
            pathIndex++;
            localPath[pathIndex] = { row: foundStarRowInCol, col: currentPrimeCol };
            const primeColInRow = findPrimeInRow(mask, foundStarRowInCol, n);
            if (primeColInRow === -1) {
                // Defensive: break if no primed zero found
                break;
            }
            pathIndex++;
            localPath[pathIndex] = { row: foundStarRowInCol, col: primeColInRow };
        } else {
            break;
        }
    }
    return localPath;
}

// Helper: Find a starred zero in a given column
function findStarInCol(mask, col, n) {
    for (let i = 0; i < n; i++) {
        if (mask[i][col] === 1) {
            return i;
        }
    }
    return -1;
}

// Helper: Find a primed zero in a given row
function findPrimeInRow(mask, row, n) {
    for (let j = 0; j < n; j++) {
        if (mask[row][j] === 2) {
            return j;
        }
    }
    return -1;
}


// Step 6: Adjust the matrix (create more zeros)
function step6_adjustMatrix(costMatrix, rowCover, colCover, n) {
    let minVal = Infinity;
    for (let i = 0; i < n; i++) {
        if (!rowCover[i]) {
            for (let j = 0; j < n; j++) {
                if (!colCover[j]) {
                    minVal = Math.min(minVal, costMatrix[i][j]);
                }
            }
        }
    }

    if (minVal === Infinity) {
        // This scenario indicates a logical flaw or an unhandled edge case
        // where all cells are covered but a complete assignment isn't found.
        // It generally shouldn't be reachable in a correct Hungarian algorithm
        // implementation for valid inputs.
        console.error("Error: All cells are covered, but an optimal assignment was not found. This indicates a problem in the algorithm's logic or an edge case not handled.");
        return 7; // Attempt to terminate gracefully
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (rowCover[i]) {
                costMatrix[i][j] += minVal;
            }
            if (!colCover[j]) {
                costMatrix[i][j] -= minVal;
            }
        }
    }
    return 4; // Go back to Step 4
}


// ✅ Step 3: Solve
const result = hungarianAlgorithm(paddedMatrix);

// ✅ Step 4: Filter Real Assignments Only
const realAssignments = result.assignment.filter(({ role, employee }) =>
    role < originalRoleCount && employee < originalEmployeeCount
);

// ✅ Step 5: Output
console.log("\n--- Final Results ---");
console.log("📊 Final Assignments (Real Roles Only):");
if (realAssignments.length === 0 && originalRoleCount > 0) {
    console.log("No valid assignments found for real roles. This may indicate an issue with the algorithm or input data.");
} else {
    realAssignments.forEach(({ role, employee }) => {
        // Use the original currentScores for display
        console.log(`- Role ${role + 1} → Employee ${employee + 1} (Score: ${currentScores[role][employee]})`);
    });
}

const realTotal = realAssignments.reduce((sum, a) => sum + currentScores[a.role][a.employee], 0);
console.log("✅ Total Score:", realTotal);