import React from 'react';
import getCurrentDate from './dateFunctions'

export const addOneDocument = async (document, userId) => {
  if(!document.year) {
    alert("Год не указан")
  } else {
    await fetch('/api/documents/add/', {
      method: 'POST',
      body: JSON.stringify({
        year: document.year,
        fund: document.fund,
        inventory: document.inventory,
        storage_unit: document.storage_unit,
        total_lists_num: isNaN(document.total_lists_num) ? document.total_lists_num : 0,
        additional_info: document.additional_info,
        url: document.url,
        creator_id: userId,
        date: getCurrentDate(),
        visible_mode: 0,
      }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data === true) {
        window.location.href = "/documents/"
        alert('Документ успешно добавлен!');
      } else {
        alert("Документ не был добавлен")
       }
    })
    .catch((err) => {
      console.log(err.message);
      /*
      if (!err?.response) {
        alert("Нет ответа от сервера");
        } else if (err.response?.status === 409) {
          alert("Документ уже существует");
        } else {
          alert("Попытка добавления провалилась");
        }
      */
    });
  }
};


/* Получение Document и Record */
const postDocumentAndRecords = async (document, docId, userId) => {
  if(!document.year) {
    alert("Год не указан")
  } else {
    await fetch('/api/documents/add/', {
      method: 'POST',
      body: JSON.stringify({
        year: document.year,
        fund: document.fund,
        inventory: document.inventory,
        storage_unit: document.storage_unit,
        total_lists_num: isNaN(document.total_lists_num) ? document.total_lists_num : 0,
        additional_info: document.additional_info,
        url: document.url,
        creator_id: userId,
        date: getCurrentDate(),
        visible_mode: 0,
      }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data === true) {
        window.location.href = "/documents/"
        alert('Документ успешно добавлен!');
      } else {
        alert("Документ не был добавлен")
       }
    })
    .catch((err) => {
      console.log(err.message);
      /*
      if (!err?.response) {
        alert("Нет ответа от сервера");
        } else if (err.response?.status === 409) {
          alert("Документ уже существует");
        } else {
          alert("Попытка добавления провалилась");
        }
      */
    });
  }
};


/*
const deletePost = async (id) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
     method: 'DELETE',
  }).then((response) => {
     if (response.status === 200) {
        setPosts(
          posts.filter((post) => {
            return post.id !== id;
          })
        );
    } else {
      return;
    }
  });
};
*/

export const removeOneUser = async (userId) => {
  if(userId) {
    await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = "/users/";
        window.location.reload();
        alert('Учётная запись удалёна!');
      } else {
        alert("Учётная запись не была удалена")
      }
      return response.json()
    })
    .then((data) => { console.log(data) })
    .catch((err) => {
      console.log(err.message);
      /*
      if (!err?.response) {
        alert("Нет ответа от сервера");
        } else {
          alert("Попытка удаления провалилась");
        }
      */
    });
  }
};