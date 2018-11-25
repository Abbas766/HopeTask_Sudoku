function solve(matrix) {
    msg = document.getElementById('msg');
    msg.textContent = "Solving..wait..";
    var i, j, b, k;
    for (i = 0; i <= 8; i++) {
      for (j = 0; j <= 8; j++) {
        //check for legitimate values
        if (!matrix[i][j]) {
          for (k = 1; k <= 9; k++) {
            if (insert(matrix, i, j, k)) {
              matrix[i][j] = k;
              b = solve(matrix);
              if (b) { return true; }
              matrix[i][j] = 0;
            }
          }
          msg.textContent = "Unable to solve";
          return false;
        }
      }
    }
    msg.textContent = "Solved.  ";
    return true;
  }

  function insert(matrix, i, j, k) {
    //check column and rows
    var a, b;
    for (a = 0; a <= 8; a++) {
      if (a != i && matrix[a][j] == k) {
        return false;
      }
    }
    for (a = 0; a <= 8; a++) {
      if (a != j && matrix[i][a] == k) {
        return false;
      }
    }
    //check the 3 by 3 squares
    var y = Math.floor((i / 3)) * 3,
        x = Math.floor((j / 3)) * 3;
    for (a = 0; a < 3; a++) {
      for (b = 0; b < 3; b++) {
        if (a != i && b != j && matrix[y + a][x + b] == k) {
          return false;
        }
      }
    }
    return true;
  }

  function test() {
    var form = document.querySelector('form#sudoku'),
        matrix,
        holder = [],
        i, j, k, z;
    for (i = 0; i < 81; i++) {
      //get the form values
      holder[i] = form[i].value;
      matrix = [];
      k = -1;
      // from 1 dimensional to matrix
      for (j = 0; j < holder.length; j++) {
        if (j % 9 === 0) {
          k++;
          matrix[k] = [];        
        }
        matrix[k].push(holder[j]);
      }
    }
    solve(matrix);

    //display the solved sudoku numbers
    z = 0;
    for (i = 0; i < matrix.length; i++) {
      for (j = 0; j < matrix[i].length; j++) {      
        //display the solved sudoku numbers
        form[z].value = matrix[i][j];
        z++;
      }
    }
  }  

  function populateTable(presetconfig=[[0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]]) {
    

    var i, j, tr, td, input,
        table = document.querySelector('form#sudoku table'),
        tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for (i = 0; i < 9; i++) {
      tr = document.createElement('tr');
      tbody.appendChild(tr);
      for (j = 0; j < 9; j++) {            
        td = document.createElement('td');
        tr.appendChild(td);
        input = document.createElement('input');
        input.type = 'text';
        input.size = 1;
        if(presetconfig[i][j]!=0)
            input.value=presetconfig[i][j];
        td.appendChild(input);
      }
    }
    document.querySelector('input[value=Solve]')
      .addEventListener('click', test);
  }
  
  var prearray = [[0,0,0,0,0,0,0,6,0],
  [0,0,7,3,0,0,9,0,0],
  [0,0,8,9,0,0,0,0,0],
  [0,7,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,8],
  [8,0,0,0,5,0,6,0,4],
  [0,1,0,2,0,0,0,9,0],
  [2,0,0,0,0,4,0,0,0],
  [0,6,9,0,0,0,0,7,0]];
  populateTable(prearray);