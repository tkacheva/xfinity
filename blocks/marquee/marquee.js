/**
 * marquee — auto-scrolling benefit tiles (two rows, opposite directions).
 * Optional leading single-cell row = centered heading.
 * Item rows: image-url | label (optional)
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';
  const wrap = document.createElement('div');
  wrap.className = 'mq-wrap';
  let items = rows;
  if (rows[0] && [...rows[0].children].length === 1) {
    const head = document.createElement('div');
    head.className = 'mq-head';
    head.innerHTML = rows[0].children[0].innerHTML;
    wrap.append(head);
    items = rows.slice(1);
  }
  const tiles = items.map((r) => {
    const c = [...r.children];
    return { img: c[0] ? c[0].textContent.trim() : '', label: c[1] ? c[1].textContent.trim() : '' };
  });
  const makeRow = (arr, dir) => {
    const row = document.createElement('div');
    row.className = 'mq-row';
    const track = document.createElement('div');
    track.className = `mq-track ${dir}`;
    const fill = () => arr.forEach((t) => {
      const el = document.createElement('div');
      el.className = 'mq-tile';
      el.innerHTML = `<div class="mq-img"${t.img ? ` style="background-image:url('${t.img}')"` : ''}></div>${t.label ? `<span class="mq-label">${t.label}</span>` : ''}`;
      track.append(el);
    });
    fill(); fill(); // duplicate for a seamless loop
    row.append(track);
    return row;
  };
  const half = Math.ceil(tiles.length / 2);
  wrap.append(makeRow(tiles.slice(0, half), 'left'), makeRow(tiles.slice(half), 'right'));
  block.append(wrap);
}
