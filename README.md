# Sudoku Solver

### Angular | Typescript | Tailwind

### *simple app for solving sudokus!*

### Main features:
* Edit sudoku board
* Solve for any solvable board with a simple recursive algorithm
* Handle errors for unsolvable boards
* Can send requests to sudoku interperter: https://github.com/Yonraz/sudoku-interperter-openCV-tensorflow

### Image Uploading:
A user can upload an image, which will be sent to a flask server that will process the image, extract the sudoku board data and return it to the client.
Then the client can simply press the Solve button to solve the puzzle.

### How to Run:
- clone this repo.
- cd into sudoku-solver-client
```js
npm install
ng serve
```
#### To use with server (you should have pip installed, I recommend running in venv)
- clone https://github.com/Yonraz/sudoku-interperter-openCV-tensorflow
- cd into folder
```python
pip install tensorflow numpy flask flask-cors matplotlib
py app.py
```
you may see this error: 
```bash
I tensorflow/core/util/port.cc:113] oneDNN custom operations are on. You may see slightly different numerical results due to floating-point round-off errors from different computation orders. To turn them off, set the environment variable TF_ENABLE_ONEDNN_OPTS=0.
```
it's fine, should still work.
