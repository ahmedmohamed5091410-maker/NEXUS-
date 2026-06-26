document.addEventListener('DOMContentLoaded', () => {
    const toggler = document.getElementById('chatbot-toggler');
    const windowEl = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chat-send');
    const inputEl = document.getElementById('chat-input');
    const messagesEl = document.getElementById('chatbot-messages');

    if (!toggler || !windowEl) return;

    // Toggle logic for the main button
    toggler.addEventListener('click', () => {
        windowEl.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        windowEl.classList.remove('open');
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        messagesEl.appendChild(msgDiv);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function handleSend() {
        const text = inputEl.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        inputEl.value = '';

        // Simulate professional AI thinking
        setTimeout(() => {
            let reply = 'عذراً، لم أتمكن من فهم استفسارك بشكل كامل. هل يمكنك توضيح ما تبحث عنه، أو هل تفضل التحدث إلى أحد ممثلي خدمة العملاء؟';
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes('اهلا') || lowerText.includes('مرحبا') || lowerText.includes('سلام') || lowerText.includes('صباح') || lowerText.includes('مساء')) {
                reply = 'أهلاً ومرحباً بك في متجر NEXUS! أنا المساعد الافتراضي الخاص بك. يسعدني جداً مساعدتك اليوم. عن ماذا تبحث؟';
            } else if (lowerText.includes('سعر') || lowerText.includes('بكم') || lowerText.includes('اسعار')) {
                reply = 'نحن نقدم أفضل الأسعار التنافسية في السوق. يمكنك تصفح الصفحة الرئيسية للاطلاع على كافة منتجاتنا وأسعارها المحدثة باستمرار. هل تبحث عن منتج معين لأتحقق لك من سعره؟';
            } else if (lowerText.includes('شحن') || lowerText.includes('توصيل') || lowerText.includes('متى')) {
                reply = 'نحن نفخر بشراكتنا مع أفضل شركات الشحن لضمان وصول طلبك بأمان. يستغرق الشحن الداخلي عادةً من يومين إلى 5 أيام عمل كحد أقصى. سيصلك رقم تتبع بمجرد تأكيد طلبك.';
            } else if (lowerText.includes('دفع') || lowerText.includes('فيزا') || lowerText.includes('ماستركارد') || lowerText.includes('كاش')) {
                reply = 'نوفر لك خيارات دفع مرنة وآمنة بنسبة 100%. نقبل جميع البطاقات الائتمانية (Visa, MasterCard)، كما نوفر خدمة الدفع عند الاستلام لتجربة تسوق مريحة وخالية من القلق.';
            } else if (lowerText.includes('استرجاع') || lowerText.includes('تبديل') || lowerText.includes('ضمان')) {
                reply = 'رضاك هو أولويتنا! سياسة الاسترجاع لدينا مرنة جداً؛ يمكنك استرجاع أو استبدال أي منتج خلال 14 يوماً من الاستلام، بشرط أن يكون في حالته الأصلية. جميع إلكترونياتنا مشمولة بضمان الوكيل.';
            } else if (lowerText.includes('خصم') || lowerText.includes('كوبون') || lowerText.includes('عروض')) {
                reply = 'يسعدني أن أخبرك أنه لدينا عرض حصري حالياً! يمكنك استخدام الكود السري "NEXT20" في سلة المشتريات للحصول على خصم فوري بنسبة 20% على إجمالي طلبك. استمتع بالتسوق!';
            } else if (lowerText.includes('شكرا') || lowerText.includes('يعطيك العافية') || lowerText.includes('ممتاز')) {
                reply = 'على الرحب والسعة! هذا واجبي. لا تتردد في مراسلتي مجدداً إذا احتجت لأي مساعدة. نتمنى لك يوماً رائعاً وتجربة تسوق لا تُنسى في NEXUS.';
            }

            addMessage(reply, 'bot');
        }, 800);
    }

    sendBtn.addEventListener('click', handleSend);
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
