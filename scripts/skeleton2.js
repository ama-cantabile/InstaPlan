// Loads the login navbar and footer.
function loadSkeleton() {
    console.log($('#navbar-container').load('./text/loginNav.html'));
    console.log($('#footer-container').load('./text/footer.html'));
}

loadSkeleton();