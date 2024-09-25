import browser from 'webextension-polyfill';

console.log('background script running...');

// @TODO figure out best way for user to opt in for auto CobaltSession collection so we can authticate as user
// to allow other functionality (ie getting characters regardless of being public, being able to retrieve encounters)

// async function test() {
//     const res = await browser.cookies.getAll({
//         url: "https://www.dndbeyond.com/",
//     })

// }
