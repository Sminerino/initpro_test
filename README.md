Installation
------
npm install / yarn install

Running
------
npm run start / yarn start

Features
------
1. Any number of sources supported. To add new source:
    1. add link to .json to _apiURLs at ./src/apiStore.js
    2. add one more title to array of buttons at render method of ./src/Table/Table.js

Constraints
------
1. Columns and column types (used for sorting) are formed from the first element in JSON array.
2. If other elements have different structure, only those fields that first element has will be rendered
3. Sorting method (i.e. for number or for date) are determined by the same first element.
it means, if the first element 'item' has field 'key' of type 'number', corresponding column will be sorted
as numbers
4. Dates should have 'dd.mm.yyyy' format, otherwise it could be sorted incorrectly

Issues
------
1. A lot of spaghetti code in the sorting method: wasn't sure how to dynamically determine the type of a column.
2. Not really optimized for small-sized screens

References
------
Made with:
1. React
2. create-react-app
3. axios