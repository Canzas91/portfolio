
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('bt');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
const download1 = document.getElementById('download1');

download1.addEventListener('click', () => {
    alert('Cкоро будет');
});

if (!dlg || !openBtn || !closeBtn || !form) {
    console.error('Не найдены необходимые элементы на странице:');
    console.log('dlg:', dlg);
    console.log('openBtn:', openBtn);
    console.log('closeBtn:', closeBtn);
    console.log('form:', form);
    throw new Error('Не найдены элементы для работы модального окна');
}

let lastActive = null;

openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();

    dlg.querySelector('input, select, textarea, button')?.focus();
});

closeBtn.addEventListener('click', () => dlg.close('cancel'));

form.addEventListener('submit', (e) => {
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    if (!form.checkValidity()) {
        e.preventDefault(); 

        const emailField = form.elements.email;
        if (emailField.validity.typeMismatch) {
            emailField.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }

        form.reportValidity();

        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });
        return;
    }

    e.preventDefault();
    alert('Форма успешно отправлена! (Это заглушка, серверная часть не реализована)');
    dlg.close('success');
    form.reset();
});

dlg.addEventListener('close', () => {
    lastActive?.focus();
});