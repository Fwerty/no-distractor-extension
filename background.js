chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: "https://example.com" }, function(tab) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                document.body.innerHTML = "<h1>Merhaba</h1>";
            },
        });
    });
 });
 