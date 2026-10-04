<template>
  <div class="deck-footer">OPENWAF <span>{{ String($slidev.nav.currentPage).padStart(2, '0') }} / 10</span></div>
</template>
<style scoped>
.deck-footer { position: absolute; bottom: 17px; right: 30px; z-index: 20; color: #71717a; font: 10px Figtree, 'Segoe UI', sans-serif; display: flex; align-items: center; gap: 15px; }
.deck-footer span { color: #a1a1aa; font-family: Consolas, monospace; }
</style>
