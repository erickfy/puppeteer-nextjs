/**
 * An Object of routes that are accessible of all application
 * @type {
*   login: string;
*   signUp: string;
*   instagram: string;
*   amazon: string;
*   mercadoLibre: string;
*   bookStore: string;
*   botDetect: string;
* }
*/

export const routes = {
  login: '/',
  signUp: '/sign-up',
  instagram: '/instagram',
  amazon: '/amazon',
  mercadoLibre: '/mercado-libre',
  bookStore: '/book-store',
  botDetect: '/bot-detect',
  profile: '/profile',
  protected: '/protected',
}

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const privateRoutes: string[] = [
  "/instagram",
  "/amazon",
  "/mercado-libre",
  "/book-store",
  "/bot-detect",
  "/profile",
];

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
  "/",
  "/sign-up",
  "/protected",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/",
  "/sign-up",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";
export const DEFAULT_UNAUTHORIZED_REDIRECT: string = "/protected";