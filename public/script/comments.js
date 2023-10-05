"use strict";

const url = 'http://localhost:3010';
const form = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const nameInput = document.getElementById('nameInput');

const dialogSuccess = document.getElementById("modal1");
dialogSuccess.classList.add('bg-tetriary', 'text-xl', 'w-max-fit', 'text-gray-950', 'text-center', 'rounded-lg', 'p-4', 'm-auto', 'focus:outline-none');
dialogSuccess.addEventListener("click", () => {
  dialogSuccess.close();
});
const dialogFail = document.getElementById("modal2");
dialogFail.classList.add('bg-red-500', 'text-xl', 'w-max-fit', 'text-gray-950', 'text-center', 'rounded-lg', 'p-4', 'm-auto', 'focus:outline-none');
dialogFail.addEventListener("click", () => {
  dialogFail.close();
});

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  
  try {
  const response = await fetch(url + '/api/post', fetchOptions);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
      alert(message);
    throw new Error(message || response.statusText);
  }
  commentInput.value = '';
  nameInput.value = '';
  getMessages();
  dialogSuccess.innerHTML = "Message sent";
  dialogSuccess.showModal();
  } catch (e) {
    console.log(e.message);
    dialogFail.innerHTML = e.message;
    dialogFail.showModal();
  }
});

const getMessages = async () => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/api/getPosts', fetchOptions);
    const messages = await response.json();
    if (!response.ok) {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
    showMessages(messages);
    calcurateRatings(messages);
  } catch (e) {
    console.log(e.message);
    dialogFail.innerHTML = e.message;
    dialogFail.showModal();
  }
};

getMessages();

const calcurateRatings = (messages) => {
  const ratingCard = document.getElementById('ratingCard');
  ratingCard.innerHTML = '';

  const totalRatings = messages.length;
  const ratingsCount = [0, 0, 0, 0, 0];

  messages.forEach((message) => {
    const rating = message.rating;
    if (rating >= 1 && rating <= 5) {
      ratingsCount[rating - 1]++;
    }
  });

  const rating1Percent = Math.round((ratingsCount[4] / totalRatings) * 100);
  const rating2Percent = Math.round((ratingsCount[3] / totalRatings) * 100);
  const rating3Percent = Math.round((ratingsCount[2] / totalRatings) * 100);
  const rating4Percent = Math.round((ratingsCount[1] / totalRatings) * 100);
  const rating5Percent = Math.round((ratingsCount[0] / totalRatings) * 100);

  const rating1Class = `${rating1Percent}%`;
  const rating2Class = `${rating2Percent}%`;
  const rating3Class = `${rating3Percent}%`;
  const rating4Class = `${rating4Percent}%`;
  const rating5Class = `${rating5Percent}%`;
  
  for (let i = 5; i > 0; i--) {
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('flex', 'justify-start', 'mb-1');
  
    const ratingText = document.createElement('p');
    ratingText.classList.add('text-sm', 'text-gray-100', 'mr-1', 'min-w-fit', 'h-5', 'w-8', 'align-middle');
    if (totalRatings > 9) {
      ratingText.classList.add('w-12');
    }
    ratingText.innerText = `${i} (${ratingsCount[i - 1]})`;
  
    const ratingImg = document.createElement('img');
    ratingImg.classList.add('w-5', 'h-5', 'mr-1');
    ratingImg.src = 'img/star.svg';
  
    const childDivWrapper = document.createElement('div');
    childDivWrapper.classList.add('bg-gray-200', 'h-5', 'w-52');

    const childDiv = document.createElement('div');
    childDiv.id = `rating${i}`;
    childDiv.classList.add('bg-primary-500', 'h-5');

    childDivWrapper.appendChild(childDiv);
    ratingDiv.appendChild(ratingImg);
    ratingDiv.appendChild(ratingText);
    ratingDiv.appendChild(childDivWrapper);
    ratingCard.appendChild(ratingDiv);
  }

  const w1 = document.getElementById(`rating5`);
  w1.style.width = `${rating1Class}`;
  const w2 = document.getElementById(`rating4`);
  w2.style.width = `${rating2Class}`;
  const w3 = document.getElementById(`rating3`);
  w3.style.width = `${rating3Class}`;
  const w4 = document.getElementById(`rating2`);
  w4.style.width = `${rating4Class}`;
  const w5 = document.getElementById(`rating1`);
  w5.style.width = `${rating5Class}`;
};

const showMessages = (messages) => {
  const commentContainer = document.getElementById('comments');
  commentContainer.innerHTML = '';
  messages.reverse();
  messages.forEach((message) => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add(
      'p-4',
      'text-sm',
      'rounded-lg',
      'mb-4',
      'w-full',
      'shadow',
      'bg-secondary-100',
    );

    const header = document.createElement('div');
    header.classList.add('flex', 'justify-between', 'items-center', 'mb-1');

    const name = document.createElement('p');
    name.innerText = message.name;
    name.classList.add('text-xl', 'text-secondary-900');

    const localTime = new Date(message.createdAt);
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedTime = localTime.toLocaleTimeString('fi-FI', options);
    const time = document.createElement('p');
    time.innerText = formattedTime;
    time.classList.add('text-sm', 'text-gray-500', 'ml-2');

    header.appendChild(name);
    header.appendChild(time);

    const titleBar = document.createElement('div');
    titleBar.classList.add('flex', 'justify-start', 'items-center', 'mb-2');

    const title = document.createElement('p');
    title.innerText = message.title;
    title.classList.add('text-xl', 'mr-2');

    const rating = document.createElement('div');
    rating.classList.add('flex', 'justify-start', 'items-center', 'py-1');
    for (let i = 0; i < message.rating; i++) {
        const star = document.createElement('img');
        star.classList.add('w-5', 'h-5');
        star.src = 'img/star.svg';
        rating.appendChild(star);
    }

    titleBar.appendChild(title);
    titleBar.appendChild(rating);

    const comment = document.createElement('p');
    comment.classList.add('text-md');
    comment.innerText = message.comment;

    commentDiv.appendChild(header);
    commentDiv.appendChild(titleBar);
    commentDiv.appendChild(comment);
    commentContainer.appendChild(commentDiv);
  });

};

  