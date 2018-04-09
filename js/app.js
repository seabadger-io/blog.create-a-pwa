const dataSourceFetch = fetch('data/data.json');

document.addEventListener('DOMContentLoaded', () => {
  dataSourceFetch.then((response) => {
    response.json().then((data) => {
      for (const key in data) {
        let [target,attr] = key.split(';');
        const el = document.querySelector(`#${target}`);
        console.log(target, attr, data[key]);
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
})