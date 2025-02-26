document.getElementById('filterInput').addEventListener('keyup', function() {
    var filter = this.value.toUpperCase();
    var options = document.getElementById('filterSelect').options;
    
    for (var i = 0; i < options.length; i++) {
        var txtValue = options[i].textContent || options[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            options[i].style.display = "";
        } else {
            options[i].style.display = "none";
        }
    }
});

function selection_foco() {
    const select = document.getElementById('select_id');
    select.style.transform = 'transform: translateY(+25%);'
}
