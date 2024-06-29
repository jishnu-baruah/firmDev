chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: function () {
            document.addEventListener('click', function (event) {
                if (event.target.id === 'testButton') {
                    console.log('Test button clicked!');
                }
            });
        }
    });
});