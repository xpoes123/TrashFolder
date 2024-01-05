chrome.runtime.onInstalled.addListener(() => {
  console.log("Hello World Extension Installed!");
});


//   (async () => {
//     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//     const responses = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
//     console.log(response);
//   })