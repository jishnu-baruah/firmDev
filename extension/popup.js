document.addEventListener('DOMContentLoaded', () => {
    console.log('Popup DOM fully loaded and parsed');

    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        uploadButton.addEventListener('change', (event) => {
            const files = event.target.files;
            for (const file of files) {
                console.log('File selected:', file.webkitRelativePath || file.name);
            }
        });
    } else {
        console.error('Upload button not found');
    }
});
