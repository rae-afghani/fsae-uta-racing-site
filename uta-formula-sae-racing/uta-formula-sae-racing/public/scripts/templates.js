// Read the current page HTML so these examples stay up to date when Sama
// changes a section. Each source page is fetched once.
const sourcePages = new Map();

function readPage(path) {
  if (!sourcePages.has(path)) {
    const source = fetch(path).then(response => {
      if (!response.ok) throw new Error('Page could not be loaded.');
      return response.text();
    }).then(html => new DOMParser().parseFromString(html, 'text/html'));
    sourcePages.set(path, source);
  }
  return sourcePages.get(path);
}

document.querySelectorAll('[data-template-key]').forEach(template => {
  const code = template.querySelector('textarea');
  const copyButton = template.querySelector('[data-copy]');
  const status = template.querySelector('[role="status"]');

  template.addEventListener('toggle', async () => {
    if (!template.open || code.value) return;
    status.textContent = 'Loading HTML…';
    try {
      const page = await readPage(template.dataset.templatePage);
      const source = page.querySelector('[data-template="' + template.dataset.templateKey + '"]');
      if (!source) throw new Error('Section could not be found.');
      const snippet = source.cloneNode(true);
      // The original section keeps its anchor. A copy can get a new one.
      snippet.removeAttribute('id');
      const lines = snippet.outerHTML.split('\n');
      const indentation = lines.at(-1).match(/^\s*/)[0].length;
      code.value = lines.map((line, index) => index ? line.slice(indentation) : line).join('\n');
      copyButton.disabled = false;
      status.textContent = '';
    } catch {
      status.textContent = 'Could not load this section. Open its source page to view the HTML.';
    }
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.value);
      status.textContent = 'HTML copied.';
    } catch {
      code.focus();
      code.select();
      status.textContent = 'HTML selected. Use your device’s copy command.';
    }
  });
});
