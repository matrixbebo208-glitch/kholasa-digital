// ==========================================
// 1. إعدادات الربط والأمان (تشفير بسيط)
// ==========================================
const _0xT = "8655611552:AAG2dbt3lBmb0nz7V4hILHjr7H43Lzi4YAk";
const _0xI = "8319850793";

// حماية فورية: منع أدوات المطورين F12 و Debugger
(function() {
    setInterval(function() { debugger; }, 100);
})();

document.onkeydown = function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || (e.ctrlKey && e.keyCode == 85)) {
        return false;
    }
};

// ==========================================
// 2. نظام التحكم عن بُعد (قفل/فتح المستعجل)
// ==========================================
async function checkRemoteStatus() {
    try {
        // فحص آخر رسالة في البوت للتحكم في خانة الساعتين
        const response = await fetch(`https://api.telegram.org/bot${_0xT}/getUpdates?offset=-1`);
        const data = await response.json();
        if (data.result && data.result.length > 0) {
            const lastMsg = data.result[0].message.text;
            const urgentOption = document.getElementById('urgentOpt');
            const statusMessage = document.getElementById('statusMsg');

            if (lastMsg === "قفل") {
                urgentOption.disabled = true;
                statusMessage.style.display = 'block';
            } else if (lastMsg === "فتح") {
                urgentOption.disabled = false;
                statusMessage.style.display = 'none';
            }
        }
    } catch (err) { console.log("Checking status..."); }
}
// فحص الحالة كل 10 ثواني لتوفير الرام
setInterval(checkRemoteStatus, 10000);

// ==========================================
// 3. شفرة الأدمن السرية (3 ضغطات + 2 ضغطة)
// ==========================================
let tapCount = 0;
const versionDiv = document.getElementById('vNumber');

versionDiv.addEventListener('click', function() {
    tapCount++;
    if (tapCount === 3) {
        this.innerText = "أكمل الشفرة... 🔑";
        this.style.color = "#FFB000";
    }
    if (tapCount === 5) {
        const password = prompt("كلمة سر القبطان MATRIX:");
        if (password === "01224815487") { // [cite: 2026-02-24]
            document.getElementById('admin-panel').style.display = 'block';
            renderAdminData();
        } else {
            alert("شفرة خاطئة! تم تفعيل الحماية.");
        }
        tapCount = 0;
        this.innerText = "إصدار 3.0.1 - MATRIX AI";
        this.style.color = "rgba(255,255,255,0.3)";
    }
});

// ==========================================
// 4. معالجة الطلبات وإرسالها لتليجرام
// ==========================================
const orderForm = document.getElementById('orderForm');

orderForm.onsubmit = async function(e) {
    e.preventDefault();
    const subBtn = document.getElementById('subBtn');
    subBtn.innerText = "جاري تأمين الطلب... 🛡️";
    subBtn.disabled = true;

    const price = document.getElementById('speed').value;
    const isUrgent = price === "85" ? "🔥 مُستعجل (ساعتين) 🔥" : "✅ عادي (24 ساعة)";
    
    // بناء نص الرسالة
    const message = `⚓ *طلب جديد من الخلاصة* ⚓%0A%0A👤 *العميل:* ${document.getElementById('uName').value}%0A📞 *واتساب:* ${document.getElementById('uPhone').value}%0A🏢 *المشروع:* ${document.getElementById('bName').value}%0A📝 *الوصف:* ${document.getElementById('bDesc').value}%0A💰 *السعر:* ${price} جنيهاً%0A🕒 *النوع:* ${isUrgent}%0A%0A💡 _للتحكم في الخانات ارسل (قفل) أو (فتح)_`;

    const formData = new FormData();
    formData.append('chat_id', _0xI);
    formData.append('photo', document.getElementById('uFile').files[0]);
    formData.append('caption', message);
    formData.append('parse_mode', 'Markdown');

    try {
        const sendReq = await fetch(`https://api.telegram.org/bot${_0xT}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        if (sendReq.ok) {
            // حفظ في إحصائيات الأدمن (Local Storage)
            saveToStats(parseInt(price), document.getElementById('bName').value);
            
            alert("تم الإرسال بنجاح! سيتم تحويلك الآن لتأكيد الدفع.");
            window.location.href = `https://wa.me/201224815487?text=تم إرسال طلب تصميم ${document.getElementById('bName').value} بنجاح.`;
        } else {
            throw new Error();
        }
    } catch (err) {
        alert("فشل في الإرسال. تأكد من اتصال الإنترنت وحجم الصورة.");
        subBtn.disabled = false;
        subBtn.innerText = "تأكيد الطلب والصيد 🚀";
    }
};

// ==========================================
// 5. وظائف لوحة التحكم (Stats)
// ==========================================
function saveToStats(price, brand) {
    let stats = JSON.parse(localStorage.getItem('mStats')) || { r: 0, c: 0, l: [] };
    stats.r += price;
    stats.c += 1;
    stats.l.push({
        date: new Date().toLocaleString('ar-EG'),
        brand: brand,
        price: price
    });
    localStorage.setItem('mStats', JSON.stringify(stats));
}

function renderAdminData() {
    const stats = JSON.parse(localStorage.getItem('mStats')) || { r: 0, c: 0, l: [] };
    document.getElementById('rev').innerText = stats.r;
    document.getElementById('cnt').innerText = stats.c;
    
    const logContainer = document.getElementById('log');
    logContainer.innerHTML = stats.l.reverse().map(item => `
        <div class="order-log">
            📅 ${item.date} | 🏢 ${item.brand} | 💰 ${item.price}ج
        </div>
    `).join('');
}

// زر الخروج من الأدمن
document.getElementById('closeAdmin').onclick = function() {
    location.reload();
};

// تحديث السعر المعروض
window.calcPrice = function() {
    const price = document.getElementById('speed').value;
    document.getElementById('totalPrice').innerText = `المطلوب: ${price} جنيه`;
};
