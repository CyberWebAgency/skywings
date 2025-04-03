// Preloader Management
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        // Method 1: Remove preloader after a fixed time
        setTimeout(function() {
            hidePreloader();
        }, 1500);
        
        // Method 2: Remove preloader when page is loaded
        window.addEventListener('load', function() {
            hidePreloader();
        });
        
        // Backup method: Remove preloader after 3 seconds maximum
        setTimeout(function() {
            if (preloader.style.display !== 'none') {
                hidePreloader();
            }
        }, 3000);
    }
    
    function hidePreloader() {
        preloader.classList.add('preloader-hide');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
}); 