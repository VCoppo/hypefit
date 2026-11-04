// Campo de WhatsApp em todos os lugares: só aceita número e já formata (27) 99999-9999.
// Vale para qualquer <input type="tel">, inputmode="tel" ou data-tel, inclusive os criados depois.
(function () {
  const sel = 'input[type="tel"], input[inputmode="tel"], input[data-tel]';
  const formatar = (v) => {
    let d = String(v || '').replace(/\D/g, '');
    if (d.length > 11 && d.startsWith('55')) d = d.slice(2); // colou com +55
    d = d.slice(0, 11);
    if (!d) return '';
    if (d.length <= 2) return '(' + d;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };
  const aplicar = (el) => {
    const novo = formatar(el.value);
    if (novo === el.value) return;
    const digitosAntes = el.value.slice(0, el.selectionStart ?? el.value.length).replace(/\D/g, '').length;
    el.value = novo;
    // mantém o cursor depois do mesmo número de dígitos
    let pos = 0, vistos = 0;
    while (pos < novo.length && vistos < digitosAntes) { if (/\d/.test(novo[pos])) vistos++; pos++; }
    try { el.setSelectionRange(pos, pos); } catch {}
  };
  const preparar = (el) => { if (el.dataset.telPronto) return; el.dataset.telPronto = '1'; el.setAttribute('inputmode', 'numeric'); el.removeAttribute('maxlength'); if (!el.placeholder) el.placeholder = '(27) 99999-9999'; if (el.value) el.value = formatar(el.value); };
  document.addEventListener('beforeinput', (e) => { const el = e.target; if (!el.matches?.(sel)) return; if (e.inputType === 'insertText' && e.data?.length === 1 && /\D/.test(e.data)) e.preventDefault(); /* só tecla solta: sugestão do teclado com o número inteiro passa e é formatada */ }, true);
  document.addEventListener('input', (e) => { if (e.target.matches?.(sel)) aplicar(e.target); }, true);
  document.addEventListener('focusin', (e) => { if (e.target.matches?.(sel)) preparar(e.target); }, true);
  const varrer = () => document.querySelectorAll(sel).forEach(preparar);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', varrer); else varrer();
  new MutationObserver(varrer).observe(document.documentElement, { childList: true, subtree: true });
  window.formatarTelefone = formatar;
})();
