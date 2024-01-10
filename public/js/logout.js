window.onload = function() {
    setTimeout(function() {
        location.reload();
    }, 60000); // Adjust the delay if needed
};
    document.addEventListener('DOMContentLoaded', function () {
        // Check if the 'userLoggedIn' cookie is present
  //const userId = jwt.verify(userid, "keybro")
        const userLoggedIn = getCookie('userid');

        // Get the profile and logout links
        const profileLink = document.getElementById('profileLink');
        const logoutLink = document.getElementById('logoutLink');

        // Update the navigation menu based on the cookie presence
        if (userLoggedIn) {
            profileLink.style.display = 'block';
            logoutLink.style.display = 'block';
            profileLink.innerHTML = '<a href="/myprofile">View Profile</a>';
        } else {
            profileLink.style.display = 'block';
            logoutLink.style.display = 'none';
            profileLink.innerHTML = '<a href="/auth">Register</a>';
        }
    });

    // Function to get a specific cookie by name
    function getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }