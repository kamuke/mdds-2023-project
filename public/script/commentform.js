'use strict';

const url = 'http://localhost:3010';
const form = document.getElementById('commentForm');

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(form);
    console.log('dataa', data);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    const response = await fetch(url + '/api/post', fetchOptions);
    const json = await response.json();
    console.log('comment post response', json);
    getMessages();
  });

  const getMessages = async () => {
    try {
      const fetchOptions = {
        method: 'GET',
      };
      const response = await fetch(url + '/api/getPosts', fetchOptions);
      const messages = await response.json();
      console.log(messages);
      showMessages(messages);
  
    } catch (e) {
      console.log(e.message);
    }
  };
  
  getMessages();

  const showMessages = (messages) => {
    const commentContainer = document.getElementById('comments');
    //commentContainer.classList.add('flex', 'flex-col', 'items-center', 'w-full');
    commentContainer.innerHTML = '';

    messages.forEach((message) => {

        const commentDiv = document.createElement('div');
        commentDiv.classList.add(
            'p-2',
            'text-sm',
            'rounded-lg',
            'mb-4',
            'w-full',
            'shadow',
            'bg-secondary-100',
        );

        const header = document.createElement('div');
        header.classList.add('flex', 'justify-between');

        const name = document.createElement('p');
        name.innerText = message.name;
        name.classList.add('text-secondary-900');

        const localTime = new Date(message.createdAt);
        const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedTime = localTime.toLocaleTimeString('fi-FI', options);
        const time = document.createElement('p');
        time.innerText = formattedTime;
        time.classList.add('text-xs', 'text-gray-500', 'ml-2');

        header.appendChild(name);
        header.appendChild(time);

        const rating = document.createElement('div');
        rating.classList.add('flex', 'justify-start', 'items-center', 'py-1');
        for (let i = 0; i < message.rating; i++) {
            const star = document.createElement('img');
            star.classList.add('w-4', 'h-4');
            star.src = 'img/star.svg';
            rating.appendChild(star);
        }

        const comment = document.createElement('p');
        comment.innerText = message.message;

        commentDiv.appendChild(header);
        commentDiv.appendChild(rating);
        commentDiv.appendChild(comment);
        commentContainer.appendChild(commentDiv);
    });

  };

  