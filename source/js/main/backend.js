import dbBody from '../../../conquest.db.json';

const createUrl = 'https://api.jsonbin.io/b/';
const secretKey =
  '$2b$10$HuivVX41ooUZrHpYIU477.qlnAD.19SW.NTvQa1cuKcpwPyR0DiDe';
const dbId = '5f2904eedddf413f95bc43e0';
const readUrl = `${createUrl}${dbId}`;

function createDbRequest(method, url, body = null) {
  const headers = {
    'Content-Type': 'application/json',
    'secret-key': secretKey
  };

  return fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  }).then(response => {
    if (response.ok) return response.json();

    return response.json().then(error => {
      const e = new Error(`Ошибка, код состояния ${response.status}`);
      e.data = error;
      throw e;
    });
  });
}

function readDbRequest(method, url) {
  const headers = {
    'Content-Type': 'application/json',
    'secret-key': secretKey
  };

  return fetch(url, {
    method: method,
    headers: headers
  }).then(response => {
    if (response.ok) return response.json();

    return response.json().then(error => {
      const e = new Error(`Ошибка, код состояния ${response.status}`);
      e.data = error;
      throw e;
    });
  });
}

async function getDbId() {
  const response = await createDbRequest('POST', createUrl, dbBody);

  return response.id;
}

export { readDbRequest, readUrl };
