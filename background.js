chrome.experimental.app.onLaunched.addListener(function() {
  chrome.appWindow.create('window.html', {
    'width': 500,
    'height': 500
  });
});