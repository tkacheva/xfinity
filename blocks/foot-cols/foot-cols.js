/**
 * foot-cols — footer link columns. One row, one cell per column (h4 + links).
 * Keeps each column grouped (fixes EDS default-content flattening of h4/ul pairs).
 */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (row) row.classList.add('foot-cols-row');
}
