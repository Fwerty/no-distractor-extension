chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
    }

    if (!tabs || tabs.length === 0) {
        console.error("Mevcut bir sekme bulunamadı.");
        return;
    }

    if (tabs && tabs.length > 0) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: function() {
                // Bulanıklaştırma için CSS filtresi uygula
                // const blurStyle = document.createElement("style");
                // blurStyle.textContent = "body { filter: blur(5px); }"; // Bulanıklık miktarını ayarlayabilirsiniz
                // document.head.appendChild(blurStyle);
                
                // Sayfanın içeriğini al
                const paragraphs = Array.from(document.querySelectorAll("p")).map(p => p.textContent);
                return paragraphs;
            }
        }, function(results) {
            const contentDiv = document.getElementById("content");
            if (results && results[0] && results[0].result) {
                results[0].result.forEach(paragraph => {
                    const p = document.createElement("p");
                    p.textContent = paragraph;
                    contentDiv.appendChild(p);
                });
            } else {
                contentDiv.textContent = "Hata: Sayfa içeriği alınamadı.";
            }
        });
    } else {
        const contentDiv = document.getElementById("content");
        contentDiv.textContent = "Hata: Mevcut bir sekme bulunamadı.";
    }
});

function toggleBlur() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }

        if (!tabs || tabs.length === 0) {
            console.error("Mevcut bir sekme bulunamadı.");
            return;
        }

        if (tabs && tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: function() {
                    // Arka planı blurla veya blur efektini kaldır
                    const body = document.querySelector("body");
                    const blurValue = body.style.filter === "blur(5px)" ? "none" : "blur(5px)";
                    body.style.filter = blurValue;
                }
            });
        } else {
            console.error("Hata: Mevcut bir sekme bulunamadı.");
        }
    });
}

// Uzantı butonunu al
const toggleButton = document.getElementById('toggleButton');

// Uzantı butonunun tıklama olayını dinle
toggleButton.addEventListener('click', toggleBlur);


// Font seçeneğinin değişimini dinle
document.getElementById('fontSelect').addEventListener('change', applyUserSettings);

// Font boyutu seçeneğinin değişimini dinle
document.getElementById('fontSizeSelect').addEventListener('change', applyUserSettings);

// Arka plan rengi seçeneğinin değişimini dinle
document.getElementById('bgColorSelect1').addEventListener('change', applyUserSettings);
document.getElementById('bgColorSelect2').addEventListener('change', applyUserSettings);


// Kullanıcı tarafından belirlenen fontu, font büyüklüğünü ve arka plan rengini uygula
function applyUserSettings() {
    selectedFont = document.getElementById('fontSelect').value;
    selectedFontSize = document.getElementById('fontSizeSelect').value + 'px';
    selectedBgColor1 = document.getElementById('bgColorSelect1').value;
    selectedBgColor2 = document.getElementById('bgColorSelect2').value;
    document.body.style.fontFamily = selectedFont;
    document.body.style.fontSize = selectedFontSize;
    document.body.style.background = 'linear-gradient(to right, ' + selectedBgColor1 + ', ' + selectedBgColor2 + ')';
}

// Varsayılan ayarları uygula
applyUserSettings();


