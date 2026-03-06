// مصفوفة صور أعمالك (تقدر تغير الروابط دي بصور شغلك من كانفا)
const portfolioImages = [
    "https://img.freepik.com/free-vector/burger-logo-template-design_23-2148493132.jpg",
    "https://img.freepik.com/free-vector/coffee-shop-logo-design-template_23-2148874395.jpg",
    "https://img.freepik.com/free-vector/tech-logo-template_23-2149202976.jpg"
];

// وظيفة إنشاء "فقاعات" وأسماك متحركة في الخلفية
function createOceanLife() {
    const container = document.body;
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.innerHTML = "🫧";
        bubble.style.position = "fixed";
        bubble.style.bottom = "-50px";
        bubble.style.left = Math.random() * 100 + "vw";
        bubble.style.fontSize = Math.random() * 20 + 10 + "px";
        bubble.style.opacity = "0.3";
        bubble.style.zIndex = "-1";
        bubble.style.animation = `rise ${Math.random() * 5 + 5}s infinite linear`;
        container.appendChild(bubble);
    }
}

// إضافة ستايل الأنميشن برمجياً عشان ميتعبش الرام
const style = document.createElement('style');
style.innerHTML = `
    @keyframes rise {
        0% { transform: translateY(0) translateX(0); opacity: 0.5; }
        100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
    }
    .portfolio-float {
        transition: 0.5s;
        cursor: pointer;
    }
    .portfolio-float:hover {
        transform: scale(1.1) rotate(5deg);
        filter: drop-shadow(0 0 15px var(--fish-gold));
    }
`;
document.head.appendChild(style);

// تشغيل الأنميشن
window.addEventListener('load', createOceanLife);
