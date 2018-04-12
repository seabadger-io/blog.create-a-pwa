if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
  .then((reg) => {
    console.log('ServiceWorker Registration successful. Scope is ' + reg.scope);
  }).catch((error) => {
    console.log('ServiceWorker Registration failed with ' + error);
  });
}

const dataSourceFetch = fetch('data/data.json');

document.addEventListener('DOMContentLoaded', () => {
  dataSourceFetch.then((response) => {
    response.json().then((data) => {
      for (const key in data) {
        let [target,attr] = key.split(';');
        const el = document.querySelector(`#${target}`);
        if (null !== el) {
          if (!attr) {
            el.innerHTML = data[key];
          } else {
            el.setAttribute(attr, data[key]);
          }
        }
      }
    });
  });
});