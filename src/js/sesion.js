
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar modal de términos y condiciones
    document.getElementById('showTerms').addEventListener('click', function(e) {
        e.preventDefault();
        var termsModal = new bootstrap.Modal(document.getElementById('termsModal'));
        termsModal.show();
    });
});



