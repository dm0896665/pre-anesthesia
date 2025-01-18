import '../node_modules/@nobleclem/jquery-multiselect/jquery.multiselect.js';
$('select[multiple]').multiselect({
    columns: 3,
    search: true,
    selectAll: true,
    texts: {
        placeholder: 'Select States',
        search: 'Search States'
    }
});