document.querySelector('#submit').addEventListener('click', () => {
  const domainDom = document.querySelector('my-input[name="domain"]')
  const cookieDom = document.querySelector('my-input[name="cookie"]')

  if(domainDom.error || cookieDom.error) {
    return
  }

  const cookieList = cookieDom.value.split(';');
  const domain = domainDom.value;
  for (const item of cookieList) {
    const current = item.split('=')
    const [name, value] = current;

    chrome.cookies.set({
      secure: true,
      path: '/',
      domain: domain,
      name: name.trim(),
      value: value.trim(),
      url: `https://${domain}`,
      expirationDate: Date.now() + 1000000
    }, () => {
      window.close(chrome.extension.getURL('background.html'))
    })
  }
});
