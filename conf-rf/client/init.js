  window.pendingEquipment = [];
  pendingEquipment = [];
(function init() {
  const raw = localStorage.getItem(LS_DB);
  if (raw) { try { db = JSON.parse(raw); } catch (e) { db = null; } }
  if (!db || !db.users || !db.rooms) db = seed();

  /* Миграция старых сохранений */
  if (!Array.isArray(db.emails)) db.emails = [];
  if (!Array.isArray(db.loginAttempts)) db.loginAttempts = [];
  if (!Array.isArray(db.securityLog)) db.securityLog = [];
  if (!Array.isArray(db.securityQuestions)) db.securityQuestions = [];
  if (!db.seq) db.seq = {};
  ['users','rooms','bookings','reviews','emails','securityLog','securityQuestions'].forEach(k => {
    if (typeof db.seq[k] !== 'number') db.seq[k] = 0;
  });
    if (!Array.isArray(db.equipment)) db.equipment = [];
  if (!Array.isArray(db.bookingEquipment)) db.bookingEquipment = [];
  ['equipment','bookingEquipment'].forEach(k => {
    if (typeof db.seq[k] !== 'number') db.seq[k] = 0;
  });

  const sid = Number(localStorage.getItem(LS_SES));
  session = (sid && getUser(sid)) ? sid : null;

  if (currentUser() && currentUser().is_admin) {
    loadAdminScript();
  }

  /* Автологаут */
  if (session && typeof startIdleWatch === 'function') startIdleWatch();

  renderNav();
  renderAll();
  go('home');
})();