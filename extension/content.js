document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const testButton = document.querySelector('#testButton'); // Use the correct selector
    if (testButton) {
        testButton.addEventListener('click', () => {
            console.log('Test button clicked!');
        });
    } else {
        console.log('Test button not found.');
    }
});
