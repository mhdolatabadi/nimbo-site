// Gate for the admin console.
//
// IMPORTANT: this is a static site with no backend, so this is a lock on a door, not a wall.
// The hash below ships in the JS bundle and a determined visitor can find it. It keeps the
// console out of the way of participants; it does not protect secrets. The real protection is
// that unreleased content lives nowhere in this repo until it is committed — the console only
// writes the snippet, and publishing still needs a push.
//
// To change the password:
//   node -e "const c=require('crypto');console.log(c.createHash('sha256').update('nimbo:'+process.argv[1]+':'+process.argv[2]).digest('hex'))" <user> <password>
// then paste the result into ADMIN_HASH.

const ADMIN_USER = 'nimbo';
const ADMIN_HASH = 'a31a86ea0e7e4ae3e7462f6fe4fa01229e964081b0236c1b106a5b40d9b912ba';
const SESSION_KEY = 'nimbo-admin-session';
export const ADMIN_EVENT = 'nimbo-admin-session-change';

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function checkCredentials(user, password) {
  if (!crypto?.subtle) return false;
  const hash = await sha256(`nimbo:${user}:${password}`);
  return user === ADMIN_USER && hash === ADMIN_HASH;
}

// sessionStorage, not localStorage: closing the tab ends the session.
export function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'open';
  } catch {
    return false;
  }
}

export function writeSession(open) {
  try {
    if (open) sessionStorage.setItem(SESSION_KEY, 'open');
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Private-mode browsers block storage; the console still works for this render.
  }
  window.dispatchEvent(new Event(ADMIN_EVENT));
}
