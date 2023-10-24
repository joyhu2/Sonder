document.addEventListener('DOMContentLoaded', function() {
    let learnMoreElements = document.querySelectorAll('.learn-more');

    learnMoreElements.forEach(function(element) {
        element.addEventListener('click', function() {
            let moreInfo = this.nextElementSibling;
            if (moreInfo.style.display === 'none' || moreInfo.style.display === '') {
                moreInfo.style.display = 'block';
                this.textContent = 'hide info'; // Change text to 'hide info'
            } else {
                moreInfo.style.display = 'none';
                this.textContent = 'learn more'; // Change text back to 'learn more'
            }
        });
    });
});