export function createDialog(title, options, selected, onSelect) {
    // Remove all existing dialogs
    document.querySelectorAll(".account-manager-dialog").forEach(
        e => e.remove()
    );

    const dialog = document.createElement('div');
    dialog.classList.add("account-manager-dialog");
    Object.assign(dialog.style, {
        position: 'fixed', right: '16px', bottom: '16px', width: '240px',
        background: '#fff', color: '#222', border: '1px solid #ccc',
        borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,.3)',
        fontFamily: 'sans-serif', fontSize: '14px', overflow: 'hidden', zIndex: 9999
    });

    // ヘッダー
    const header = document.createElement('div');
    Object.assign(header.style, {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 12px', background: '#e8e8e8', fontWeight: 'bold'
    });

    const titleEl = document.createElement('div');
    titleEl.textContent = title;

    // 閉じるボタン
    const closeBtn = document.createElement('div');
    closeBtn.textContent = 'x';
    Object.assign(closeBtn.style, { cursor: 'pointer', padding: '0 6px', userSelect: 'none' });


    closeBtn.addEventListener("click", () => {
        dialog.remove();
    })

    // 最小化ボタン
    const minBtn = document.createElement('div');
    minBtn.textContent = '−';
    Object.assign(minBtn.style, { cursor: 'pointer', padding: '0 6px', userSelect: 'none' });

    header.append(titleEl, minBtn, closeBtn);

    // 選択肢エリア
    const body = document.createElement('div');
    body.style.padding = '8px';

    for (const id in options) {
        const label = options[id].name;
        const item = document.createElement('div');
        const disabled = selected === id;
        item.textContent = label;
        Object.assign(item.style, {
            padding: '8px 10px', margin: '4px 0', cursor: disabled ? 'auto' : 'pointer',
            border: '1px solid #ccc', borderRadius: '4px',
            background: disabled ? "#ccc" : undefined,
        });
        if (!disabled) {
            item.onmouseenter = () => (item.style.background = '#eef');
            item.onmouseleave = () => (item.style.background = 'transparent');
            item.onclick = () => onSelect(id, label);
        }
        body.appendChild(item);
    };
    const credit = document.createElement('div');
    credit.innerHTML = "Made by <a href='https://youtube.com/@this_was_username' style='color:#242a6b'>this_was_username</a>"
    credit.style.paddingTop = ".5em";
    credit.style.fontSize = ".8em";
    body.appendChild(credit);

    // 最小化 / 復元
    let minimized = false;
    minBtn.onclick = () => {
        minimized = !minimized;
        body.style.display = minimized ? 'none' : 'block';
        minBtn.textContent = minimized ? '+' : '−';
    };

    dialog.append(header, body);
    document.body.appendChild(dialog);
    return dialog;
}