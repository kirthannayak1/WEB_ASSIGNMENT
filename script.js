$(document).ready(function () {
    // Client-side form validation before submission
    $("#registrationForm").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Clear any previous error messages
        $("input, textarea").removeClass("error");
        $(".error-message").remove();

        // Validate Name
        const name = $("#name").val().trim();
        if (name === "") {
            isValid = false;
            $("#name").addClass("error")
                .after("<span class='error-message'>Name is required.</span>");
        }

        // Validate Email
        const email = $("#email").val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "" || !emailRegex.test(email)) {
            isValid = false;
            $("#email").addClass("error")
                .after("<span class='error-message'>Enter a valid email.</span>");
        }

        // Validate Phone
        const phone = $("#phone").val().trim();
        if (phone === "" || isNaN(phone)) {
            isValid = false;
            $("#phone").addClass("error")
                .after("<span class='error-message'>Enter a valid phone number.</span>");
        }

        // Validate Address
        const address = $("#address").val().trim();
        if (address === "") {
            isValid = false;
            $("#address").addClass("error")
                .after("<span class='error-message'>Address is required.</span>");
        }

        // If the form is valid, submit via AJAX
        if (isValid) {
            $.ajax({
                type: "POST",
                url: "index.php", // Same file processes the form
                data: $(this).serialize(), // Send form data
                success: function (response) {
                    // Display the result dynamically in the result container
                    $("#result-container").html(response).show();
                    $(".form-container").hide(); // Hide the form after submission
                },
                error: function () {
                    alert("An error occurred while submitting the form.");
                }
            });
        }
    });
});
