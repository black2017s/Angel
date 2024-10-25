const timerElement = document.getElementById('timer');

// إعداد وقت انتهاء العرض
const endTime = new Date().getTime() + 17 * 60 * 1000; // 17 دقيقة 

function updateTimer() {
    const now = new Date().getTime();
    const distance = endTime - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.innerHTML = `0d 0h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        timerElement.innerHTML = "EXPIRED";
    }
}

// تحديث كل ثانية
setInterval(updateTimer, 1000);

const apiKey = '3a503f48dcc848eb940962666554070e'; // أدخل مفتاح API هنا
        fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const location = `${data.city}, ${data.state_prov}, ${data.country_name}`; // تجميع المدينة، المحافظة، والدولة
                document.getElementById('location').textContent = location; // عرض الموقع
            })
            .catch(error => {
                console.error('Error fetching the location:', error);
                document.getElementById('location').textContent = 'Unable to fetch location'; // رسالة في حالة الخطأ
            });